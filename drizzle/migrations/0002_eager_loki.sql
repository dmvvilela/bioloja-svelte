ALTER TABLE "order_products_downloads" ADD COLUMN "link_name" text;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_order_products_downloads_link_name" ON "order_products_downloads" ("link_name");