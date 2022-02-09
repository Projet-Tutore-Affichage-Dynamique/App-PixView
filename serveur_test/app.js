const express = require('express')
const app = express()
const fs = require('fs');


app.set('view engine', 'jade')
app.use(express.json())

app.get('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json({verif: true})
})

app.get('/contenu', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json({verif: true})
    /*fs.readFile('./exemple.md', 'utf8', (err, data) => {
        if(err){
            res.status(500).json({error: "fs ne marche pas sa mère"});
        } else {
            res.status(200).json({
                markdown: data,
            });
        }
    });*/
})

app.use(express.static('public'))

app.listen(3000, function () {
    console.log('Votre app est disponible sur localhost:3000 !')
})
