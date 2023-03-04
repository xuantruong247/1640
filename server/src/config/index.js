const dotEnv = require("dotenv")

dotEnv.config()

module.exports = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT
}