ALTER TABLE "products" ALTER COLUMN "published" SET DEFAULT true;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_categories_slug" ON "categories" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_users_id" ON "users" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_users_email" ON "users" ("email");