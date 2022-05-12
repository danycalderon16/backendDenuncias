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
        \`ID_MUNICIPIO\`,
        \`ID_LUGAR\`, 
        \`INCIDENCIA_FECHA\`,
        \`INCIDENCIA_HORA\`,
        \`ID_VIOLENCIA\`,
        \`INCIDENCIA_EDAD_VICTIMA\`,
        \`INCIDENCIA_GENERO_VICTIMA\`,
        \`INCIDENCIA_EDAD_AGRESOR\`,
        \`INCIDENCIA_GENERO_AGRESOR\`,
        \`INCIDENCIA_NOMBRE_AGRESOR\`,
        \`INCIDENCIA_DESCRIP\`)        
          values(?,?,?,?,?,?,?,?,?,?,?)`
    let query = mysql.format(insertQuery, [
        data.id_municipio,
        data.id_lugar,
        data.incidencia_fecha,
        data.incidencia_hora,
        data.id_violencia,
        data.incidencia_edad_vic,
        data.incidencia_genero_vic,
        data.incidencia_edad_agr,
        data.incidencia_genero_agr,
        data.incidencia_nombre_agr,
        data.incidencia_descripcion,
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

module.exports = {
    insertMunicipios,
    readMunicipios,
    insertarUsuario,
    readUsers,
    readUser,
    insertarIncidencias,
    readIncidencias
}