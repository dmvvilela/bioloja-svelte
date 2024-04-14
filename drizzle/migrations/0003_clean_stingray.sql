ALTER TABLE "carts" DROP CONSTRAINT "carts_coupon_code_coupons_code_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "carts" ADD CONSTRAINT "carts_coupon_code_coupons_code_fk" FOREIGN KEY ("coupon_code") REFERENCES "coupons"("code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
