# Monitoring and Observability

## Monitoring Stack

- **Frontend Monitoring:** None (out of MVP scope) - Future: Sentry for error tracking
- **Backend Monitoring:** Fly.io Metrics (built-in)
- **Error Tracking:** Console logs captured by Fly.io
- **Performance Monitoring:** Pino logger tracks request duration

## Key Metrics

**Frontend Metrics (Manual Observation):**
- Core Web Vitals (via Chrome DevTools)
- JavaScript errors (via Console)
- API response times (via Network tab)
- User interactions (manual observation)

**Backend Metrics (Fly.io Dashboard):**
- Request rate (requests per second)
- Error rate (4xx/5xx responses)
- Response time (p50, p95, p99)
- Database query performance (logged by Pino)

**Health Monitoring:**
- `/health` endpoint checked every 10 seconds by Fly.io
- Failed health checks trigger VM restart
- Logs available via `fly logs` command

## Logging Strategy

**Structured JSON Logs:**
```json
{
  "level": "info",
  "time": 1705156800000,
  "pid": 1,
  "hostname": "todo-app",
  "reqId": "req-1",
  "req": {
    "method": "POST",
    "url": "/api/tasks",
    "remoteAddress": "1.2.3.4"
  },
  "res": {
    "statusCode": 201
  },
  "responseTime": 12.5,
  "msg": "request completed"
}
```

**Log Levels:**
- **debug:** Detailed information for diagnosing issues
- **info:** General informational messages (request/response)
- **warn:** Warning messages (rate limit approaching)
- **error:** Error messages (exceptions, failures)

**Viewing Logs:**
```bash
# Stream live logs
fly logs

# Filter by level
fly logs --level error

# Search logs
fly logs | grep "POST /api/tasks"
```
