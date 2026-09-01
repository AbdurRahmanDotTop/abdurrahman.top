CREATE TABLE `social_links` (
	`id` text PRIMARY KEY NOT NULL,
	`platform` text NOT NULL,
	`url` text NOT NULL,
	`icon` text,
	`order` integer DEFAULT 0,
	`is_active` integer DEFAULT true,
	`show_in_hero` integer DEFAULT true
);
