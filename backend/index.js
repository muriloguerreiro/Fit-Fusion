require('dotenv').config();

const express = require('express')
const app = express()
const authenticateToken = require('./src/middleware/authenticateToken');
const cors = require('cors');

const exerciseRoutes = require('./src/routes/exerciseRoutes')
const workoutRoutes = require('./src/routes/workoutRoutes')
const loadRoutes = require('./src/routes/loadRoutes')
const registerRoutes = require('./src/routes/registerRoutes')
const loginRoutes = require('./src/routes/loginRoutes')

app.use(express.json())
app.use(cors())

app.use('/exercises', authenticateToken, exerciseRoutes)
app.use('/workouts', authenticateToken, workoutRoutes)
app.use('/loads', authenticateToken, loadRoutes)
app.use('/register', registerRoutes)
app.use('/login', loginRoutes)

app.get('/', (req, res) => {
    res.send('Servidor está funcionando!')
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})