import express from 'express'

const router = express.Router()
// Utilities - Permette di centralizzare lo stato di res, status e messaggio di errore nelle CRUD
const sendError = (res, status , message) =>
    res.status(status).json({
        error: message
    })
// INDEX - Lista dei giochi (READ)
router.get("/", async (req,res) => {
    const videogames = await Prisma.videogame.findMany({
    select: {
        id: true,
        title: true,
        rating: true,
            }
    });
    res.json(videogames);
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
// DESTROY - Eliminazione di un elemento specifico (DELETE)
router.delete("/:id", (req,res) => {
    const id = Number(req.params.id)
    res.send(`Eliminazione della card videogioco con id: ${id}`)
})
export default router;
