DO $$ BEGIN
 CREATE TYPE "user_roles" AS ENUM('USER', 'EDITOR', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_roles" DEFAULT 'USER' NOT NULL;