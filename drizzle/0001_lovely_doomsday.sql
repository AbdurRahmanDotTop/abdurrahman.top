CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`company` text,
	`project_type` text,
	`budget` text,
	`timeline` text,
	`source` text,
	`message` text NOT NULL,
	`status` text DEFAULT 'unread',
	`created_at` integer NOT NULL
);
