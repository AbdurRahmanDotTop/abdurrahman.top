import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const siteSettings = sqliteTable("site_settings", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
});

export const sections = sqliteTable("sections", {
  id: text("id").primaryKey(),
  sectionId: text("section_id").notNull().unique(), // e.g., 'hero', 'about', 'services'
  title: text("title").notNull(),
  content: text("content"),
  order: integer("order").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
});

export const blogPosts = sqliteTable("blog_posts", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content"),
  excerpt: text("excerpt"),
  featuredImage: text("featured_image"),
  isPublished: integer("is_published", { mode: "boolean" }).default(false),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
});

export const tags = sqliteTable("tags", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
});

export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  projectType: text("project_type"),
  budget: text("budget"),
  timeline: text("timeline"),
  source: text("source"),
  message: text("message").notNull(),
  status: text("status").default("unread"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
