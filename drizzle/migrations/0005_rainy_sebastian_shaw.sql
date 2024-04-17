ALTER TABLE "addresses" DROP CONSTRAINT "addresses_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "addresses" ALTER COLUMN "city" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "addresses" ALTER COLUMN "state" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "addresses" ALTER COLUMN "postal_code" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "addresses" ALTER COLUMN "country" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "order_status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "line1" text;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "line2" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "payment_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "payment_method_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "user_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "user_phone" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "boleto_details" jsonb;--> statement-breakpoint
ALTER TABLE "addresses" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "addresses" DROP COLUMN IF EXISTS "first_name";--> statement-breakpoint
ALTER TABLE "addresses" DROP COLUMN IF EXISTS "last_name";--> statement-breakpoint
ALTER TABLE "addresses" DROP COLUMN IF EXISTS "phone";