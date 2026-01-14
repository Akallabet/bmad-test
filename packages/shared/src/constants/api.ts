export const API_BASE_URL = '/api';

export const API_ENDPOINTS = {
  TASKS: '/tasks',
  TASKS_BY_ID: (id: number) => `/tasks/${id}`,
  TASKS_ARCHIVE: (id: number) => `/tasks/${id}/archive`,
  TASKS_RESTORE: (id: number) => `/tasks/${id}/restore`,
  TASKS_REORDER: '/tasks/reorder',
  TASKS_ARCHIVED: '/tasks/archived',
  HEALTH: '/health',
} as const;
