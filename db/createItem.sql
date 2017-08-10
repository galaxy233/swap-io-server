INSERT INTO items (name, description, user_id, condition, zipcode, image1, image2, image3, image4, usd_value)
VALUES ($1, $2, (SELECT id from users WHERE sub = $3), $4, $5, $6, $7, $8, $9, $10)
RETURNING *;
