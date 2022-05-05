// Imports
const express = require('express')
const app = express()
const port = 5000
const mysql = require('mysql')
require('dotenv').config()

app.use(express.json());

const {insertMunicipios,readMunicipios} = require("./operations");


// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))

// Set View's
app.set('views', './views');
app.set('view engine', 'ejs');

// Navigation
app.get('', (req, res) => {
    res.render('index', { text: 'Equipo 5' })
})

app.get('/users/:id',(req, res)=>{
    const {id} = req.params
    let sql ='select * from usuarios where id_equipo = ?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})


app.post('/insertuser',( req, res)=>{
    const{nombres, ap_pa,ap_ma,username,password} = req.body
     let sql = `insert into \`registrosincidencias\`.\`usuarios\`(
         \`USUARIO_NOMBRES\`,
         \`USUARIO_APE_PATERNO\`, 
         \`USUARIO_APE_MAETRNO\`,  
         \`USUARIO_USERNAME\`,
         \`USUARIO_PASSWORD\`) 
     values('${nombres}','${ap_pa}','${ap_ma}','${username}','${password}')`
    connection.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'usuario agregado'})
        }
    })
})


app.post('/insertMunicipios', (req, res) => {
    insertMunicipios(connection, 
        {municipio_nombre: 'San Blas'},
        result => {
        res.json(result);
    })
})
app.get('/readMunicipios', (req, res) => {
    readMunicipios(connection, 
        result => {
        res.json(result);
    })
})



app.get('/map', (req, res) => {
    res.render('map', {})
})

app.get('/form', (req, res) => {
    res.render('form', {})
})

// Conexion BD
const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user:process.env.DBUSER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
})

connection.connect((err)=>{
    if (err) throw err
    console.log("Connectado a la base de datos");
});


// Listen on Port 5000
app.listen(port, () => console.info(`App listening on port ${port}`))