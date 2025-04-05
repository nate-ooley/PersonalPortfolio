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
      
      // In a real application, you would:
      // 1. Send an email
      // 2. Store the contact message in a database
      // 3. Integrate with a CRM or messaging system
      
      // For now, we'll just log the contact information and return success
      console.log("Contact form submission:", { name, email, subject, message });
      
      return res.status(200).json({ 
        success: true, 
        message: "Thank you for your message. I'll get back to you soon!" 
      });
    } catch (error) {
      console.error("Error in contact form:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to send your message. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
