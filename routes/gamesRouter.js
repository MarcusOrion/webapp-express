import express from 'express'

const router = express.Router()
// Utilities
// - Permette di centralizzare lo stato di res, status e messaggio di errore nelle CRUD
const sendError = (res, status , message) =>
    res.status(status).json({
        error: message
    })
// - Permette di impedire di inserire stringhe vuote nella ricerca del titolo
const isStringValid = (value) => typeof value === 'string' && value.trim() != '';
// INDEX - Lista dei giochi (READ)
router.get("/", async (req,res) => {
    const limit = req.query.limit
    const videogames = await Prisma.videogame.findMany({
    select: {
        id: true,
        title: true,
        rating: true,
            },
    take: limit ? Number(limit): undefined
    });
    res.json(videogames);
})
// SHOW - Dettaglio di un videogioco specifico (READ)
router.get("/:id", async (req,res) => {
    const id = Number(req.params.id)
    // Validazione formato numerico intero
    if (!Number.isInteger(id)) {
        return sendError(res, 400, 'Invalid id')
    }
    const videogame = await prisma.videogame.findUnique({
        where: {
            id: true,
        },
        category: {
            select: {
                id: true,
                name: true,
            }
        }
    })
    if(!videogame) {
        return sendError(res, 404, 'Videogame not found')
    }
    res.json(videogame)
})
// STORE - Creazione di un nuovo elemento (CREATE) 
router.post("/", async (req,res) => {
    const {title, description, rating, categoryId} = req.body;
    // Validazione dei campi obbligatori
    if (!isStringValid(title)) {
        return sendError (res, 400, 'Title is required')
    }
// Validazione id categoria
    const category = await prisma.category.findUnique({
        id: categoryId
    })
    if (!category) {
        return (res, 400, 'Category is not valid')
    }
    const newVideogame = await prisma.videogame.create({
        data: {
            title,
            description,
            rating,
            categoryId,
        },
        select: {
            id: true,
        }
    })
    res.status(201).json(newVideogame)
})
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
