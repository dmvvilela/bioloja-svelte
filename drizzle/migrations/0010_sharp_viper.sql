CREATE TABLE IF NOT EXISTS "subscribers" (
	"email" text PRIMARY KEY NOT NULL,
	"from" text NOT NULL,
	"subscribed_at" timestamp DEFAULT now() NOT NULL,
	"unsubscribed_at" timestamp
);
