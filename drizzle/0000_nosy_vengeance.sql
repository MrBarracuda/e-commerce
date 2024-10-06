-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "public"."size" AS ENUM('5', '10', '15', '30', '50', '75', '100', '125', '150', '200');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('fulfilled', 'shipped', 'awaiting_shipment');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/