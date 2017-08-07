DROP TABLE IF EXISTS trades;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;

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
	"image1" VARCHAR(255),
	"image2" VARCHAR(255),
	"image3" VARCHAR(255),
	"image4" VARCHAR(255),
	"timestamp" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"usd_value" integer,
	CONSTRAINT items_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "trades" (
	"id" serial NOT NULL,
	"user1_item_id" integer NOT NULL,
	"user2_item_id" integer NOT NULL,
	"user1_sub" VARCHAR(255) NOT NULL,
	"user2_sub" VARCHAR(255) NOT NULL,
	"timestamp" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"status" VARCHAR(255) NOT NULL DEFAULT 'pending',
	"user1_complete" BOOLEAN NOT NULL DEFAULT 'false',
	"user2_complete" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT trades_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "items" ADD CONSTRAINT "items_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "trades" ADD CONSTRAINT "trades_fk0" FOREIGN KEY ("user1_item_id") REFERENCES "items"("id");
ALTER TABLE "trades" ADD CONSTRAINT "trades_fk1" FOREIGN KEY ("user2_item_id") REFERENCES "items"("id");

INSERT INTO users(username, sub)
VALUES
('thevjm', 'auth0|597ba1d213f40b08485fae42'),
('victor', 'facebook|1016497821826298');

INSERT INTO items
(name, description, user_id, condition, zipcode, usd_value)
VALUES

('Red computer', 'A nice computer, very fast', 1, 'Used', '10001', 50),
('Honda Civic', 'Kinda boring, but it runs', 2, 'New', '84103', 100);
