CREATE TABLE `dish` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`isVegan` integer NOT NULL,
	`restaurantId` integer,
	`dateAdded` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`restaurantId`) REFERENCES `restaurant`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `restaurant` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`address` text NOT NULL,
	`dateAdded` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
