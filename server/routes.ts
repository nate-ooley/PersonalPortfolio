import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }
      
      // Store the contact message in the database
      const newMessage = await storage.createContactMessage({
        name,
        email,
        subject,
        message
      });
      
      return res.status(200).json({ 
        success: true, 
        message: "Thank you for your message. I'll get back to you soon!",
        data: newMessage
      });
    } catch (error) {
      console.error("Error in contact form:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to send your message. Please try again later." 
      });
    }
  });
  
  // Get client projects by category
  app.get("/api/projects/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      const projects = await storage.getClientProjectsByCategory(category, limit);
      
      return res.status(200).json({
        success: true,
        data: projects
      });
    } catch (error) {
      console.error("Error fetching projects by category:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch projects. Please try again later."
      });
    }
  });
  
  // Get all client projects
  app.get("/api/projects", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const featured = req.query.featured === 'true' ? true : 
                      req.query.featured === 'false' ? false : undefined;
      
      const projects = await storage.getClientProjects(limit, featured);
      
      return res.status(200).json({
        success: true,
        data: projects
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch projects. Please try again later."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
