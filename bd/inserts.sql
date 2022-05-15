INSERT INTO `registrosincidencias`.`violencias` (`VIOLENCIA_TIPO`) VALUES ('Psicológica');
INSERT INTO `registrosincidencias`.`violencias` (`VIOLENCIA_TIPO`) VALUES ('Patrimonial');
INSERT INTO `registrosincidencias`.`violencias` (`VIOLENCIA_TIPO`) VALUES ('Física');
INSERT INTO `registrosincidencias`.`violencias` (`VIOLENCIA_TIPO`) VALUES ('Sexual');


insert into `registrosincidencias`.`incidencias`(
            `INC_MUN`,
            `INC_INST`,
            `INC_ESP`,
            `INC_FECHA`,
            `INC_HORA`,
            `violencias_ID_VIOLENCIA`,
            `INC_VIO_DESCR`,
            `INC_VIC_EDAD`,
            `INC_VIC_GENERO`,
            `INC_AGR_EDAD`,
            `INC_AGR_GENERO`,
            `INC_AGR_NOMBRE`,
            `INC_AGR_TIPO`,
            `INC_ACCION`,
            `INC_TIEMPO`,
            `INC_SERVICIO`)        
            values(1,'1','1','1','2022-06-04','10:44',1,'22','1','23','1','Pepe','1','1','1','1')