const { query } = require('express');
const mysql = require ('mysql')


/** Usuarios */
function readUsers(connection, callback) {
    connection.query("SELECT * FROM usuarios", function (err, result) {
        if(err) throw err;
        callback(result);  
    });
}
/*
function readUser(connection, data ,callback) {
    let selectQuery = "SELECT * FROM usuarios where USUARIO_USERNAME = ? and USUARIO_PASSWORD = ?"
    let query = mysql.format(selectQuery, [data.id,data.pass])
    connection.query(query, function (err, result) {
        if(err) throw err;
        callback(err,result);  
    });
}*/
function readUser(connection, data ,callback) {
    let selectQuery = "SELECT * FROM usuarios where USUARIO_USERNAME = ? "
    let query = mysql.format(selectQuery, [data.id])
    connection.query(query, function (err, result) {
        if(err) throw err;
        callback(result); 
        //connection.end() 
    });
}


function insertarUsuario(connection, data, callback) {
    let insertQuery = `insert into \`registrosincidencias\`.\`usuarios\`(
        \`USUARIO_NOMBRES\`,
        \`USUARIO_APE_PATERNO\`, 
        \`USUARIO_APE_MAETRNO\`,  
        \`USUARIO_USERNAME\`,
        \`USUARIO_PASSWORD\`) 
    values(?,?,?,?,?)`
    let query = mysql.format(insertQuery, [
        data.nombres,
        data.apellido_paterno,
        data.apellido_materno,
        data.username,
        data.password,
    ])
    connection.query(query, function (err, result) {
        if(err) throw err;
        callback(result);  
        //connection.end()
    });
}
//-----------------------

/*** INCIDENCIAS */
function insertarIncidencias(connection, data, callback) {
    let insertQuery = `insert into \`registrosincidencias\`.\`incidencias\`(
        \`INC_MUN\`,
        \`INC_INST\`,
        \`INC_ESP\`,
        \`INC_FECHA\`,
        \`INC_HORA\`,
        \`violencias_ID_VIOLENCIA\`,
        \`INC_VIO_DESCR\`,
        \`INC_VIC_EDAD\`,
        \`INC_VIC_GENERO\`,
        \`INC_AGR_EDAD\`,
        \`INC_AGR_GENERO\`,
        \`INC_AGR_NOMBRE\`,
        \`INC_AGR_TIPO\`,
        \`INC_ACCION\`,
        \`INC_TIEMPO\`,
        \`INC_SERVICIO\`)        
          values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
          console.log(data);
    let query = mysql.format(insertQuery, [
        data.inc_municipio,
        data.inc_inst,
        data.inc_esp,
        data.inc_fecha,
        data.inc_hora,
        data.id_violencia,
        data.inc_vio_descr,
        data.inc_vic_edad,
        data.inc_vic_genero,
        data.inc_agr_edad,
        data.inc_agr_genero,
        data.inc_agr_nombre,
        data.inc_agr_tipo,
        data.inc_accion,
        data.inc_tiempo,
        data.inc_servicio,
    ])
    connection.query(query, function (err, result) {
        if(err) throw err;
        callback(result);  
        //connection.end()
    });
}

function readIncidencias(connection, callback) {
    connection.query("SELECT * FROM incidencias", function (err, result) {
        if(err) throw err;
        callback(result);  
    });
}

//-----------------------------------------
/** Municipios */
function insertMunicipios(connection,data, callback) {
    let insertQuery = "INSERT INTO municipios(municipio_nombre) VALUES(?)"
    let query = mysql.format(insertQuery, [data.municipio_nombre])
    connection.query(query, function (err, result) {
        if(err) throw err;
        callback(result);  
       // connection.end()
    });

}

function readMunicipios(connection, callback) {
    connection.query("SELECT * FROM municipios", function (err, result) {
        if(err) throw err;
        callback(result);  
    });
}

//-------------------------------------------------

//-----------------------------------------
/** violencias */
function insertviolencias(connection,data, callback) {
    let insertQuery = "INSERT INTO violencias(tipo) VALUES(?)"
    let query = mysql.format(insertQuery, [data.tipo])
    connection.query(query, function (err, result) {
        if(err) throw err;
        callback(result);  
       // connection.end()
    });

}

function readviolencias(connection, callback) {
    connection.query("SELECT * FROM violencias", function (err, result) {
        if(err) throw err;
        callback(result);  
    });
}

//-------------------------------------------------


module.exports = {
    insertMunicipios,
    readMunicipios,
    insertarUsuario,
    readUsers,
    readUser,
    insertarIncidencias,
    readIncidencias,
    insertviolencias,
    readviolencias
}