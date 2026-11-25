import prisma from '../libs/prismaClient.js'

// Utilities
// - Permette di centralizzare lo stato di res, status e messaggio di errore nelle CRUD
const sendError = (res, status , message) =>
    res.status(status).json({
        error: message
    })
// - Permette di impedire di inserire stringhe vuote nella ricerca del titolo
const isStringValid = (value) => typeof value === 'string' && value.trim() != '';

export async function index (req, res) {
        const limit = req.query.limit
    const videogames = await prisma.videogame.findMany({
    select: {
        id: true,
        title: true,
        rating: true,
            },
    take: limit ? Number(limit): undefined
    });
    res.json(videogames);
}
export async function show (req, res) {
     const id = Number(req.params.id)
    // Validazione formato numerico intero
    if (!Number.isInteger(id)) {
        return sendError(res, 400, 'Invalid id')
    }
    const videogame = await prisma.videogame.findUnique({
        where: {
            id,
        },
        include:{
            category: true,
            categorY: {
                select: {
                    id: true,
                    name: true,
                }
            }
        }
    })
    if(!videogame) {
        return sendError(res, 404, 'Videogame not found')
    }
    res.json(videogame)   
}
export async function store (req, res) {
   const { title, description, rating, categoryId} = req.body;
   // Validazione campi obbligatori
   if (!isStringValid(title)) {
    return sendError(res, 400, 'Title data is required')
   }
   // Controllo che CategoryId sia intero
   if (Number.isInteger(categoryId)) {
    return sendError (res, 400, 'Category id not valid')
   }
   // Validazione id categoria
   const category = await prisma.category.findUnique({
    where: { 
        id: categoryId
    }
    })
    if (!category) {
        return sendError(res, 400, 'Category id not valid')
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
}
export async function update (req, res) {
      const id = Number(req.params.id)
      const {title, description, rating, categoryId} = req.body;
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
    const updateVideogame = await prisma.videogame.update({
        where: {
            id,
        },
        data: {
            title,
            description,
            rating,
            categoryId
        }
    })
    res.json(updateVideogame)  
}
export async function destroy (req, res) {
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
}