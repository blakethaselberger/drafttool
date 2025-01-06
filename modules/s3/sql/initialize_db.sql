CREATE TABLE IF NOT EXISTS players (
    player_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    position ENUM('C', 'LW', 'RW', 'D', 'G') NOT NULL,
    age INT CHECK (age > 0),
    height DECIMAL(4, 1),
    weight DECIMAL(4, 1),
    nationality VARCHAR(50),
    amateur_team VARCHAR(100),
    draft_eligible_year YEAR NOT NULL
);
CREATE TABLE IF NOT EXISTS teams (
    team_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    abbreviation VARCHAR(10) NOT NULL UNIQUE,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    arena VARCHAR(100),
    conference ENUM('Eastern', 'Western') NOT NULL,
    division ENUM('Atlantic', 'Metropolitan', 'Central', 'Pacific') NOT NULL
);
CREATE TABLE IF NOT EXISTS draft_sessions (
    session_id CHAR(36) PRIMARY KEY,
    current_pick INT DEFAULT 1,
    total_picks INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS draft_session_players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id CHAR(36) NOT NULL,
    player_id INT NOT NULL,
    drafted_by_team INT DEFAULT NULL,
    draft_position INT DEFAULT NULL,
    FOREIGN KEY (session_id) REFERENCES draft_sessions(session_id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES players(player_id) ON DELETE CASCADE,
    FOREIGN KEY (drafted_by_team) REFERENCES teams(team_id) ON DELETE
    SET NULL
);
CREATE TABLE IF NOT EXISTS draft_picks (
    pick_id INT AUTO_INCREMENT PRIMARY KEY,
    team_id INT NOT NULL,
    round INT NOT NULL,
    overall_pick INT NOT NULL,
    year YEAR NOT NULL,
    FOREIGN KEY (team_id) REFERENCES teams(team_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS season_statistics (
    season_id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    season_year VARCHAR(9) NOT NULL,
    team VARCHAR(100) NOT NULL,
    league VARCHAR(100) NOT NULL,
    games_played INT DEFAULT 0,
    goals INT DEFAULT 0,
    assists INT DEFAULT 0,
    points INT GENERATED ALWAYS AS (goals + assists) STORED,
    penalty_minutes INT DEFAULT 0,
    plus_minus INT DEFAULT 0,
    FOREIGN KEY (player_id) REFERENCES players(player_id) ON DELETE CASCADE
);