ALTER TABLE "carts" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "carts" ADD COLUMN "guest_id" text;