import { pgTable, text, serial, integer, boolean, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull().default("client"), // 'admin' or 'client'
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  role: true,
});

// Contact form messages schema
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  read: boolean("read").default(false),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

// Client projects schema
export const clientProjects = pgTable("client_projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  technologies: text("technologies").array().notNull(),
  link: text("link"),
  category: text("category").notNull().default("web"), // 'web', 'mobile', 'cloud', 'network_security'
  categoryDisplay: text("category_display").notNull().default("Web Development"),
  clientId: integer("client_id").references(() => users.id),
  status: text("status").notNull().default("in_progress"), // 'not_started', 'in_progress', 'review', 'completed'
  progress: integer("progress").notNull().default(0), // Percentage from 0-100
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  featured: boolean("featured").default(false),
  testimonial: text("testimonial"),
  outcome: text("outcome"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertClientProjectSchema = createInsertSchema(clientProjects).pick({
  title: true,
  description: true,
  image: true,
  technologies: true,
  link: true,
  category: true,
  categoryDisplay: true,
  clientId: true,
  status: true,
  progress: true,
  startDate: true,
  endDate: true,
  featured: true,
  testimonial: true,
  outcome: true,
});

// Project updates schema
export const projectUpdates = pgTable("project_updates", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => clientProjects.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  milestone: boolean("milestone").default(false),
  previousProgress: integer("previous_progress").notNull(),
  newProgress: integer("new_progress").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  files: text("files").array(),
});

export const insertProjectUpdateSchema = createInsertSchema(projectUpdates).pick({
  projectId: true,
  title: true,
  description: true,
  milestone: true,
  previousProgress: true,
  newProgress: true,
  files: true,
});

// Blog posts schema
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image").notNull(),
  tags: text("tags").array().notNull(),
  publishedAt: timestamp("published_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  published: boolean("published").default(false),
  authorId: integer("author_id").references(() => users.id),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  coverImage: true,
  tags: true,
  published: true,
  authorId: true,
});

// Define the zod schema validators
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Define types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertClientProject = z.infer<typeof insertClientProjectSchema>;
export type ClientProject = typeof clientProjects.$inferSelect;

export type InsertProjectUpdate = z.infer<typeof insertProjectUpdateSchema>;
export type ProjectUpdate = typeof projectUpdates.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
