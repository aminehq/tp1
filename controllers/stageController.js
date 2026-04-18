const fs = require("fs");

// Fonction utilitaire pour lire le fichier database.json
function readfile() {
    const data = fs.readFileSync('./database.json', "utf-8");
    return JSON.parse(data);
}

// Fonction utilitaire pour écrire et sauvegarder les données dans database.json
function writeStages(data) {
    fs.writeFileSync("./database.json", JSON.stringify(data, null, 2));
}

// Récupérer toutes les scènes
exports.getstage = (req, res) => {
    const data = readfile();
    const stages = data.stages;
    res.status(200).json(stages);
};

// Récupérer une scène spécifique par son ID
exports.getstagebyid = (req, res) => {
    const data = readfile();
    const id = parseInt(req.params.id);
    const stage = data.stages.find(p => p.id === id); // Recherche par ID
    
    if (!stage) {
        return res.status(404).json({ message: "cette stage not found" });
    }
    
    res.status(200).json(stage);
};

// Ajouter une nouvelle scène
exports.createstage = (req, res) => {
    const data = readfile();
    
    // Création de l'objet de la nouvelle scène
    const newstage = {
        id: Date.now(), // Génération d'un ID unique basé sur le timestamp
        name: req.body.name,
        city: req.body.city,
        capacity: req.body.capacity
    };
    
    // Ajout à la liste et sauvegarde
    data.stages.push(newstage);
    writeStages(data);
    
    res.status(201).json(newstage); // Code 201: Created
};

// Mettre à jour une scène existante
exports.updatestage = (req, res) => {
    const data = readfile();
    const id = parseInt(req.params.id);
    const stage = data.stages.find(p => p.id === id);
    
    if (!stage) {
        return res.status(404).json({ message: "stage not found" });
    }
    
    // Mise à jour des valeurs (utilise ?? au lieu de || pour permettre les valeurs falsy comme 0)
    stage.name = req.body.name ?? stage.name;
    stage.city = req.body.city ?? stage.city;
    stage.capacity = req.body.capacity ?? stage.capacity;
    
    writeStages(data);
    res.status(200).json(stage);
};

// Supprimer une scène spécifique
exports.deletestage = (req, res) => {
    const data = readfile();
    const id = parseInt(req.params.id);
    const index = data.stages.findIndex(p => p.id === id);
    
    if (index === -1) {
        return res.status(404).json({ message: "stage not found" });
    }
    
    // Suppression de l'élément du tableau
    data.stages.splice(index, 1);
    writeStages(data);
    
    res.status(200).json({ message: "stage deleted" });
};

// Récupérer tous les artistes se produisant sur une scène spécifique
exports.getartistBystage = (req, res) => {
    const data = readfile();
    const id = parseInt(req.params.id);
    // Filtrer les artistes qui possèdent le stageId correspondant
    const artists = data.artists.filter(a => a.stageId === id);
    
    if (artists.length === 0) {
        return res.status(404).json({ message: "artist not found" });
    }
    
    res.status(200).json(artists);
};