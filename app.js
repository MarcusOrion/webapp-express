import express from 'express'
// Setup
const app = express()
const port = process.env.APP_PORT || 3000
// Middleware di setup


// Routes
app.get('/', (req, res) => {
    res.send('Blog homepage')
})

// Server start
app.listen (port, () => console.log('Server started at http://loclahost/' + port))