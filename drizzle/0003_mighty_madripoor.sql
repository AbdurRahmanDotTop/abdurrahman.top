CREATE TABLE `menus` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`icon` text,
	`parent_id` text,
	`order` integer DEFAULT 0,
	`is_active` integer DEFAULT true
);
