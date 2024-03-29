require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const homeRoutes = require('./routes/homeRoutes')
const timePunchRoutes = require('./routes/timePunchRoutes')
const path = require('path')


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected')
    })
  })
  .catch((error) => {
    console.log(error)
  })


const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  next()
})

// routes
app.use('/api/home', homeRoutes)
app.use('/api/user', userRoutes)
app.use('/api/punch', timePunchRoutes)

app.use(express.static(path.join(__dirname, '../frontendV2/dist')))
app.get("*", (req, res) =>
  res.sendFile(
    path.resolve(__dirname, "../", 'frontendV2', 'dist', 'index.html')
  )
)


