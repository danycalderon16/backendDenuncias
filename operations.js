const mysql = require ('mysql')

function insertMunicipios(pool,data, callback) {
    let insertQuery = "INSERT INTO municipios(municipio_nombre) VALUES(?)"
    let query = mysql.format(insertQuery, [data.municipio_nombre])
    pool.getConnection(function (err, connection) {        
        connection.query(query, function (err, result) {
            if(err) throw err;
            callback(result);  
            connection.release()
        });
    })
}

function readMunicipios(connection, callback) {
    connection.query("SELECT * FROM municipios", function (err, result) {
        if(err) throw err;
        callback(result);  
    });
}

function readMunicipios(connection,data, callback) {
    let query = "SELECT * FROM municipios where id"
    connection.query("SELECT * FROM municipios", function (err, result) {
        if(err) throw err;
        callback(result);  
    });
}


module.exports = {insertMunicipios,readMunicipios}