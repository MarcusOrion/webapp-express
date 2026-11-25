import express from 'express';
import prisma from '../libs/prismaClient.js'
import { index, show, store, update } from '../controllers/videogamesController.js';

const router = express.Router()
// INDEX - Lista dei giochi (READ)
router.get("/", index)
// SHOW - Dettaglio di un videogioco specifico (READ)
router.get("/:id", show)
// STORE - Creazione di un nuovo elemento (CREATE) 
router.post("/", store)
// UPDATE - Modifica di un elemento già esistente (UPDATE)
router.patch("/:id", update)
// DESTROY - Eliminazione di un elemento specifico (DELETE)
router.delete("/:id", async (req,res) => {
    const id = Number(req.params.id)
    if (!Number.isInteger(id)) {
        return sendError(res, 400, 'Invalid videogame id')
    }
    const videogame = await prisma.videogame.findUnique({
        where: {
            id
        }
    })
    if (!videogame) {
        return sendError (res, 404, 'Videogame not found')
    }
    await prisma.videogame.delete({
        where: {
            id: id
        }
    })
    res.sendStatus(204)
})
export default router;
