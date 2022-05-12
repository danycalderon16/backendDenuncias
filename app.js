// Imports
const express = require('express')
const app = express()
const port = 5000
const mysql = require('mysql')
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser')
const {insertMunicipios,readMunicipios,insertarUsuario,readUsers,readUser,insertarIncidencias,readIncidencias} = require("./operations");
const swal = require ('sweetalert2');
require('dotenv').config()

app.use(express.json());

// create application/json parser
const jsonParser = bodyParser.json()

const urlencodedParser = bodyParser.urlencoded({ extended: false })

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

// autenticación
app.post('/auth', urlencodedParser,(req, res)=> {
	const user = req.body.user;
	const pass = req.body.pass;    
   /* connection.query(
        'SELECT * FROM usuarios WHERE USUARIO_USERNAME = ?',
         [user], (error, results, fields) => {
            (results) => {     
                if(pass == results[0].USUARIO_PASSWORD)       
                    res.send(results)               
                else
                    res.send("Contraseña incorrecta")
            }
         } )    */
            
	if (user && pass) {
		readUser(connection, 
            {id:user},
             (result) => {    
                if(!result[0]){
                    res.send("Usuario no encontrado")
                } else{
                    if(pass == result[0].USUARIO_PASSWORD)       
                       res.send(result)               
                    else
                        res.send("Contraseña incorrecta")
                }
             }
        )
	} else {
		res.send('Please enter user and Password!');
		res.end();
	}
});

/*
app.post('/auth', urlencodedParser, async (req, res)=> {
	const user = req.body.user;
	const pass = req.body.pass;    
    
    let passwordHash = await bcrypt.hash(pass, 8);
	if (user && pass) {
		readUser(connection, 
            {id:user},
            async (err,result) => {
                if(err){console.log(err);}               
                if( await bcrypt.compare(passwordHash, result[0].USUARIO_PASSWORD))  {    
                    res.render('login', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡LOGIN CORRECTO!",
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: ''
                    });       
                }
            }
        )
	} else {
		res.send('Please enter user and Password!');
		res.end();
	}
});
*/
/** Insertamos un usuario */
app.post('/insertuser',  urlencodedParser, (req, res) => {
    const nombres = req.body.names;
	const apellido_paterno = req.body.ape_pat;
    const apellido_materno = req.body.ape_mat;
    const username = req.body.username;
	const pass = req.body.pass;
    console.log(nombres,apellido_paterno,apellido_materno,username,pass);
   insertarUsuario(connection,  
        {nombres,apellido_paterno,apellido_materno,username,password :pass},
        result => {
            res.json(result);
    })
})
/*app.post('/insertuser',  urlencodedParser, async (req, res) => {
    const nombres = req.body.names;
	const apellido_paterno = req.body.ape_pat;
    const apellido_materno = req.body.ape_mat;
    const username = req.body.username;
	const pass = req.body.pass;
    //console.log(nombres,apellido_paterno,apellido_materno,username,pass);
     insertarUsuario(connection,  
        {nombres,apellido_paterno,apellido_materno,username,password : await bcrypt.hash(pass, 8)},
        async result => {
            res.json(result);
    })
})*/

/** Incidencias */

// insertar incidencia
app.post('/insertIncidencia',  urlencodedParser, (req, res) => {
    const id_municipio = req.body.id_municipio;
    const id_lugar = req.body.id_lugar;
    const incidencia_fecha = req.body.incidencia_fecha;
    const incidencia_hora = req.body.incidencia_hora;
    const id_violencia = req.body.id_violencia;
    const incidencia_edad_vic = req.body.incidencia_edad_vic;
    const incidencia_genero_vic = req.body.incidencia_genero_vic;
    const incidencia_edad_agr = req.body.incidencia_edad_agr;
    const incidencia_genero_agr = req.body.incidencia_genero_agr;
    const incidencia_nombre_agr = req.body.incidencia_nombre_agr;
    const incidencia_descripcion = req.body.incidencia_descripcion;

    //console.log(nombres,apellido_paterno,apellido_materno,username,pass);
    insertarIncidencias(connection,  
        {id_municipio,id_lugar,incidencia_fecha,incidencia_hora,id_violencia,
            incidencia_edad_vic,incidencia_genero_vic,incidencia_edad_agr,
            incidencia_genero_agr,incidencia_nombre_agr,incidencia_descripcion},
        result => {
            res.json(result);
    })
})
app.get('/readIncidencias', (req, res) => {
    readIncidencias(connection, 
        result => {
        res.json(result);
    })
})

/** Inserta municipio */
app.post('/insertMunicipios',urlencodedParser, (req, res) => {
    const municipio_nombre = req.body.municipio
    insertMunicipios(connection, 
        {municipio_nombre: municipio_nombre},
        result => {
            res.json(result);
    })
})

/** Leer municipios */
app.get('/readMunicipios', (req, res) => {
    readMunicipios(connection, 
        result => {
        res.json(result);
    })
})


app.get('/map', (req, res) => {
    res.render('map', {})
})

app.get('/register', (req, res) => {
    res.render('register', {})
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