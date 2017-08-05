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
	CONSTRAINT items_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "items" ADD CONSTRAINT "items_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

INSERT INTO users(username, sub)
VALUES
('thevjm', 'auth0|597ba1d213f40b08485fae42'),
('victor', 'facebook|1016497821826298');

INSERT INTO items
(name, description, user_id, condition, zipcode, image1)
VALUES
('Red computer', 'A nice computer, very fast', 1, 'Used', '10001', 'http://www.clker.com/cliparts/i/e/f/m/L/s/computer-monitor-red.svg'),
('Purple guitar', 'An awesome purple guitar', 1, 'New', '84102', 'http://media.guitarcenter.com/is/image/MMGS7/JS2450-Joe-Satriani-Signature-Electric-Guitar-Muscle-Car-Purple/J13746000001000-00-500x500.jpg'),
('Yellow lambo', 'A really cool car', 2, 'New', '84103', 'http://www.thesupercars.org/wp-content/uploads/2011/04/2010-BF-performance-Lamborghini-Gallardo-GT600.jpg'),
('Honda Civic', 'Kinda boring, but it runs', 2, 'New', '84103', 'https://services.edmunds-media.com/image-service/media-ed/sharp/?quality=70&format=jpg:progressive&image=%2Fhonda%2Fcivic%2F2016%2Fevox%2F2016_honda_civic_sedan_lx_tds3_evox_8_500.jpg'),
('Red truck', 'This red truck could be yours', 2, 'New', '84103', 'https://gordonlisheditedthis.files.wordpress.com/2011/03/red_truck_big_pic.jpg'),
('Trampoline', 'Big, round, black, trampoline!', 2, 'Used', '84111', 'https://images-na.ssl-images-amazon.com/images/I/41K32T04S3L.jpg'),
('Yellow lambo', 'A really cool car', 2, 'New', '84103', 'http://www.thesupercars.org/wp-content/uploads/2011/04/2010-BF-performance-Lamborghini-Gallardo-GT600.jpg'),
('Honda Civic', 'Kinda boring, but it runs', 2, 'New', '84103', 'https://services.edmunds-media.com/image-service/media-ed/sharp/?quality=70&format=jpg:progressive&image=%2Fhonda%2Fcivic%2F2016%2Fevox%2F2016_honda_civic_sedan_lx_tds3_evox_8_500.jpg'),
('Red truck', 'This red truck could be yours', 2, 'New', '84103', 'https://gordonlisheditedthis.files.wordpress.com/2011/03/red_truck_big_pic.jpg'),
('Trampoline', 'Big, round, black, trampoline!', 2, 'Used', '84111', 'https://images-na.ssl-images-amazon.com/images/I/41K32T04S3L.jpg'),
('Yellow lambo', 'A really cool car', 2, 'New', '84103', 'http://www.thesupercars.org/wp-content/uploads/2011/04/2010-BF-performance-Lamborghini-Gallardo-GT600.jpg'),
('Honda Civic', 'Kinda boring, but it runs', 2, 'New', '84103', 'https://services.edmunds-media.com/image-service/media-ed/sharp/?quality=70&format=jpg:progressive&image=%2Fhonda%2Fcivic%2F2016%2Fevox%2F2016_honda_civic_sedan_lx_tds3_evox_8_500.jpg'),
('Red truck', 'This red truck could be yours', 2, 'New', '84103', 'https://gordonlisheditedthis.files.wordpress.com/2011/03/red_truck_big_pic.jpg'),
('Trampoline', 'Big, round, black, trampoline!', 2, 'Used', '84111', 'https://images-na.ssl-images-amazon.com/images/I/41K32T04S3L.jpg')
