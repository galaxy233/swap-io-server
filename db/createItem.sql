INSERT INTO items (name, description, user_id, condition, zipcode, image_url)
VALUES ($1, $2, (SELECT id from users WHERE sub = $3), $4, $5, $6);
