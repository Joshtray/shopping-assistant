require("dotenv").config()

const express = require('express')
const mongoose = require("mongoose")

const app = express()
const UserModel = require("./models/User")
const auth = require("./middleware/auth")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const port = process.env.port || 8080

app.use(express.json())
app.use(auth)

// let gfs, gridfsBucket;

mongoose.connect('mongodb+srv://joshtray:fx345cb8p@shopping-assistant.fp8ivwu.mongodb.net/shopping-assistant?retryWrites=true&w=majority', {
  useNewUrlParser : true
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'content-type') 
    next();
  });

app.post("/login", async (req, res) => {
  try{
      console.log("Logging in...")
      const args = req.body
      const users = await UserModel.find()
      const user = await UserModel.findOne({ email: args.email })
      if (!user) {
          throw new Error("User not found in the database.")
      }
      const auth = await bcrypt.compare(args.password, user.password)
      if (!auth) {
          throw new Error("Incorrect password!")
      }
      const webToken = await jwt.sign(
          { userId: user.id, email: user.email },
          "l0GnQyxUGQ0sA9jQ",
          {
              expiresIn: '1h'
          }
      )
      res.json({ userId: user.id, token: webToken, tokenExpiration: 1 })
  } catch(error){
      console.log(error)
      res.json({error: error.message})
      console.log("Could not log in")
  }
})

const userData = async (userId) => {
  try {
      const user = await UserModel.findById(userId)
      return {
          ...user._doc,
          id: user.id,
          password: null
      }
  }
  catch (err) {
      throw err
  }
}

app.post("/register", async (req, res) => {
  try{
    console.log("Registering...")

    const args = req.body
    
    const existingEmail = await UserModel.findOne({ email: args.email })
    if (existingEmail) {
        throw new Error("Email is already in use.")
    }
    const existingUser = await UserModel.findOne({username: args.username})
    if (existingUser) {
        throw new Error("Username is taken")
    }

    const hashedPassword = await bcrypt.hash(args.password, 12)
    const user = new UserModel({
        username: args.username,
        email: args.email,
        password: hashedPassword  
    })
    const result = await user.save()
    console.log(result)
    res.json(userData(result.id))

  } catch(error){
      console.log(error)
      res.json({error: error.message})
      console.log("Could not register")
  }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}...`)
})