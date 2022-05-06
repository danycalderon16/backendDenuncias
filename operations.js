const { query } = require('express');
const mysql = require ('mysql')


/** Usuarios */
function readUsers(connection, callback) {
    connection.query("SELECT * FROM usuarios", function (err, result) {
        if(err) throw err;
        callback(result);  
    });
}

function readUsers(connection, data ,callback) {
    let selectQuery = "SELECT * FROM usuarios where USUARIO_USERNAME = ?"
    let query = mysql.format(selectQuery, [data.id])
    connection.query(query, function (err, result) {
        if(err) throw err;
        callback(result);  
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
        connection.end()
    });
 
}
//-----------------------


/** Municipios */
function insertMunicipios(connection,data, callback) {
    let insertQuery = "INSERT INTO municipios(municipio_nombre) VALUES(?)"
    let query = mysql.format(insertQuery, [data.municipio_nombre])
    connection.query(query, function (err, result) {
        if(err) throw err;
        callback(result);  
        connection.end()
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
    readUsers
}