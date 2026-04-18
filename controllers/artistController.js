const fs = require("fs");

// Fonction utilitaire pour lire le fichier database.json
function readfile() {
    const data = fs.readFileSync('./database.json', "utf-8");
    return JSON.parse(data);
}

// Fonction utilitaire pour écrire et sauvegarder les données dans database.json
function writeProducts(data) {
    fs.writeFileSync("./database.json", JSON.stringify(data, null, 2));
}

// Récupérer tous les artistes (avec support des filtres)
exports.getartist = (req, res) => {
    const data = readfile();
    const genre = req.query.genre; // Filtre par genre optionnel dans l'URL (?genre=...)
    let artists = data.artists;
    
    // Appliquer le filtre par genre si fourni
    if (genre) {
        artists = artists.filter(p => p.genre === genre);
    }
    
    const stageId = req.query.stageId; // Filtre par stageId optionnel (?stageId=...)
    // Appliquer le filtre par scène si fourni
    if (stageId) {
        artists = artists.filter(p => Number(p.stageId) === Number(stageId));
    }
    
    res.status(200).json(artists);
};

// Récupérer un artiste spécifique par son ID
exports.getartistbyid = (req, res) => {
    const data = readfile();
    const id = parseInt(req.params.id);
    const artist = data.artists.find(p => p.id === id);
    
    if (!artist) {
        return res.status(404).json({ message: "cette artist not found" });
    }
    
    res.status(200).json(artist);
};

// Créer un nouvel artiste
exports.createartist = (req, res) => {
    const data = readfile();
    const stageId = Number(req.body.stageId);
    
    // Vérification de l'existence de la scène affectée
    const stage = data.stages.find(s => s.id === stageId);
    if (!stage) {
        return res.status(400).json({ message: "stageId does not exist" });
    }
    
    // Création de l'objet avec un ID unique
    const newartist = {
        id: Date.now(),
        name: req.body.name,
        genre: req.body.genre,
        country: req.body.country,
        stageId: stageId
    };
    
    data.artists.push(newartist);
    writeProducts(data); // Sauvegarde dans la DB
    
    res.status(201).json(newartist);
};

// Mettre à jour un artiste existant
exports.updateartist = (req, res) => {
    const data = readfile();
    const id = Number(req.params.id);
    const artist = data.artists.find(a => a.id === id);
    
    if (!artist) {
        return res.status(404).json({ message: "artist not found" });
    }
    
    // Si un stageId est fourni dans la requête, vérifier s'il existe avant de l'affecter
    if (req.body.stageId) {
        const stage = data.stages.find(s => s.id === Number(req.body.stageId));
        if (!stage) {
            return res.status(400).json({ message: "stageId does not exist" });
        }
        artist.stageId = Number(req.body.stageId);
    }
    
    // Mise à jour des autres champs s'ils sont fournis (utilisation de l'opérateur de coalescence nulle ??)
    artist.name = req.body.name ?? artist.name;
    artist.genre = req.body.genre ?? artist.genre;
    artist.country = req.body.country ?? artist.country;
    
    writeProducts(data);
    res.status(200).json(artist);
};

// Supprimer un artiste via son ID
exports.deleteartist = (req, res) => {
    const data = readfile();
    const id = parseInt(req.params.id);
    const index = data.artists.findIndex(p => p.id === id);
    
    if (index === -1) {
        return res.status(404).json({ message: "artist not found" });
    }
    
    data.artists.splice(index, 1);
    writeProducts(data);
    res.status(200).json({ message: "artist deleted" });
};

// Rechercher un artiste par son nom
exports.searchartist = (req, res) => {
    const data = readfile();
    const name = req.query.name;
    
    // Correction de bug: Vérifier d'abord si le nom est fourni
    if (!name) {
        return res.status(400).json({ message: "Please provide a name query parameter" });
    }
    
    // Recherche non sensible à la casse
    const artist = data.artists.filter(artist => artist.name.toLowerCase().includes(name.toLowerCase()));
    
    if (artist.length === 0) {
        return res.status(404).json({ message: "artist not found" });
    }
    
    res.status(200).json(artist);
};

// Récupérer tous les concerts pour un artiste spécifique
exports.getConcertsByArtist = (req, res) => {
    const data = readfile();
    const id = parseInt(req.params.id);
    
    // Filtrage des concerts liés à cet artiste
    const concerts = data.concerts.filter(a => a.artistId === id);
    
    if (concerts.length === 0) {
        return res.status(404).json({ message: "concert not found" });
    }
    
    res.status(200).json(concerts);
};