var express = require('express')

var app = express()
var port = 3000

// var path = require('path')
app.set('view engine', 'ejs')

app.get('/',function (req, res){
  res.render('index', {title: 'Welcome to the Magic Oracle'})
})

app.use(express.static(__dirname + '/public'));




app.listen(port)
console.log('Server running at http://localhost:' + port + '/')
