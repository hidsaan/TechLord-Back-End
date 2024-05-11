const express = require ("express")
const {registerController , loginController, logoutController, deleteUserController, forgotPasswordController, updatePasswordController, changePasswordController} =  require("./controllers/userController.js")
const {addProductController, getAllProducts, getProduct}= require ("./controllers/adminProductsController.js")
const {sellProductController, resellProducts, resellProduct}= require ("./controllers/sellProductsController.js")
const authHandler = require("./middleware/auth.js")
const multerMid= require("./middleware/multer.js")
const mongoose = require ("mongoose")
const env = require("dotenv");
const bodyparser = require ("body-parser")
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

env.config();
app.use(bodyparser.json())
app.use(cors())
app.use(cookieParser()) 

const Port = 4000
const url = "mongodb://localhost:27017/TechLord"

//connecting mongodb:
if(mongoose.connect(url))

{
    console.log(`Database Connected on ${url}`)
}
else {
    console.log("Database Error ")
}


// route middle ware:
app.get('/' , (req , res )=>{ res.send("this is home page")})

app.post('/user/register', multerMid, registerController )
app.post('/user/login' , loginController )
app.post('/user/forgotpassword' , forgotPasswordController )
app.post('/user/sellProduct',  multerMid, sellProductController)
app.get('/user/getAllProducts', getAllProducts)

app.get('/user/getProduct', authHandler, getProduct)
app.get('/user/soldProducts', authHandler, resellProducts)
app.get('/user/soldProduct', authHandler, resellProduct)

app.post('/admin/addProduct', multerMid, addProductController)

//Authenticated Routes:
app.post('/user/logout' , authHandler, logoutController )
app.post('/user/deleteuser' , authHandler, deleteUserController )
app.post('/user/updatePassword' , authHandler, updatePasswordController )
app.post('/user/changePassword' , authHandler, changePasswordController )


// server start: 
app.listen(Port, ()=>{ console.log(`server started on port ${Port}`)})