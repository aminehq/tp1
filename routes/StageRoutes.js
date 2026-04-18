// Importation d'Express et création du routeur
const express = require("express");
const { getstage, getstagebyid, createstage, updatestage, deletestage, getartistBystage } = require("../controllers/stageController");

const router = express.Router();

// GET
// Route pour récupérer toutes les scènes (stages)
router.get("/", getstage);
// Route pour récupérer les artistes d'une scène spécifique par son ID
router.get("/:id/artists", getartistBystage);
// Route pour récupérer une seule scène par son ID
router.get("/:id", getstagebyid);

// POST
// Route pour créer une nouvelle scène
router.post("/", createstage);

// PUT
// Route pour mettre à jour une scène existante via son ID
router.put("/:id", updatestage);

// DELETE
// Route pour supprimer une scène spécifique par son ID
router.delete("/:id", deletestage);

// Exportation du routeur pour l'utiliser dans server.js
module.exports = router;