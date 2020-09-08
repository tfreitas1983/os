const dbConfig = require ('../config/db.config')
const mongoose = require ('mongoose')
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.chamados = require('./chamados.model')(mongoose)
db.files = require('./files.model')(mongoose)
db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db

