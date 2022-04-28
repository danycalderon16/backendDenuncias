// Imports
const express = require('express')
const app = express()
const port = 5000

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

app.get('/map', (req, res) => {
    res.render('map', {})
})

app.get('/form', (req, res) => {
    res.render('form', {})
})


// Listen on Port 5000
app.listen(port, () => console.info(`App listening on port ${port}`))
