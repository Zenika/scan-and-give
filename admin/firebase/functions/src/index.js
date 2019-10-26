const admin = require('firebase-admin')

admin.initializeApp()

exports.admin = require('./admin')
exports.live = require('./live')
exports.register = require('./register')
