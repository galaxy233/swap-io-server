SELECT sub FROM items
INNER JOIN users
ON users.id = items.user_id
WHERE items.id = $1;
