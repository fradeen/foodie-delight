ALTER TABLE `restaurant` ADD `addressLineOne` text NOT NULL;--> statement-breakpoint
ALTER TABLE `restaurant` ADD `addressLineTwo` text;--> statement-breakpoint
ALTER TABLE `restaurant` ADD `city` text NOT NULL;--> statement-breakpoint
ALTER TABLE `restaurant` ADD `pinCode` text NOT NULL;--> statement-breakpoint
ALTER TABLE `restaurant` ADD `state` text NOT NULL;--> statement-breakpoint
ALTER TABLE `restaurant` DROP COLUMN `address`;