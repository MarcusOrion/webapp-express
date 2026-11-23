import express from 'express'
import gamesRouter from './routes/gamesRouter.js'
import errorHandler from './middlewares/errorHandler.js'
import notFound from './middlewares/notFound.js'
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
// Middleware 500
app.use(errorHandler)
// Middleware 404
app.use(notFound)
// Server start
app.listen (port, () => console.log('Server started at http://loclahost/' + port))