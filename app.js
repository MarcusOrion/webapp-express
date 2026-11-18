import express from 'express'
import gamesRouter from './routes/gamesRouter.js'
// Setup
const app = express()
const port = process.env.APP_PORT || 3000
// Middleware di setup
app.use(express.json())
// Routes
app.get('/', (req, res) => {
    res.send('Blog homepage')
})
app.use('/videogames', gamesRouter)

// Server start
app.listen (port, () => console.log('Server started at http://loclahost/' + port))