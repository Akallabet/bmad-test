# Testing Strategy

**Decision:** Manual testing only for MVP (no automated test suite)

**Manual Testing Checklist:**

**Functional Tests (FR1-FR9):**
1. ✅ Add new task via input field + Enter key
2. ✅ Add new task via "Add" button click
3. ✅ Edit task inline by clicking on text
4. ✅ Save edited task with Enter key
5. ✅ Save edited task by clicking away (blur)
6. ✅ Cancel edit with Escape key
7. ✅ Archive task, verify it disappears from active list
8. ✅ Navigate to /archived, verify archived task appears
9. ✅ Restore archived task, verify it returns to active list
10. ✅ Sort by date (newest first, oldest first)
11. ✅ Sort alphabetically (A-Z, Z-A)
12. ✅ Drag-and-drop manual reorder (if implemented)
13. ✅ Welcome message displays on first visit
14. ✅ Welcome message dismissed, doesn't show on return
15. ✅ Reload page, verify tasks persist
16. ✅ GitHub link in footer opens documentation

**Browser Tests:**
- Chrome (latest) on desktop
- Safari (latest) on iPhone
- Firefox (latest) on desktop

**Non-Functional Tests (NFR1-NFR10):**
- Load time < 2 seconds (check Network tab)
- UI operations feel instant (< 100ms)
- Responsive layout on mobile (375px width)

**Post-MVP Test Strategy:**

When adding automated tests, follow this pyramid:

```
     /\
    /E2E\      ← 5-10 E2E tests (Playwright)
   /------\
  /Integr-\   ← 20-30 integration tests (API routes)
 /----------\
/Unit Tests \ ← 50+ unit tests (components, services)
```

**Recommended Tools:**
- **Frontend Unit:** Vitest + React Testing Library
- **Backend Unit:** Vitest
- **E2E:** Playwright
- **API Testing:** Supertest or Playwright API testing
