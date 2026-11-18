import express from 'express'

const router = express.Router()

// INDEX - Lista dei giochi (READ)
router.get("/", (req,res) => {
    res.send('Lista dei videogiochi')
})
// SHOW - Dettaglio di un videogioco specifico (READ)
router.get("/:id", (req,res) => {
    const id = Number(req.params.id)
    res.send(`Dettaglio della card videogioco con ID: ${id}`)
})
// STORE - Creazione di un nuovo elemento (CREATE) 
router.post("/", (req,res) => {
    const body = req.body
    console.log(body)
    res.send('Creazione di un nuovo elemento videogioco')
})
// UPDATE - Modifica di un elemento già esistente (UPDATE)
router.patch("/:id", (req,res) => {
    const id = Number(req.params.id)
    res.send(`Aggiornamento della card videogioco con ID: ${id}`)
})
export default router;
