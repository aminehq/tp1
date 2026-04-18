// Importation d'Express et création du routeur
const express = require("express");
const { getconcert, getconcertbyid, createconcert, updateconcert, deleteconcert } = require("../controllers/concertController");

const router = express.Router();

// GET
// Route pour récupérer tous les concerts
router.get("/", getconcert);
// Route pour récupérer un seul concert par son ID
router.get("/:id", getconcertbyid);

// POST
// Route pour créer un nouveau concert
router.post("/", createconcert);

// PUT
// Route pour mettre à jour un concert existant via son ID
router.put("/:id", updateconcert);

// DELETE
// Route pour supprimer un concert par son ID
router.delete("/:id", deleteconcert);

// Exportation du routeur pour l'utiliser dans server.js
module.exports = router;