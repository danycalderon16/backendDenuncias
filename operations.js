const mysql = require ('mysql')

function insertMunicipios(connection,data, callback) {
    let insertQuery = "INSERT INTO municipios(municipio_nombre) VALUES(?)"
    let query = mysql.format(insertQuery, [data.municipio_nombre])
    connection.query(query, function (err, result) {
        if(err) throw err;
        callback(result);  
    });
}

function readMunicipios(connection, callback) {
    connection.query("SELECT * FROM municipios", function (err, result) {
        if(err) throw err;
        callback(result);  
    });
}


module.exports = {insertMunicipios,readMunicipios}