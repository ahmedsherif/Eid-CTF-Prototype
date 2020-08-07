const express = require('express') //to open HTTP server
const _ = require('lodash');
const app = express()
const path = require('path')

app.use(express.json())
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req,res){
  res.render('profile');
});


app.post('/pipeline', (req, res) => {
  let whatever = _.defaultsDeep({}, req.body)
  res.send(_.template('pipeline submitted!')())
})

app.get('/downloadFile/:file', (req, res) => {
  res.download('./'+req.params.file);
})

app.listen(3000)
