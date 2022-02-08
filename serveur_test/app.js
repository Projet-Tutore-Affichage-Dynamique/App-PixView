const express = require('express')
const app = express()


app.set('view engine', 'jade')
app.use(express.json())

app.get('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json({verif: true})
})

app.get('/contenu', function(req, res) {
    res.render('README.md')
})

app.use(express.static('public'))

app.listen(3000, function () {
    console.log('Votre app est disponible sur localhost:3000 !')
})
