ALTER TABLE "cart_items" DROP COLUMN IF EXISTS "item_price";--> statement-breakpoint
ALTER TABLE "cart_items" DROP COLUMN IF EXISTS "item_discount_price";--> statement-breakpoint
ALTER TABLE "carts" DROP COLUMN IF EXISTS "discount";--> statement-breakpoint
ALTER TABLE "carts" DROP COLUMN IF EXISTS "subtotal";--> statement-breakpoint
ALTER TABLE "carts" DROP COLUMN IF EXISTS "total";