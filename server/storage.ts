import { 
  users, 
  type User, 
  type InsertUser,
  clientProjects,
  type ClientProject,
  type InsertClientProject,
  projectUpdates,
  type ProjectUpdate,
  type InsertProjectUpdate,
  blogPosts,
  type BlogPost,
  type InsertBlogPost,
  contactMessages,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Client project methods
  getClientProject(id: number): Promise<ClientProject | undefined>;
  getClientProjects(limit?: number, featured?: boolean): Promise<ClientProject[]>;
  createClientProject(project: InsertClientProject): Promise<ClientProject>;
  updateClientProject(id: number, project: Partial<InsertClientProject>): Promise<ClientProject | undefined>;
  deleteClientProject(id: number): Promise<boolean>;
  
  // Blog post methods
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPosts(limit?: number, publishedOnly?: boolean): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  
  // Contact message methods
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  getContactMessages(limit?: number): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markContactMessageAsRead(id: number): Promise<boolean>;
  deleteContactMessage(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Client project methods
  async getClientProject(id: number): Promise<ClientProject | undefined> {
    const [project] = await db.select().from(clientProjects).where(eq(clientProjects.id, id));
    return project || undefined;
  }
  
  async getClientProjects(limit?: number, featured?: boolean): Promise<ClientProject[]> {
    let query = db.select().from(clientProjects).orderBy(desc(clientProjects.createdAt));
    
    if (featured !== undefined) {
      query = query.where(eq(clientProjects.featured, featured));
    }
    
    if (limit) {
      query = query.limit(limit);
    }
    
    return await query;
  }
  
  async createClientProject(project: InsertClientProject): Promise<ClientProject> {
    const [newProject] = await db
      .insert(clientProjects)
      .values(project)
      .returning();
    return newProject;
  }
  
  async updateClientProject(id: number, project: Partial<InsertClientProject>): Promise<ClientProject | undefined> {
    const [updatedProject] = await db
      .update(clientProjects)
      .set(project)
      .where(eq(clientProjects.id, id))
      .returning();
    return updatedProject || undefined;
  }
  
  async deleteClientProject(id: number): Promise<boolean> {
    const result = await db
      .delete(clientProjects)
      .where(eq(clientProjects.id, id))
      .returning({ id: clientProjects.id });
    return result.length > 0;
  }
  
  // Blog post methods
  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }
  
  async getBlogPosts(limit?: number, publishedOnly = true): Promise<BlogPost[]> {
    let query = db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
    
    if (publishedOnly) {
      query = query.where(eq(blogPosts.published, true));
    }
    
    if (limit) {
      query = query.limit(limit);
    }
    
    return await query;
  }
  
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db
      .insert(blogPosts)
      .values(post)
      .returning();
    return newPost;
  }
  
  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updatedPost] = await db
      .update(blogPosts)
      .set({
        ...post,
        updatedAt: new Date()
      })
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost || undefined;
  }
  
  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db
      .delete(blogPosts)
      .where(eq(blogPosts.id, id))
      .returning({ id: blogPosts.id });
    return result.length > 0;
  }
  
  // Contact message methods
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    const [message] = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return message || undefined;
  }
  
  async getContactMessages(limit?: number): Promise<ContactMessage[]> {
    let query = db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
    
    if (limit) {
      query = query.limit(limit);
    }
    
    return await query;
  }
  
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return newMessage;
  }
  
  async markContactMessageAsRead(id: number): Promise<boolean> {
    const result = await db
      .update(contactMessages)
      .set({ read: true })
      .where(eq(contactMessages.id, id))
      .returning({ id: contactMessages.id });
    return result.length > 0;
  }
  
  async deleteContactMessage(id: number): Promise<boolean> {
    const result = await db
      .delete(contactMessages)
      .where(eq(contactMessages.id, id))
      .returning({ id: contactMessages.id });
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
