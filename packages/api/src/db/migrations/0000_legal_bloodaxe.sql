CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`text` text NOT NULL,
	`created_at` integer NOT NULL,
	`archived_at` integer,
	`sort_order` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_tasks_archived_at` ON `tasks` (`archived_at`);--> statement-breakpoint
CREATE INDEX `idx_tasks_sort_order` ON `tasks` (`sort_order`);--> statement-breakpoint
CREATE INDEX `idx_tasks_created_at` ON `tasks` (`created_at`);