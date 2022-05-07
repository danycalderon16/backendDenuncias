// Imports
const express = require('express')
const app = express()
const port = 5000
const mysql = require('mysql')
const bcrypt = require('bcryptjs');
require('dotenv').config()

app.use(express.json());

const {insertMunicipios,readMunicipios,insertarUsuario,readUsers,readUser} = require("./operations");


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public'))
app.use('/resources', express.static(__dirname + '/public'));

// Set View's
app.set('views', './views');
app.set('view engine', 'ejs');

// Navigation
app.get('', (req, res) => {
    res.render('index', { text: 'Equipo 5' })
})

/* obetenmos todos los usuarios */
app.get('/users',(req, res)=>{
    readUsers(connection, 
        result => {
        res.json(result);
    })
})

/** Obtenemos un usuario por el user name */
app.get('/user/:id',(req, res)=>{
    const {id} = req.params
    readUser(connection, 
        {id},
        result => res.json(result))
})


/** Insertamos un usuario */
app.post('/insertuser', (req, res) => {
    const nombres = req.body.names;
	const apellido_paterno = req.body.ape_pat;
    const apellido_materno = req.body.ape_mat;
    const username = req.body.username;
	const pass = req.body.pass;
	//let passwordHash = await bcrypt.hash(pass, 8);
    console.log(nombres,apellido_paterno,apellido_materno,username,pass);
//    const {nombres,apellido_paterno,apellido_materno,username,password} = req.body
   /* insertarUsuario(connection, 
        {nombres,apellido_paterno,apellido_materno,username,password},
        result => {
            res.json(result);
    })*/
})

/** Inserta municipio */
app.post('/insertMunicipios', (req, res) => {
    const {municipio} = req.body
    insertMunicipios(connection, 
        {municipio_nombre: municipio},
        result => {
            res.json(result);
    })
})

/** Leer municipios */
app.get('/readMunicipios', (req, res) => {
    readMunicipios(connection, 
        result => {
        res.statusCode(200)
        res.json(result);
    })
})


app.get('/map', (req, res) => {
    res.render('map', {})
})

app.get('/login', (req, res) => {
    res.render('login', {})
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