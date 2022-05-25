// Imports
const express = require('express')
const app = express()
const port = 5000
const mysql = require('mysql')
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser')
const {insertMunicipios,readMunicipios,insertarUsuario,
    readUsers,readUser,insertarIncidencias,readIncidencias,
    readviolencias,insertviolencias,
    readInstitucion,
    insertInstitucion
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
    const nombres = req.body.nombre;
	const apellido_paterno = req.body.ape_pat;
    const apellido_materno = req.body.ape_mat;
    const username = req.body.usuario;
	const pass = req.body.passwordEncryp;
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
    const inc_municipio = req.body.INC_MUN;
    const inc_inst = req.body.INC_INST;
    const inc_esp = req.body.INC_ESP;
    const inc_fecha = req.body.INC_FECHA;
    const inc_hora = req.body.INC_HORA;
    const id_violencia = parseInt(req.body.violencias_ID_VIOLENCIA);
    const inc_vio_descr = req.body.INC_VIO_DESCR;
    const inc_vic_edad = req.body.INC_VIC_EDAD;
    const inc_vic_genero = req.body.INC_VIC_GENERO;
    const inc_agr_edad = req.body.INC_AGR_EDAD;
    const inc_agr_genero = req.body.INC_AGR_GENERO;
    const inc_agr_nombre = req.body.INC_AGR_NOMBRE;
    const inc_agr_tipo = req.body.INC_AGR_TIPO;
    const inc_accion = req.body.INC_ACCION;
    const inc_tiempo = req.body.INC_TIEMPO;
    const inc_servicio = req.body.INC_SERVICIO;

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
    console.log("Hola");
    console.log(data);
    insertarIncidencias(connection,data,result => {
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

/** Inserta INSTITUCION */
app.post('/insertInstitucion',urlencodedParser, (req, res) => {
    const nombre = req.body.nombre
    const nivel = req.body.nivel
    const municipio = req.body.municipio
    insertInstitucion(connection, 
        {nombre, nivel,municipio},
        result => {
            res.json(result);
    })
})

/** Leer INSTITUCION */
app.get('/readInstitucion', (req, res) => {
    readInstitucion(connection, 
        result => {
        res.json(result);
    })
})
app.get('/readInstitucionBy/:nivel&:municipio', (req, res) => {
    const nivel = req.params.nivel;
    const municipio = req.params.municipio;
    console.log(nivel,municipio);
    connection.query('select * from INSTITUCION '+
    'where INST_NIVEL = \''+nivel+'\' and MUNICIPIOS_ID_MUNICIPIO = '+
	'(Select ID_MUNICIPIO from MUNICIPIOS where ID_MUNICIPIO = '+municipio+');',(error, result) =>{
                if(error){
                    throw error
                }else{
                    res.json(result);
                    //res.render('map', {result,result})
                }
            })
})
/** Inserta violencias */
app.post('/insertViolencias',urlencodedParser, (req, res) => {
    console.log("Hola"); 
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


app.get('/mapLugar', (req, res) => {
    connection.query('select INSTITUCION.INST_NOMBRE as nombre, INCIDENCIAS.INC_ESP as lugar, count(INCIDENCIAS.INC_ESP) as casos from INCIDENCIAS '+
	'inner JOIN INSTITUCION ON INCIDENCIAS.INC_INST = INSTITUCION.ID_INST '+
	'group by INCIDENCIAS.INC_ESP',(error, result) =>{
                if(error){
                    throw error
                }else{
                    res.json(result);
                    //res.render('map', {result,result})
                }
            })
})
app.get('/mapGenero', (req, res) =>{
    connection.query('select INSTITUCION.INST_NOMBRE as nombre, INCIDENCIAS.INC_VIC_GENERO as genero, count(INCIDENCIAS.INC_VIC_GENERO) as casos from INCIDENCIAS '+
	'inner JOIN INSTITUCION ON INCIDENCIAS.INC_INST = INSTITUCION.ID_INST '+
	'group by INSTITUCION.INST_NOMBRE',(error, result) =>{
                if(error){
                    throw error
                }else{
                    res.json(result);
                    //res.render('map', {result,result})
                }
            })
})
app.get('/mapMunicipios', (req, res) => {
    connection.query('select MUNICIPIOS.MUNICIPIO_NOMBRE as municipio, count(MUNICIPIOS.MUNICIPIO_NOMBRE) as casos from MUNICIPIOS '+
	'inner JOIN INCIDENCIAS ON MUNICIPIOS.ID_MUNICIPIO = INC_MUN '+
	'group by MUNICIPIOS.MUNICIPIO_NOMBRE',(error, result) =>{
                if(error){
                    throw error
                }else{
                    res.json(result);
                    //res.render('map', {result,result})
                }
            })
})
app.get('/mapInst', (req, res) => {
    connection.query('select INSTITUCION.INST_NOMBRE as nombre, count(INSTITUCION.INST_NOMBRE) as casos from INCIDENCIAS '+
	'inner JOIN INSTITUCION ON INCIDENCIAS.INC_INST = INSTITUCION.ID_INST '+
	'group by INSTITUCION.INST_NOMBRE',(error, result) =>{
                if(error){
                    throw error
                }else{
                    res.json(result);
                    //res.render('map', {result,result})
                }
            })
})
app.get('/mapNivel', (req, res) => {
    connection.query('select INSTITUCION.INST_NOMBRE as nombre, INSTITUCION.INST_NIVEL AS nivel, count(INSTITUCION.INST_NOMBRE) as casos from INCIDENCIAS '+
	'inner JOIN INSTITUCION ON INCIDENCIAS.INC_INST = INSTITUCION.ID_INST '+
	'group by INSTITUCION.INST_NOMBRE;',(error, result) =>{
                if(error){
                    throw error
                }else{
                    res.json(result);
                    //res.render('map', {result,result})
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

function handleDisconnect() {
    cn = mysql.createConnection({
        host: process.env.DBHOST,
        user:process.env.DBUSER,
        password:process.env.PASSWORD,
        database:process.env.DATABASE,
    }); // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    cn.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    cn.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  }
  
  handleDisconnect();


// Listen on Port 5000
app.listen(port, () => console.info(`App listening on port ${port}`))