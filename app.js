const express = require('express')
const app = express()
const port = 3008
const router = require('./routers')
const session = require('express-session')

app.set('view engine', "ejs")
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use(session({
    secret: 'medical hide',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        sameSite: true
    }
}))
app.use(router)

app.listen(port, () => {
    console.log(`Listening on port`, port);
})