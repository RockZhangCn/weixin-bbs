
CREATE TABLE IF NOT EXISTS `articles`( `art_id` INT UNSIGNED AUTO_INCREMENT, `title` VARCHAR(100) NOT NULL, `content` MEDIUMTEXT NOT null, `author` VARCHAR(40) NOT NULL, `submission_date` DATE, `category` varchar(40) NOT NULL, PRIMARY KEY ( `art_id` ) )ENGINE=InnoDB DEFAULT CHARSET=utf8



