// Imports
const express = require('express')
const app = express()
const port = 5000
const mysql = require('mysql')
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser')
const {insertMunicipios,readMunicipios,insertarUsuario,
    readUsers,readUser,insertarIncidencias,readIncidencias,
    readviolencias,insertviolencias
} = require("./operations");
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
    const inc_municipio = req.body.inc_municipio;
    const inc_inst = req.body.inc_inst;
    const inc_esp = req.body.inc_esp;
    const inc_fecha = req.body.inc_fecha;
    const inc_hora = req.body.inc_hora;
    const id_violencia = parseInt(req.body.id_violencia);
    const inc_vio_descr = req.body.inc_vio_descr;
    const inc_vic_edad = req.body.inc_vic_edad;
    const inc_vic_genero = req.body.inc_vic_genero;
    const inc_agr_edad = req.body.inc_agr_edad;
    const inc_agr_genero = req.body.inc_agr_genero;
    const inc_agr_nombre = req.body.inc_agr_nombre;
    const inc_agr_tipo = req.body.inc_agr_tipo;
    const inc_accion = req.body.inc_accion;
    const inc_tiempo = req.body.inc_tiempo;
    const inc_servicio = req.body.inc_servicio;

    const data = {
        inc_municipio,
        inc_inst,
        inc_esp,
        inc_fecha,
        inc_hora,
        id_violencia,
        inc_vio_descr,
        inc_vic_edad,
        inc_vic_genero,
        inc_agr_edad,
        inc_agr_genero,
        inc_agr_nombre,
        inc_agr_tipo,
        inc_accion,
        inc_tiempo,
        inc_servicio
    }

    console.log(data);
   // insertarIncidencias(connection,data,result => {
     //       res.json(result);
    //})
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
/** Inserta violencias */
app.post('/insertViolencias',urlencodedParser, (req, res) => {
    const tipo = req.body.tipo
    insertviolencias(connection, 
        {tipo},
        result => {
            res.json(result);
    })
})

/** Leer violencias */
app.get('/readViolencias', (req, res) => {
    readviolencias(connection, 
        result => {
        res.json(result);
        //res.render('map', {result:result})
    })
})


app.get('/map', (req, res) => {
    connection.query('SELECT institucion.inst_nombre , COUNT(incidencias.INC_INST) AS Casos FROM  institucion ' +
            'LEFT JOIN incidencias ON incidencias.INC_INST = institucion.ID_INST;',(error, result) =>{
                if(error){
                    throw error
                }else{
                    res.render('map', {result,result})
                }
            })
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