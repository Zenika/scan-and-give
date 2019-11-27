'use strict'

const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const cookieParser = require('cookie-parser')()
const cors = require('cors')({ origin: true })
const validateToken = require('./validateToken')

const app = express()

app.use(cors)
app.use(cookieParser)
app.use(validateToken(admin))
app.use(express.json())

require('./event')(app)
require('./charity')(app)
require('./donation')(app)

module.exports = functions.region('europe-west1').https.onRequest(app)
