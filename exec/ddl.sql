-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema wayg
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `wayg` ;

-- -----------------------------------------------------
-- Schema wayg
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `wayg` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `wayg` ;

-- -----------------------------------------------------
-- Table `wayg`.`feed`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wayg`.`feed` ;

CREATE TABLE IF NOT EXISTS `wayg`.`feed` (
  `feed_no` INT NOT NULL AUTO_INCREMENT,
  `feed_content` VARCHAR(100) NOT NULL,
  `feed_like` INT NULL DEFAULT NULL,
  `feed_nickname` VARCHAR(10) NOT NULL,
  `feed_title` VARCHAR(45) NOT NULL,
  `user_no` INT NOT NULL,
  `feed_regdate` DATETIME NULL DEFAULT NULL,
  `feed_placename` VARCHAR(45) NULL DEFAULT NULL,
  `feed_file` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`feed_no`))
ENGINE = MyISAM
AUTO_INCREMENT = 408
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `FKancit2aaw2juylcgugs05iwk8` ON `wayg`.`feed` (`user_no` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `wayg`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wayg`.`user` ;

CREATE TABLE IF NOT EXISTS `wayg`.`user` (
  `user_no` INT NOT NULL,
  `role` VARCHAR(255) NOT NULL,
  `user_age` VARCHAR(255) NULL DEFAULT NULL,
  `user_email` VARCHAR(45) NOT NULL,
  `user_gender` VARCHAR(255) NULL DEFAULT NULL,
  `user_name` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`user_no`))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `wayg`.`feedlike`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wayg`.`feedlike` ;

CREATE TABLE IF NOT EXISTS `wayg`.`feedlike` (
  `like_no` INT NOT NULL,
  `user_no` INT NOT NULL,
  `feed_no` INT NOT NULL,
  PRIMARY KEY (`like_no`))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `fk_feedlike_user1_idx` ON `wayg`.`feedlike` (`user_no` ASC) VISIBLE;

CREATE INDEX `fk_feedlike_feed1_idx` ON `wayg`.`feedlike` (`feed_no` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `wayg`.`feedword`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wayg`.`feedword` ;

CREATE TABLE IF NOT EXISTS `wayg`.`feedword` (
  `feedword_no` INT NOT NULL AUTO_INCREMENT,
  `feedword_word` VARCHAR(45) NOT NULL,
  `feedword_count` INT NOT NULL DEFAULT '0',
  `feedword_name` VARCHAR(45) NOT NULL,
  `feed_no` INT NOT NULL,
  PRIMARY KEY (`feedword_no`))
ENGINE = MyISAM
AUTO_INCREMENT = 547
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `idx__feedword__count` ON `wayg`.`feedword` (`feedword_count` ASC) VISIBLE;

CREATE INDEX `idx__feedword__word` ON `wayg`.`feedword` (`feedword_word` ASC) VISIBLE;

CREATE INDEX `idx__feedword__name` ON `wayg`.`feedword` (`feedword_name` ASC) VISIBLE;

CREATE INDEX `fk_feedword_feed1_idx` ON `wayg`.`feedword` (`feed_no` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `wayg`.`place`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wayg`.`place` ;

CREATE TABLE IF NOT EXISTS `wayg`.`place` (
  `place_no` INT NOT NULL AUTO_INCREMENT,
  `place_address` VARCHAR(45) NULL DEFAULT NULL,
  `place_animal` VARCHAR(100) NULL DEFAULT NULL,
  `place_experience` VARCHAR(100) NULL DEFAULT NULL,
  `place_holiday` VARCHAR(45) NULL DEFAULT NULL,
  `place_info` VARCHAR(1000) NULL DEFAULT NULL,
  `place_more` VARCHAR(1000) NULL DEFAULT NULL,
  `place_name` VARCHAR(45) NOT NULL,
  `place_park` VARCHAR(45) NULL DEFAULT NULL,
  `place_phone` VARCHAR(15) NULL DEFAULT NULL,
  `place_time` VARCHAR(200) NULL DEFAULT NULL,
  `place_scrap` INT NOT NULL DEFAULT '0',
  PRIMARY KEY (`place_no`))
ENGINE = MyISAM
AUTO_INCREMENT = 11792
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `wayg`.`placescrap`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wayg`.`placescrap` ;

CREATE TABLE IF NOT EXISTS `wayg`.`placescrap` (
  `scrap_no` INT NOT NULL,
  `user_no` INT NOT NULL,
  `place_no` INT NOT NULL,
  PRIMARY KEY (`scrap_no`))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `fk_placescrap_user_idx` ON `wayg`.`placescrap` (`user_no` ASC) VISIBLE;

CREATE INDEX `fk_placescrap_place1_idx` ON `wayg`.`placescrap` (`place_no` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `wayg`.`placeword`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wayg`.`placeword` ;

CREATE TABLE IF NOT EXISTS `wayg`.`placeword` (
  `placeword_no` INT NOT NULL AUTO_INCREMENT,
  `placeword_count` INT NULL DEFAULT NULL,
  `placeword_name` VARCHAR(100) NULL DEFAULT NULL,
  `placeword_word` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`placeword_no`))
ENGINE = MyISAM
AUTO_INCREMENT = 69378458
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `idx__placeword__count` ON `wayg`.`placeword` (`placeword_count` ASC) VISIBLE;

CREATE INDEX `idx__placeword__word` ON `wayg`.`placeword` (`placeword_word` ASC) VISIBLE;

CREATE INDEX `idx__placeword__name` ON `wayg`.`placeword` (`placeword_name` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
