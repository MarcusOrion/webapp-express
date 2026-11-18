import express from 'express'

const router = express.Router()

// INDEX - Lista dei giochi (READ)
router.get("/", (req,res) => {
    res.send('Lista dei videogiochi')
})
// SHOW - Dettaglio di un videogioco specifico (READ)
router.get("/:id", (req,res) => {
    const id = Number(req.params.id)
    res.send(`Dettaglio del videogioco con ID: ${id}`)
})

export default router;
