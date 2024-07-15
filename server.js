require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOption = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongooes = require('mongoose')
const PORT = process.env.PORT || 3500

connectDB()

app.use(logger)

app.use(cors(corsOption))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongooes.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongooes.connection.on('error', (error) => {
    console.log('Connection error to MongoDB')
    logEvents(`${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`, 'mongoErrLog.log')
})