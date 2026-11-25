import express from 'express';
import prisma from '../libs/prismaClient.js'
import { index, show } from '../controllers/videogamesController.js';

const router = express.Router()
// INDEX - Lista dei giochi (READ)
router.get("/", async (req,res) => {
})
// SHOW - Dettaglio di un videogioco specifico (READ)
router.get("/:id", index)
// STORE - Creazione di un nuovo elemento (CREATE) 
router.post("/", show)
// UPDATE - Modifica di un elemento già esistente (UPDATE)
router.patch("/:id", async (req,res) => {
    const id = Number(req.params.id)
    // Validazione dei campi obbligatori
    if (!Number.isInteger(id)) {
        return sendError(res, 400, 'Invalid videogame id')
    }
    // Validazione di categoryId
    if (categoryId !== undefined) {
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId
            }
        })
        if (!category) {
            return sendError(res, 400, 'Invalid category id')
        }
    }
    const {title, description, rating, categoryId} = req.body;
    const updateVideogame = await prisma.videogame.update({
        where: {
            id: id,
        },
        data: {
            title,
            description,
            rating,
            categoryId
        }
    })
    res.sendStatus(204).json(updateVideogame)
})
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
