-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sql6523716
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sql6523716
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `sql6523716`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql6523716`.`product` (
  `product_id` VARCHAR(45) NOT NULL,
  `product_name` VARCHAR(180) NOT NULL,
  `product_short_description` VARCHAR(300) NULL,
  `product_description` VARCHAR(1800) NULL,
  `product_main_image_url` VARCHAR(180) NULL,
  `product_category` VARCHAR(45) NULL,
  PRIMARY KEY (`product_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql6523716`.`dynamic_section`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql6523716`.`dynamic_section` (
  `d_section_id` VARCHAR(45) NOT NULL,
  `d_section_name` VARCHAR(45) NULL,
  `d_section_description` VARCHAR(300) NULL,
  PRIMARY KEY (`d_section_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql6523716`.`dynamic_attribute`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql6523716`.`dynamic_attribute` (
  `d_attribute_id` VARCHAR(45) NOT NULL,
  `d_attribute_name` VARCHAR(45) NULL,
  `d_attribute_description` VARCHAR(300) NULL,
  `d_attribute_key` VARCHAR(45) NULL,
  PRIMARY KEY (`d_attribute_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql6523716`.`product_dynamic_attributes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql6523716`.`product_dynamic_attributes` (
  `product_dynamic_attributes_id` VARCHAR(45) NOT NULL,
  `product_id` VARCHAR(45) NULL,
  `d_section_id` VARCHAR(45) NULL,
  `d_attribute_id` VARCHAR(45) NULL,
  `d_attribute_key` VARCHAR(80) NULL,
  `d_attribute_value` VARCHAR(300) NULL,
  PRIMARY KEY (`product_dynamic_attributes_id`),
  INDEX `product_id_idx` (`product_id` ASC) VISIBLE,
  INDEX `d_section_id_idx` (`d_section_id` ASC) VISIBLE,
  INDEX `d_attribute_id_idx` (`d_attribute_id` ASC) VISIBLE,
  CONSTRAINT `product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `sql6523716`.`product` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `d_section_id`
    FOREIGN KEY (`d_section_id`)
    REFERENCES `sql6523716`.`dynamic_section` (`d_section_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `d_attribute_id`
    FOREIGN KEY (`d_attribute_id`)
    REFERENCES `sql6523716`.`dynamic_attribute` (`d_attribute_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
