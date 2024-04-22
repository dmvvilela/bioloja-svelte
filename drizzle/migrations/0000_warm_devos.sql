DO $$ BEGIN
 CREATE TYPE "coupon_types" AS ENUM('PERCENTAGE', 'FIXED_AMOUNT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "order_status" AS ENUM('COMPLETED', 'PAYMENT_PENDING', 'PROCESSING', 'CANCELLED', 'AWAITING', 'REFUNDED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "user_roles" AS ENUM('USER', 'EDITOR', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"name" text,
	"city" text,
	"country" text,
	"line1" text,
	"line2" text,
	"state" text,
	"postal_code" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "attributes" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"data_type" text NOT NULL,
	CONSTRAINT "attributes_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cart_items" (
	"cart_id" text NOT NULL,
	"product_id" integer NOT NULL,
	"line_id" serial NOT NULL,
	CONSTRAINT "cart_items_cart_id_product_id_pk" PRIMARY KEY("cart_id","product_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "carts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"order_number" text,
	"coupon_code" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "coupons" (
	"code" text PRIMARY KEY NOT NULL,
	"value" integer NOT NULL,
	"type" "coupon_types" DEFAULT 'PERCENTAGE' NOT NULL,
	"min_amount" integer,
	"max_amount" integer,
	"max_uses" integer,
	"expires_at" timestamp with time zone,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_products" (
	"order_number" text NOT NULL,
	"product_id" integer NOT NULL,
	"line_id" serial NOT NULL,
	"refunded" boolean DEFAULT false,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"categories" text NOT NULL,
	"price" integer NOT NULL,
	"discount_price" integer,
	"image" text NOT NULL,
	"download_links" jsonb NOT NULL,
	CONSTRAINT "order_products_order_number_product_id_pk" PRIMARY KEY("order_number","product_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_products_downloads" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_number" text NOT NULL,
	"product_id" integer NOT NULL,
	"link_name" text NOT NULL,
	"downloaded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"order_number" text PRIMARY KEY NOT NULL,
	"payment_id" text NOT NULL,
	"payment_method_id" text NOT NULL,
	"payment_confirmed_at" timestamp,
	"user_id" text NOT NULL,
	"user_email" text NOT NULL,
	"user_name" text NOT NULL,
	"user_phone" text NOT NULL,
	"address_id" integer,
	"order_status" "order_status" NOT NULL,
	"payment_method_title" text,
	"boleto_details" jsonb,
	"coupon_code" text,
	"cart_discount" integer DEFAULT 0,
	"order_subtotal" integer NOT NULL,
	"order_total" integer NOT NULL,
	"order_refund" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "password_resets" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"token_hash" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_attributes" (
	"product_id" integer,
	"attribute_id" integer,
	"value_text" text,
	"value_number" integer,
	"value_boolean" boolean,
	CONSTRAINT "product_attributes_product_id_attribute_id_pk" PRIMARY KEY("product_id","attribute_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_categories" (
	"product_id" integer,
	"category_id" integer,
	CONSTRAINT "product_categories_product_id_category_id_pk" PRIMARY KEY("product_id","category_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_tags" (
	"product_id" integer,
	"tag_id" integer,
	CONSTRAINT "product_tags_product_id_tag_id_pk" PRIMARY KEY("product_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"short_description" text NOT NULL,
	"description" text NOT NULL,
	"price" integer NOT NULL,
	"discount_price" integer,
	"discount_expires_at" timestamp,
	"image_urls" text NOT NULL,
	"download_links" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscribers" (
	"email" text PRIMARY KEY NOT NULL,
	"from" text NOT NULL,
	"subscribed_at" timestamp DEFAULT now() NOT NULL,
	"unsubscribed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "tags_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"role" "user_roles" DEFAULT 'USER' NOT NULL,
	"hashed_password" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_addresses_id" ON "addresses" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_attributes_slug" ON "attributes" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_cart_items_cart_id" ON "cart_items" ("cart_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_cart_items_product_id" ON "cart_items" ("product_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_carts_id" ON "carts" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_carts_user_id" ON "carts" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_carts_order_number" ON "carts" ("order_number");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_categories_slug" ON "categories" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_coupons_code" ON "coupons" ("code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_order_products_order_number" ON "order_products" ("order_number");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_order_products_product_id" ON "order_products" ("product_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_order_products_downloads_link_name" ON "order_products_downloads" ("link_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_order_products_downloads_product_id" ON "order_products_downloads" ("order_number","product_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_orders_user_id" ON "orders" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_orders_order_number" ON "orders" ("order_number");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_orders_order_status" ON "orders" ("order_status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_product_attributes_product_id" ON "product_attributes" ("product_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_product_attributes_attribute_id" ON "product_attributes" ("attribute_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_product_categories_product_id" ON "product_categories" ("product_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_product_categories_category_id" ON "product_categories" ("category_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_product_tags_product_id" ON "product_tags" ("product_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_product_tags_tag_id" ON "product_tags" ("tag_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_products_id" ON "products" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_products_slug" ON "products" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_sessions_user_id" ON "sessions" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_tags_slug" ON "tags" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_users_id" ON "users" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_users_email" ON "users" ("email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "carts" ADD CONSTRAINT "carts_order_number_orders_order_number_fk" FOREIGN KEY ("order_number") REFERENCES "orders"("order_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "carts" ADD CONSTRAINT "carts_coupon_code_coupons_code_fk" FOREIGN KEY ("coupon_code") REFERENCES "coupons"("code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_products" ADD CONSTRAINT "order_products_order_number_orders_order_number_fk" FOREIGN KEY ("order_number") REFERENCES "orders"("order_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_products" ADD CONSTRAINT "order_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_products_downloads" ADD CONSTRAINT "order_products_reference" FOREIGN KEY ("order_number","product_id") REFERENCES "order_products"("order_number","product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_address_id_addresses_id_fk" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_coupon_code_coupons_code_fk" FOREIGN KEY ("coupon_code") REFERENCES "coupons"("code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "password_resets" ADD CONSTRAINT "password_resets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_attributes" ADD CONSTRAINT "product_attributes_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_attributes" ADD CONSTRAINT "product_attributes_attribute_id_attributes_id_fk" FOREIGN KEY ("attribute_id") REFERENCES "attributes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_tags" ADD CONSTRAINT "product_tags_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_tags" ADD CONSTRAINT "product_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
