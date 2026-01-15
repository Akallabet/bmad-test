# External APIs

**Status: Not Applicable**

This project does not require any external API integrations. All functionality is self-contained within the application:

- ✅ Task storage: Handled by internal SQLite database
- ✅ User interface: Self-hosted React application
- ✅ Deployment: Fly.io platform (not an external API, it's the hosting platform)

**Explicitly Excluded (per PRD):**
- ❌ Authentication providers (Auth0, Clerk, Supabase Auth)
- ❌ Analytics services (Google Analytics, Plausible, Mixpanel)
- ❌ Error tracking (Sentry, LogRocket, Rollbar)
- ❌ Email services (SendGrid, Mailgun)
- ❌ File storage (S3, Cloudinary)

The architecture's radical simplicity principle means zero external dependencies beyond the deployment platform itself. This eliminates API key management, rate limit concerns, third-party downtime risks, and integration complexity.

**Future Consideration:** If authentication is added post-MVP, consider Fly.io's built-in auth or lightweight solutions like JWT with bcrypt rather than external OAuth providers.
