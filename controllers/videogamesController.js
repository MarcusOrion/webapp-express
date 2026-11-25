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
    
}
export async function store (req, res) {
    
}
export async function update (req, res) {
    
}
export async function destroy (req, res) {
    
}