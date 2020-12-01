drop table replies;
drop table articles;
drop table users;

create TABLE IF NOT EXISTS `users`(`user_id` INT UNSIGNED AUTO_INCREMENT, `openid` VARCHAR(100) NOT NULL, `nickname` varchar(60) NOT NULL, `is_male` BOOLEAN NOT NULL, `icon_path` VARCHAR(512) NOT NULL, `province` VARCHAR(40), `city` VARCHAR(40), `register_date` DATE NOT NULL, PRIMARY KEY (`user_id`))ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `articles`( `art_id` INT UNSIGNED AUTO_INCREMENT, `title` VARCHAR(200) NOT NULL, `content` MEDIUMTEXT NOT null, `author` INT UNSIGNED NOT NULL, FOREIGN KEY fk_author(author) REFERENCES users(user_id), `submission_date` DATE, `category` varchar(40) NOT NULL, PRIMARY KEY(`art_id`))ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `replies`( `rep_id` INT UNSIGNED AUTO_INCREMENT, `art_id` INT UNSIGNED NOT NULL, FOREIGN KEY fk_art_id(art_id) REFERENCES articles(art_id), `rep_content` MEDIUMTEXT NOT null, `author` INT UNSIGNED NOT NULL, FOREIGN KEY fk_author(author) REFERENCES users(user_id), `submission_date` DATE, PRIMARY KEY (`rep_id`))ENGINE=InnoDB DEFAULT CHARSET=utf8;
