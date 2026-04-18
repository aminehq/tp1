// Importation du framework Express
const express = require("express");

// Importation des fichiers de routes pour chaque entité
const stageroute = require("./routes/StageRoutes");
const artistsroute = require("./routes/artistsRoutes");
const concertroute = require("./routes/concertRoutes");

// Initialisation de l'application Express
const app = express();

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Définition des routes principales (Endpoints)
// Toutes les requêtes commençant par "/stage" seront gérées par stageroute
app.use("/stage", stageroute);
// Toutes les requêtes commençant par "/artists" seront gérées par artistsroute
app.use("/artists", artistsroute);
// Toutes les requêtes commençant par "/concert" seront gérées par concertroute
app.use("/concert", concertroute);

// Lancement du serveur sur le port 3000
app.listen(3000, () => {
    console.log("Serveur démarré avec succès sur le port 3000");
});