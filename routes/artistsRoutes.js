// Importation d'Express et création du routeur
const express = require("express");
const { getartist, getartistbyid, createartist, updateartist, deleteartist, searchartist, getConcertsByArtist } = require("../controllers/artistController");

const router = express.Router();

// GET
// Route pour récupérer tous les artistes (avec possibilité de filtrage par genre/stageId)
router.get("/", getartist);

// SEARCH
// Route pour rechercher un artiste par son nom (doit être définie avant /:id pour éviter les conflits)
router.get("/search", searchartist);

// Route pour récupérer les concerts d'un artiste spécifique
router.get("/:id/concerts", getConcertsByArtist);

// Route pour récupérer un seul artiste par son ID
router.get("/:id", getartistbyid);

// POST
// Route pour créer un nouvel artiste
router.post("/", createartist);

// PUT
// Route pour mettre à jour un artiste existant via son ID
router.put("/:id", updateartist);

// DELETE
// Route pour supprimer un artiste par son ID
router.delete("/:id", deleteartist);

// Exportation du routeur pour l'utiliser dans server.js
module.exports = router;