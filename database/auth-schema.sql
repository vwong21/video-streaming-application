USE authentication;
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    userPassword VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
)