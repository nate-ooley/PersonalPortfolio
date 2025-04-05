import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateBlogPost, generateSlug, checkApiKeysAvailable } from "./ai";
import { AIProvider, BlogGenerationRequest } from "./ai/types";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  setupAuth(app);
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

  // Get all blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const publishedOnly = req.query.publishedOnly === 'false' ? false : true;
      
      const posts = await storage.getBlogPosts(limit, publishedOnly);
      
      return res.status(200).json({
        success: true,
        data: posts
      });
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch blog posts. Please try again later."
      });
    }
  });

  // Get blog post by slug
  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Blog post not found"
        });
      }
      
      return res.status(200).json({
        success: true,
        data: post
      });
    } catch (error) {
      console.error("Error fetching blog post:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch blog post. Please try again later."
      });
    }
  });
  
  // Create new blog post (requires authentication)
  app.post("/api/blog", (req, res, next) => {
    // Check if user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        success: false,
        message: "Authentication required to create blog posts"
      });
    }
    
    // Continue if authenticated
    next();
  }, async (req, res) => {
    try {
      const { title, content, excerpt, published, coverImage, tags } = req.body;
      
      // Generate slug from title
      const slug = generateSlug(title);
      
      // Use the authenticated user's ID as the author
      const authorId = req.user?.id;
      
      // Create new blog post
      const newPost = await storage.createBlogPost({
        title,
        slug,
        content,
        excerpt,
        published: published ?? false,
        coverImage,
        tags: tags || [],
        authorId
      });
      
      return res.status(201).json({
        success: true,
        data: newPost
      });
    } catch (error) {
      console.error("Error creating blog post:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create blog post. Please try again later."
      });
    }
  });
  
  // Generate blog post with AI (requires authentication)
  app.post("/api/blog/generate", (req, res, next) => {
    // Check if user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        success: false,
        message: "Authentication required to generate blog posts"
      });
    }
    
    // Continue if authenticated
    next();
  }, async (req, res) => {
    try {
      const blogGenerationRequest: BlogGenerationRequest = req.body;
      
      // Check if API keys are available
      const apiKeys = checkApiKeysAvailable();
      
      // Determine which AI provider to use (default to OpenAI if available)
      const provider = blogGenerationRequest.provider ? 
        blogGenerationRequest.provider as AIProvider : 
        apiKeys.openai ? AIProvider.OpenAI : 
        apiKeys.anthropic ? AIProvider.Anthropic : 
        undefined;
      
      // If no API keys are available, return error
      if (!provider) {
        return res.status(400).json({
          success: false,
          message: "No AI provider API keys available. Please configure OPENAI_API_KEY or ANTHROPIC_API_KEY."
        });
      }
      
      // Generate blog post with AI
      const generatedBlog = await generateBlogPost(blogGenerationRequest, provider);
      
      // Generate slug
      const slug = generateSlug(generatedBlog.title);
      
      // Map the coverImageUrl to coverImage for schema compatibility
      const coverImage = generatedBlog.coverImageUrl || '';
      const tags = blogGenerationRequest.tags || [];
      
      return res.status(200).json({
        success: true,
        data: {
          title: generatedBlog.title,
          content: generatedBlog.content,
          excerpt: generatedBlog.excerpt,
          slug,
          coverImage,
          tags,
          published: false
        }
      });
    } catch (error) {
      console.error("Error generating blog post with AI:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to generate blog post. Please try again later."
      });
    }
  });
  
  // Check available AI providers
  app.get("/api/blog/ai-providers", (req, res) => {
    const apiKeys = checkApiKeysAvailable();
    
    return res.status(200).json({
      success: true,
      data: apiKeys
    });
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
