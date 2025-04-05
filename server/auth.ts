import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

// Extend Express.User to include our User type
declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

// Promisify scrypt
const scryptAsync = promisify(scrypt);

// Password hashing and verification
async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

// Set up Passport and session
export function setupAuth(app: Express) {
  // Create PostgreSQL session store
  const PostgresSessionStore = connectPg(session);
  
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "local-dev-secret",
    resave: false,
    saveUninitialized: false,
    store: new PostgresSessionStore({ 
      pool,
      createTableIfMissing: true 
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // Set up local strategy
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user || null);
    } catch (error) {
      done(error);
    }
  });

  // Authentication routes
  app.post("/api/register", async (req, res, next) => {
    try {
      // Check for validation errors
      if (!req.body.username || !req.body.password || !req.body.email || !req.body.fullName) {
        return res.status(400).json({ 
          success: false, 
          message: "All fields are required: username, password, email, and fullName" 
        });
      }
      
      // Check for existing username
      const existingUsername = await storage.getUserByUsername(req.body.username);
      if (existingUsername) {
        return res.status(400).json({ success: false, message: "Username already exists" });
      }
      
      // Check for existing email (would require adding a getUserByEmail method to storage)
      // For now, this is handled by the database constraint

      // Create the user
      const user = await storage.createUser({
        username: req.body.username,
        password: await hashPassword(req.body.password),
        email: req.body.email,
        fullName: req.body.fullName,
        role: 'client', // Default role for new registrations
      });

      // Log the user in
      req.login(user, (err) => {
        if (err) return next(err);
        
        // Return user data without password
        const { password, ...userData } = user;
        res.status(201).json(userData);
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      
      // Check for database constraint violation (likely duplicate email)
      if (error.message && error.message.includes('duplicate key value violates unique constraint')) {
        if (error.message.includes('email')) {
          return res.status(400).json({ success: false, message: "Email already registered" });
        }
      }
      
      res.status(500).json({ success: false, message: "Server error during registration" });
    }
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: Error | null, user: SelectUser | false, info: { message: string }) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid username or password" });
      }
      req.login(user, (err) => {
        if (err) return next(err);
        
        // Return user data without password
        const { password, ...userData } = user;
        res.status(200).json(userData);
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ success: false, message: "Not authenticated" });
    
    // Return user data without password
    const { password, ...userData } = req.user;
    res.json(userData);
  });
}