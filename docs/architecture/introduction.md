# Introduction

This document outlines the complete fullstack architecture for **Simple To-Do App (BMAD Method Demonstration)**, including backend systems, frontend implementation, and their integration. It serves as the single source of truth for AI-driven development, ensuring consistency across the entire technology stack.

This unified approach combines what would traditionally be separate backend and frontend architecture documents, streamlining the development process for modern fullstack applications where these concerns are increasingly intertwined.

**Architecture Philosophy for This Project:**

Given the unique 2-hour build constraint, this architecture prioritizes:
- **Radical Simplicity:** Monolithic architecture with in-memory database eliminates infrastructure complexity
- **Zero Configuration Overhead:** Leveraging platform defaults (Fly.io HTTPS, React's built-in security) over custom implementations
- **Type Safety Across Stack:** Shared TypeScript types between frontend and backend prevent integration issues
- **Portfolio-First Design:** Clean, readable code structure that demonstrates architectural thinking, not just functionality

The architecture balances demonstrating best practices (ORM usage, validation, responsive design) with pragmatic shortcuts necessitated by time constraints (in-memory DB, manual testing, no auth).

## Starter Template or Existing Project

**N/A - Greenfield project**

This is a greenfield project with no starter template. We'll build the monorepo structure from scratch using pnpm workspaces, optimized for the 2-hour delivery constraint.

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-01-13 | v1.0 | Initial architecture document creation | Winston (Architect) |
