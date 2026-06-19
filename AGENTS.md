# Commerce Platform - AI Agent Instructions

## Project Overview

This project is a reusable production-ready Multi Vendor Ecommerce Platform built for long-term scalability.

The platform is designed to support:

* Single Vendor Ecommerce
* Multi Vendor Marketplace
* Handmade Products Marketplace
* Artisan and Creator Marketplace
* Local Business Marketplace
* Future SaaS Ecommerce Solution

Current development focus is on Multi Vendor Marketplace architecture.

---

# Tech Stack

## Frontend (Customer Website)

* Next.js
* TypeScript
* Tailwind CSS
* Zustand
* Axios

## Admin Panel

* Next.js
* TypeScript
* Tailwind CSS
* Axios

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cloudinary
* Multer

---

# Project Structure

backend/
frontend/
admin/

## backend

Contains:

* Authentication
* Users
* Stores
* Products
* Categories
* Orders
* Reviews
* Wishlist
* Cart

## frontend

Contains:

* Customer website
* Product pages
* Categories
* Cart
* Checkout
* Vendor profiles
* Marketplace pages

## admin

Contains:

* Product management
* Store management
* Vendor approval
* Product approval
* Order management
* Customer management

---

# Marketplace Vision

This is NOT a typical ecommerce store.

The platform is intended to become a marketplace for creators, artisans and independent makers.

Examples:

* Pottery Artists
* Woodworkers
* Textile Artists
* Handmade Jewelry Makers
* Painters
* Sculptors
* Craft Makers
* Regional Artisans

The experience should feel:

* Human
* Emotional
* Story Driven
* Premium
* Artistic

NOT:

* Generic ecommerce
* Corporate dashboard style
* Template marketplace

---

# Design Philosophy

Every product has a creator.

Every creator has a story.

The platform should connect buyers directly with makers.

Design should emphasize:

* Artist identity
* Craft process
* Product story
* Human connection
* Cultural value

Products should never feel mass-produced.

---

# UI Principles

Create premium experiences.

Avoid:

* Generic cards
* Generic grids
* Typical ecommerce layouts
* Bootstrap style UI
* Dashboard looking storefronts

Prefer:

* Editorial layouts
* Storytelling layouts
* Magazine style sections
* Large visual imagery
* Rich typography
* Immersive experiences

---

# Visual Identity

Design Language:

Modern Indian Craft + Contemporary Luxury

Mood:

* Artistic
* Premium
* Warm
* Emotional
* Human

Avoid:

* SaaS appearance
* Corporate appearance
* Tech startup appearance

---

# Preferred Color Direction

Use rich handcrafted inspired colors.

Primary Palette:

* Deep Saffron
* Terracotta
* Indigo
* Peacock Blue
* Emerald
* Marigold
* Vermilion Red
* Lotus Pink

Neutral Palette:

* Warm Ivory
* Sand
* Clay
* Charcoal
* Off White

Avoid overusing:

* Pure blue SaaS palettes
* Grey corporate palettes
* Generic black-white only themes

Color should feel vibrant yet premium.

---

# Typography Direction

Headings:

Elegant serif style.

Body:

Clean modern sans-serif.

The combination should feel:

* Editorial
* Premium
* Artistic

Avoid:

* Tech startup typography
* Generic ecommerce typography

---

# User Roles

## ADMIN

Can:

* Manage stores
* Approve stores
* Reject stores
* Manage products
* Approve products
* Reject products
* Manage categories
* Manage orders
* Manage users

---

## VENDOR

Can:

* Create products
* Edit own products
* Delete own products
* View own products
* Manage store profile
* Manage orders related to own store

Vendor must never access another vendor's products.

---

## CUSTOMER

Can:

* Browse products
* Browse creators
* Add to cart
* Wishlist products
* Place orders
* Follow creators (future feature)

---

# Product Workflow

Vendor creates product.

Default Status:

pending

Admin reviews product.

Admin can:

approved
rejected

Only approved products should appear on customer website.

Never expose pending products publicly.

---

# Store Workflow

Vendor creates store.

Store status:

pending

Admin reviews store.

Store becomes:

approved

Only approved stores can sell products.

---

# Coding Rules

Before creating any new code:

1. Search existing implementation.
2. Check existing services.
3. Check existing controllers.
4. Check existing routes.
5. Check existing components.

Never create duplicate logic.

Never create duplicate APIs.

Never create duplicate routes.

Never create duplicate pages.

Always reuse existing functionality.

---

# Development Rules

Before making changes:

* Analyze existing code.
* Identify affected files.
* Explain proposed changes.
* Wait for approval if change is large.

Do not blindly generate code.

Always preserve existing functionality.

---

# Refactoring Rules

When refactoring:

* Remove dead code.
* Remove duplicate code.
* Improve maintainability.
* Preserve behavior.

Never break working features.

---

# Security Rules

Always validate:

* Ownership
* Authentication
* Authorization

Vendor must access only own resources.

Admin access must remain protected.

Never expose sensitive data.

---

# Performance Rules

Prefer:

* Reusable components
* Shared services
* Efficient queries
* Proper population

Avoid:

* Duplicate requests
* Unnecessary renders
* Unused code

---

# Agent Behavior

When asked to implement a feature:

Step 1:
Analyze codebase.

Step 2:
List affected files.

Step 3:
Identify risks.

Step 4:
Suggest implementation plan.

Step 5:
Generate code only after confirmation.

Never start coding immediately.

Always understand architecture first.

Always think like a senior software architect.
