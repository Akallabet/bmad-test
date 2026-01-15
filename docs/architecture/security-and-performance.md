# Security and Performance

## Security Requirements

**Frontend Security:**
- **XSS Prevention:** React's JSX automatically escapes user input - no `dangerouslySetInnerHTML` used
- **Secure Storage:** No sensitive data stored in localStorage (only welcome message flag)
- **HTTPS Only:** All API calls use same origin (HTTPS enforced by Fly.io)

**Backend Security:**
- **Input Validation:** Zod schemas validate all request bodies before processing
- **SQL Injection Prevention:** Drizzle ORM uses parameterized queries, never string concatenation
- **Rate Limiting:** 100 requests per minute per IP (via @fastify/rate-limit)
- **CORS Policy:** Same-origin only (frontend served from same domain as API)

**Authentication Security:**
- **N/A for MVP:** No authentication (NFR10), all users share same task list
- **Future:** JWT tokens with HttpOnly cookies, bcrypt password hashing

**Known Security Limitations (MVP Scope):**
- ❌ No CSRF protection (not needed without auth)
- ❌ No Content Security Policy headers
- ❌ No input sanitization beyond validation (XSS handled by React)
- ❌ No API authentication/authorization

## Performance Optimization

**Frontend Performance:**
- **Bundle Size Target:** < 200KB gzipped (NFR4)
- **Loading Strategy:**
  - Code splitting via React.lazy() for archived route
  - Critical CSS inline, component CSS code-split
- **Caching Strategy:**
  - Service Worker: Not implemented (out of MVP scope)
  - Browser caching: Static assets cached via Cache-Control headers
- **Optimistic Updates:** All mutations show instant UI feedback (< 100ms)

**Backend Performance:**
- **Response Time Target:** < 50ms for CRUD operations (NFR achievable with in-memory DB)
- **Database Optimization:**
  - Indexes on `archived_at`, `sort_order`, `created_at`
  - Limit queries to 1000 rows max
  - Batch updates in single transaction
- **Caching Strategy:** No caching layer (in-memory DB is fast enough)

**Performance Monitoring:**
- **Frontend:** No analytics (out of MVP scope)
- **Backend:** Pino logger tracks request duration, Fly.io metrics dashboard

**Known Performance Limitations:**
- ❌ No CDN for static assets (Fly.io edge proxy provides basic caching)
- ❌ No database connection pooling (single in-memory instance)
- ❌ No API response compression (Fastify default handles this)
