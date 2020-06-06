const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
 
const store = require('./store')

const app = express()
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// *********************
app.use(express.static(path.join(__dirname)))
//eller
app.get('/', function (req, res) {
    // console.log(__dirname)
    res.sendFile(path.join(__dirname, 'index.html'));
  });
//******************************* */

app.post('/createUser', (req, res) => {
  store.createUser({
    username: req.body.username,
    password: req.body.password
  })
    .then((x) => {
      console.log(x)
      res.sendStatus(200)
    })
})

app.get('/convertAllPassToHash', (req, res) => {
  store.convertAllPassToHash()
    .then((x) => {
      console.log(x)
      res.sendStatus(200)
    })
})

app.get('/select', (req, res) => {

  response = {}
  store.select({ id: "14" }).then(x => {
    response = x[0]
    res.end(JSON.stringify(response, null, "\t"))
    res.sendStatus(200)
  })
  // res.cookie('info', first_name + ' ' + last_name)

  // console.log(response);
  // res.end(JSON.stringify(response, null, "\t") );

})

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000')
})