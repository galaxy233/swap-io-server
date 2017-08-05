SELECT * FROM items
WHERE name ~* $1 OR description ~* $1;
