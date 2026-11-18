import express from 'express'

const router = express.Router()

// INDEX - Lista dei giochi (READ)
router.get("/", (req,res) => {
    res.send('Lista dei videogiochi')
})


export default router;
