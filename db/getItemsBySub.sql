SELECT * FROM items
WHERE user_id = (SELECT id FROM users WHERE sub = $1);
