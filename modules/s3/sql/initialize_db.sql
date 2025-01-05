CREATE TABLE IF NOT EXISTS players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    team VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL,
    shoots ENUM('Left', 'Right') NOT NULL,
    nation VARCHAR(50) NOT NULL,
    place_of_birth VARCHAR(50),
    height DECIMAL(4, 1) DEFAULT NULL,
    weight DECIMAL(4, 1) DEFAULT NULL
);
CREATE TABLE seasons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    year VARCHAR(7) NOT NULL,
    team VARCHAR(50) NOT NULL,
    league VARCHAR(50) NOT NULL,
    games_played INT DEFAULT 0,
    goals INT DEFAULT 0,
    assists INT DEFAULT 0,
    points INT DEFAULT 0,
    penalty_minutes INT DEFAULT 0,
    plus_minus INT DEFAULT 0,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    abbreviation CHAR(3) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    arena VARCHAR(100),
    founded_year YEAR,
    division VARCHAR(50) NOT NULL,
    conference VARCHAR(50) NOT NULL
);
INSERT INTO teams (
        name,
        abbreviation,
        city,
        state,
        arena,
        founded_year,
        division,
        conference
    )
VALUES (
        'Anaheim Ducks',
        'ANA',
        'Anaheim',
        'California',
        'Honda Center',
        1993,
        'Pacific',
        'Western'
    ),
    (
        'Arizona Coyotes',
        'ARI',
        'Glendale',
        'Arizona',
        'Mullett Arena',
        1996,
        'Central',
        'Western'
    ),
    (
        'Boston Bruins',
        'BOS',
        'Boston',
        'Massachusetts',
        'TD Garden',
        1924,
        'Atlantic',
        'Eastern'
    ),
    (
        'Buffalo Sabres',
        'BUF',
        'Buffalo',
        'New York',
        'KeyBank Center',
        1970,
        'Atlantic',
        'Eastern'
    ),
    (
        'Calgary Flames',
        'CGY',
        'Calgary',
        'Alberta',
        'Scotiabank Saddledome',
        1972,
        'Pacific',
        'Western'
    ),
    (
        'Carolina Hurricanes',
        'CAR',
        'Raleigh',
        'North Carolina',
        'PNC Arena',
        1997,
        'Metropolitan',
        'Eastern'
    ),
    (
        'Chicago Blackhawks',
        'CHI',
        'Chicago',
        'Illinois',
        'United Center',
        1926,
        'Central',
        'Western'
    ),
    (
        'Colorado Avalanche',
        'COL',
        'Denver',
        'Colorado',
        'Ball Arena',
        1995,
        'Central',
        'Western'
    ),
    (
        'Columbus Blue Jackets',
        'CBJ',
        'Columbus',
        'Ohio',
        'Nationwide Arena',
        2000,
        'Metropolitan',
        'Eastern'
    ),
    (
        'Dallas Stars',
        'DAL',
        'Dallas',
        'Texas',
        'American Airlines Center',
        1993,
        'Central',
        'Western'
    ),
    (
        'Detroit Red Wings',
        'DET',
        'Detroit',
        'Michigan',
        'Little Caesars Arena',
        1926,
        'Atlantic',
        'Eastern'
    ),
    (
        'Edmonton Oilers',
        'EDM',
        'Edmonton',
        'Alberta',
        'Rogers Place',
        1972,
        'Pacific',
        'Western'
    ),
    (
        'Florida Panthers',
        'FLA',
        'Sunrise',
        'Florida',
        'FLA Live Arena',
        1993,
        'Atlantic',
        'Eastern'
    ),
    (
        'Los Angeles Kings',
        'LAK',
        'Los Angeles',
        'California',
        'Crypto.com Arena',
        1967,
        'Pacific',
        'Western'
    ),
    (
        'Minnesota Wild',
        'MIN',
        'Saint Paul',
        'Minnesota',
        'Xcel Energy Center',
        2000,
        'Central',
        'Western'
    ),
    (
        'Montreal Canadiens',
        'MTL',
        'Montreal',
        'Quebec',
        'Bell Centre',
        1909,
        'Atlantic',
        'Eastern'
    ),
    (
        'Nashville Predators',
        'NSH',
        'Nashville',
        'Tennessee',
        'Bridgestone Arena',
        1998,
        'Central',
        'Western'
    ),
    (
        'New Jersey Devils',
        'NJD',
        'Newark',
        'New Jersey',
        'Prudential Center',
        1982,
        'Metropolitan',
        'Eastern'
    ),
    (
        'New York Islanders',
        'NYI',
        'Elmont',
        'New York',
        'UBS Arena',
        1972,
        'Metropolitan',
        'Eastern'
    ),
    (
        'New York Rangers',
        'NYR',
        'New York',
        'New York',
        'Madison Square Garden',
        1926,
        'Metropolitan',
        'Eastern'
    ),
    (
        'Ottawa Senators',
        'OTT',
        'Ottawa',
        'Ontario',
        'Canadian Tire Centre',
        1992,
        'Atlantic',
        'Eastern'
    ),
    (
        'Philadelphia Flyers',
        'PHI',
        'Philadelphia',
        'Pennsylvania',
        'Wells Fargo Center',
        1967,
        'Metropolitan',
        'Eastern'
    ),
    (
        'Pittsburgh Penguins',
        'PIT',
        'Pittsburgh',
        'Pennsylvania',
        'PPG Paints Arena',
        1967,
        'Metropolitan',
        'Eastern'
    ),
    (
        'San Jose Sharks',
        'SJS',
        'San Jose',
        'California',
        'SAP Center',
        1991,
        'Pacific',
        'Western'
    ),
    (
        'Seattle Kraken',
        'SEA',
        'Seattle',
        'Washington',
        'Climate Pledge Arena',
        2021,
        'Pacific',
        'Western'
    ),
    (
        'St. Louis Blues',
        'STL',
        'St. Louis',
        'Missouri',
        'Enterprise Center',
        1967,
        'Central',
        'Western'
    ),
    (
        'Tampa Bay Lightning',
        'TBL',
        'Tampa',
        'Florida',
        'Amalie Arena',
        1992,
        'Atlantic',
        'Eastern'
    ),
    (
        'Toronto Maple Leafs',
        'TOR',
        'Toronto',
        'Ontario',
        'Scotiabank Arena',
        1917,
        'Atlantic',
        'Eastern'
    ),
    (
        'Vancouver Canucks',
        'VAN',
        'Vancouver',
        'British Columbia',
        'Rogers Arena',
        1970,
        'Pacific',
        'Western'
    ),
    (
        'Vegas Golden Knights',
        'VGK',
        'Paradise',
        'Nevada',
        'T-Mobile Arena',
        2017,
        'Pacific',
        'Western'
    ),
    (
        'Washington Capitals',
        'WSH',
        'Washington',
        'District of Columbia',
        'Capital One Arena',
        1974,
        'Metropolitan',
        'Eastern'
    ),
    (
        'Winnipeg Jets',
        'WPG',
        'Winnipeg',
        'Manitoba',
        'Canada Life Centre',
        2011,
        'Central',
        'Western'
    );