CREATE TABLE "users" (
	"id" serial NOT NULL,
	"username" VARCHAR(255) NOT NULL UNIQUE,
	"role" VARCHAR(255) NOT NULL DEFAULT 'user',
	"sub" VARCHAR(255) NOT NULL UNIQUE,
	CONSTRAINT users_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "items" (
	"id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	"description" VARCHAR(255) NOT NULL,
	"user_id" integer NOT NULL,
	"condition" VARCHAR(255) NOT NULL,
	"zipcode" VARCHAR(255) NOT NULL,
	"image_url" VARCHAR(255),
	CONSTRAINT items_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "trades" (
	"id" serial NOT NULL,
	"initiating_item_id" integer NOT NULL,
	"receiving_item_id" integer NOT NULL,
	CONSTRAINT trades_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "items" ADD CONSTRAINT "items_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "trades" ADD CONSTRAINT "trades_fk0" FOREIGN KEY ("initiating_item_id") REFERENCES "items"("id");
ALTER TABLE "trades" ADD CONSTRAINT "trades_fk1" FOREIGN KEY ("receiving_item_id") REFERENCES "items"("id");
