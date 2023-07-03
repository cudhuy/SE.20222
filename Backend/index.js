const express = require('express')
const dotenv = require('dotenv')

const app = express();
dotenv.config();
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Backend API');

})

//app.use('/api/test', require('./api/testConnect'))
app.use('/api/user', require('./api/user'))

app.listen(process.env.PORT, () => {
    console.log(`Sever started running on ${process.env.PORT}`);
})

