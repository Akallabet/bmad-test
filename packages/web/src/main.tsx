import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import type { Task } from '@todo-app/shared';

function App() {
  // Test that shared types are importable
  const testTask: Task = {
    id: 1,
    text: 'Test task',
    createdAt: new Date(),
    archivedAt: null,
    sortOrder: 0,
  };

  return (
    <div>
      <h1>Simple To-Do App</h1>
      <p>BMAD Method Demo - Setup Complete</p>
      <p>Shared types working: Task #{testTask.id}</p>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
