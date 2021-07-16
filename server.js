if (process.env.NODE_DEV !== 'production') {
    require('dotenv').parse()
}

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')

const app = express();

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('connected to mongoose'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)