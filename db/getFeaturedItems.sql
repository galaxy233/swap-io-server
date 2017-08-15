SELECT * FROM items
OFFSET floor(random()*((SELECT COUNT(*) FROM items)-2))
LIMIT 3;
