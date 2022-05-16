-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema registrosincidencias
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema registrosincidencias
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `registrosincidencias` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `registrosincidencias` ;

-- -----------------------------------------------------
-- Table `registrosincidencias`.`violencias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `registrosincidencias`.`violencias` (
  `ID_VIOLENCIA` INT NOT NULL AUTO_INCREMENT,
  `VIOLENCIA_TIPO` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`ID_VIOLENCIA`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `registrosincidencias`.`incidencias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `registrosincidencias`.`incidencias` (
  `ID_INCIDENCIA` INT NOT NULL AUTO_INCREMENT,
  `INC_MUN` VARCHAR(50) NOT NULL,  
  `INC_INST` VARCHAR(100) NOT NULL,  
  `INC_ESP` VARCHAR(100) NOT NULL,  
  `INC_FECHA` VARCHAR(15) NOT NULL,
  `INC_HORA` VARCHAR(15) NULL DEFAULT NULL,
  `violencias_ID_VIOLENCIA` INT NOT NULL,
  `INC_VIO_DESCR` VARCHAR(450) NOT NULL,
  `INC_VIC_EDAD` VARCHAR(45) NULL DEFAULT NULL,
  `INC_VIC_GENERO` VARCHAR(1) NOT NULL,
  `INC_AGR_EDAD` VARCHAR(45) NULL DEFAULT NULL,
  `INC_AGR_GENERO` VARCHAR(1) NOT NULL,
  `INC_AGR_NOMBRE` VARCHAR(45) NULL DEFAULT NULL,
  `INC_AGR_TIPO` VARCHAR(45) NOT NULL,
  `INC_ACCION` VARCHAR(100) NOT NULL,
  `INC_TIEMPO` VARCHAR(45) NOT NULL,
  `INC_SERVICIO` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`ID_INCIDENCIA`),
  INDEX `fk_incidencias_violencias_idx` (`violencias_ID_VIOLENCIA` ASC) VISIBLE,
  CONSTRAINT `fk_incidencias_violencias`
    FOREIGN KEY (`violencias_ID_VIOLENCIA`)
    REFERENCES `registrosincidencias`.`violencias` (`ID_VIOLENCIA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `registrosincidencias`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `registrosincidencias`.`usuarios` (
  `ID_USUARIO` INT NOT NULL AUTO_INCREMENT,
  `USUARIO_NOMBRES` VARCHAR(50) NOT NULL,
  `USUARIO_APE_PATERNO` VARCHAR(45) NOT NULL,
  `USUARIO_APE_MAETRNO` VARCHAR(45) NOT NULL,
  `USUARIO_USERNAME` VARCHAR(45) NOT NULL,
  `USUARIO_PASSWORD` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`ID_USUARIO`),
  UNIQUE INDEX `USUARIO_USERNAME_UNIQUE` (`USUARIO_USERNAME` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `registrosincidencias`.`consultas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `registrosincidencias`.`consultas` (
  `ID_CONSULTA` INT NOT NULL AUTO_INCREMENT,
  `incidencias_ID_INCIDENCIA` INT NOT NULL,
  `usuarios_ID_USUARIO` INT NOT NULL,
  PRIMARY KEY (`ID_CONSULTA`),
  INDEX `fk_consultas_incidencias_idx` (`incidencias_ID_INCIDENCIA` ASC) VISIBLE,
  INDEX `fk_consultas_usuarios_idx` (`usuarios_ID_USUARIO` ASC) VISIBLE,
  CONSTRAINT `fk_consultas_incidencias`
    FOREIGN KEY (`incidencias_ID_INCIDENCIA`)
    REFERENCES `registrosincidencias`.`incidencias` (`ID_INCIDENCIA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_consultas_usuarios1`
    FOREIGN KEY (`usuarios_ID_USUARIO`)
    REFERENCES `registrosincidencias`.`usuarios` (`ID_USUARIO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `registrosincidencias`.`municipios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `registrosincidencias`.`municipios` (
  `ID_MUNICIPIO` INT NOT NULL AUTO_INCREMENT,
  `MUNICIPIO_NOMBRE` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`ID_MUNICIPIO`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `registrosincidencias`.`institucion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `registrosincidencias`.`institucion` (
  `ID_INST` INT NOT NULL AUTO_INCREMENT,
  `INST_NOMBRE` VARCHAR(100) NOT NULL,
  `INST_NIVEL` VARCHAR(50) NOT NULL,
  `municipios_ID_MUNICIPIO` INT NOT NULL,
  PRIMARY KEY (`ID_INST`),
  INDEX `fk_institucion_municipios1_idx` (`municipios_ID_MUNICIPIO` ASC) VISIBLE,
  CONSTRAINT `fk_institucion_municipios`
    FOREIGN KEY (`municipios_ID_MUNICIPIO`)
    REFERENCES `registrosincidencias`.`municipios` (`ID_MUNICIPIO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `registrosincidencias`.`espacios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `registrosincidencias`.`espacios` (
  `ID_ESPACIO` INT NOT NULL AUTO_INCREMENT,
  `ESPACIO_NOMBRE` VARCHAR(45) NOT NULL,
  `institucion_ID_INST` INT NOT NULL,
  PRIMARY KEY (`ID_ESPACIO`),
  INDEX `fk_espacios_institucion_idx` (`institucion_ID_INST` ASC) VISIBLE,
  CONSTRAINT `fk_espacios_institucion`
    FOREIGN KEY (`institucion_ID_INST`)
    REFERENCES `registrosincidencias`.`institucion` (`ID_INST`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
