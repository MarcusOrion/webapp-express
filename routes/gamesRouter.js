import express from 'express';
import { destroy, index, show, store, update } from '../controllers/videogamesController.js';

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
router.delete("/:id", destroy)
export default router;
