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
    const videogames = await Prisma.videogame.findMany({
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
}
export async function store (req, res) {
    
}
export async function update (req, res) {
    
}
export async function destroy (req, res) {
    
}