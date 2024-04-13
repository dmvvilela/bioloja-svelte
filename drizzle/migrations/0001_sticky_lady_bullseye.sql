CREATE TABLE IF NOT EXISTS "order_products_downloads" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_products_order_number" text,
	"product_id" text,
	"download_link" text NOT NULL,
	"downloaded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_order_products_downloads_order_number_product_id" ON "order_products_downloads" ("order_products_order_number","product_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_order_products_downloads_download_link" ON "order_products_downloads" ("download_link");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_products_downloads" ADD CONSTRAINT "order_products_reference" FOREIGN KEY ("order_products_order_number","product_id") REFERENCES "order_products"("order_number","product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
