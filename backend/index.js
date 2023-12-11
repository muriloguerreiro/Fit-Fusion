require('dotenv').config();

const express = require('express')
const app = express()

const exerciseRoutes = require('./src/routes/exerciseRoutes')
const workoutRoutes = require('./src/routes/workoutRoutes')
const loadRoutes = require('./src/routes/loadRoutes')

app.use(express.json())

app.use('/exercises', exerciseRoutes)
app.use('/workouts', workoutRoutes)
app.use('/loads', loadRoutes)

app.get('/', (req, res) => {
    res.send('Servidor está funcionando!')
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})