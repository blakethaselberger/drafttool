CREATE TABLE IF NOT EXISTS players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    team VARCHAR(50),
    height DECIMAL(4,1),
    weight DECIMAL(4,1)
);

