const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use('/api/', require('./routes'))

app.listen(8080, () => {
    console.log(`Server started at 8080`)
})
