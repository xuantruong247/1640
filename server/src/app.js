const express = require('express')
const mongoose = require('mongoose')
const {DATABASE_URL, PORT} = require('./config');
const { connectDatabase } = require('./database');
const ErrorHandler = require('./middlewares/error-handler')

//Admin 
const adminUserRouter = require('./routes/admin/router.admin.user')
const adminRoleRouter = require('./routes/admin/router.admin.role')

const START_APP = async () => {
    const app = express();

    await connectDatabase()
    
    app.use(express.json())
    
    
    app.use('/admin/user', adminUserRouter)
    app.use('/admin/role', adminRoleRouter)

    app.use(ErrorHandler)
    
    app.listen(PORT, () => {
        console.log(`Server run in port: ${PORT}`)
    })
}

START_APP()