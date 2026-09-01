CREATE TABLE `footer_links` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`section` text DEFAULT 'Legal',
	`order` integer DEFAULT 0,
	`is_active` integer DEFAULT true
);
