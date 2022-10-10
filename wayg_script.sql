-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema wayg
-- -----------------------------------------------------
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `user_no` INT NOT NULL,
  `user_name` VARCHAR(45) NOT NULL,
  `user_email` VARCHAR(45) NOT NULL,
  `user_gender` VARCHAR(45) NULL,
  `user_age` VARCHAR(45) NULL,
  PRIMARY KEY (`user_no`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Place`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Place` (
  `place_no` INT NOT NULL,
  `place_name` VARCHAR(45) NOT NULL,
  `place_address` VARCHAR(45) NULL,
  `place_info` VARCHAR(45) NULL,
  `place_scrap` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`place_no`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Placeword`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Placeword` (
  `placeword_no` INT NOT NULL,
  `placeword_word` VARCHAR(45) NOT NULL,
  `place_no` INT NOT NULL,
  PRIMARY KEY (`placeword_no`),
  INDEX `fk_Placeword_Place_idx` (`place_no` ASC) VISIBLE,
  CONSTRAINT `fk_Placeword_Place`
    FOREIGN KEY (`place_no`)
    REFERENCES `mydb`.`Place` (`place_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Feed`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Feed` (
  `feed_no` INT NOT NULL,
  `feed_title` VARCHAR(45) NOT NULL,
  `feed_content` VARCHAR(45) NOT NULL,
  `feed_like` INT NULL DEFAULT 0,
  `user_no` INT NOT NULL,
  PRIMARY KEY (`feed_no`),
  INDEX `fk_Feed_User1_idx` (`user_no` ASC) VISIBLE,
  CONSTRAINT `fk_Feed_User1`
    FOREIGN KEY (`user_no`)
    REFERENCES `mydb`.`User` (`user_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Scrap`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Scrap` (
  `scrap_no` INT NOT NULL,
  `user_no` INT NOT NULL,
  `place_no` INT NOT NULL,
  PRIMARY KEY (`scrap_no`),
  INDEX `fk_Scrap_User1_idx` (`user_no` ASC) VISIBLE,
  INDEX `fk_Scrap_Place1_idx` (`place_no` ASC) VISIBLE,
  CONSTRAINT `fk_Scrap_User1`
    FOREIGN KEY (`user_no`)
    REFERENCES `mydb`.`User` (`user_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Scrap_Place1`
    FOREIGN KEY (`place_no`)
    REFERENCES `mydb`.`Place` (`place_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Feedword`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Feedword` (
  `feedword_no` INT NOT NULL,
  `feedword_word` VARCHAR(45) NOT NULL,
  `feed_no` INT NOT NULL,
  PRIMARY KEY (`feedword_no`),
  INDEX `fk_Feedword_Feed1_idx` (`feed_no` ASC) VISIBLE,
  CONSTRAINT `fk_Feedword_Feed1`
    FOREIGN KEY (`feed_no`)
    REFERENCES `mydb`.`Feed` (`feed_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Like`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Like` (
  `like_no` INT NOT NULL,
  `user_no` INT NOT NULL,
  `feed_no` INT NOT NULL,
  PRIMARY KEY (`like_no`),
  INDEX `fk_Like_User1_idx` (`user_no` ASC) VISIBLE,
  INDEX `fk_Like_Feed1_idx` (`feed_no` ASC) VISIBLE,
  CONSTRAINT `fk_Like_User1`
    FOREIGN KEY (`user_no`)
    REFERENCES `mydb`.`User` (`user_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Like_Feed1`
    FOREIGN KEY (`feed_no`)
    REFERENCES `mydb`.`Feed` (`feed_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Placefile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Placefile` (
  `placefile_no` INT NOT NULL,
  `placefile_savefolder` VARCHAR(45) NULL,
  `placefile_originfile` VARCHAR(45) NULL,
  `placefile_savefile` VARCHAR(45) NULL,
  `place_no` INT NOT NULL,
  PRIMARY KEY (`placefile_no`),
  INDEX `fk_Placefile_Place1_idx` (`place_no` ASC) VISIBLE,
  CONSTRAINT `fk_Placefile_Place1`
    FOREIGN KEY (`place_no`)
    REFERENCES `mydb`.`Place` (`place_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Feedfile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Feedfile` (
  `feedfile_no` INT NOT NULL,
  `feedfile_savefolder` VARCHAR(45) NULL,
  `feedfile_originfile` VARCHAR(45) NULL,
  `feedfile_savefile` VARCHAR(45) NULL,
  `feed_no` INT NOT NULL,
  PRIMARY KEY (`feedfile_no`),
  INDEX `fk_Feedfile_Feed1_idx` (`feed_no` ASC) VISIBLE,
  CONSTRAINT `fk_Feedfile_Feed1`
    FOREIGN KEY (`feed_no`)
    REFERENCES `mydb`.`Feed` (`feed_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
