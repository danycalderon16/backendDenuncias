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

    {
     "inc_municipio":"",
    "inc_inst":"",
    "inc_esp":"",
    "inc_fecha":"",
    "inc_hora":"",
    "id_violencia":"",
    "inc_vio_descr":"",
    "inc_vic_edad":"",
    "inc_vic_genero":"",
    "inc_agr_edad":"",
    "inc_agr_genero":"",
    "inc_agr_nombre":"",
    "inc_agr_tipo":"",
    "inc_accion":"",
    "inc_tiempo":"",
    "inc_servicio":"",
    }