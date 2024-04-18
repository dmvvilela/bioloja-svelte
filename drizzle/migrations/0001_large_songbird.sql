ALTER TABLE "order_products_downloads" RENAME COLUMN "order_products_order_number" TO "order_number";--> statement-breakpoint
ALTER TABLE "order_products_downloads" RENAME COLUMN "order_products_product_id" TO "product_id";--> statement-breakpoint
ALTER TABLE "order_products_downloads" DROP CONSTRAINT "order_products_reference";
--> statement-breakpoint
DROP INDEX IF EXISTS "idx_order_products_downloads_order_number_product_id";--> statement-breakpoint
DROP INDEX IF EXISTS "idx_order_products_downloads_download_link";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_order_products_downloads_product_id" ON "order_products_downloads" ("order_number","product_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_products_downloads" ADD CONSTRAINT "order_products_reference" FOREIGN KEY ("order_number","product_id") REFERENCES "order_products"("order_number","product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "order_products_downloads" DROP COLUMN IF EXISTS "download_link";