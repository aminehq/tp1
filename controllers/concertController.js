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

// Récupérer tous les concerts
exports.getconcert = (req, res) => {
    const data = readfile();
    const concert = data.concerts;
    res.status(200).json(concert);
};

// Récupérer un concert spécifique par son ID
exports.getconcertbyid = (req, res) => {
    const data = readfile();
    const id = parseInt(req.params.id);
    const concert = data.concerts.find(p => p.id === id);
    
    if (!concert) {
        return res.status(404).json({ message: "cette concert not found" });
    }
    
    res.status(200).json(concert);
};

// Ajouter un nouveau concert
exports.createconcert = (req, res) => {
    const data = readfile();
    const artistId = Number(req.body.artistId);
    
    // Vérification de l'existence de l'artiste assigné au concert
    const artist = data.artists.find(a => a.id === artistId);
    if (!artist) {
        return res.status(400).json({ message: "artistId does not exist" });
    }
    
    // Création de l'objet du concert
    const newconcert = {
        id: Date.now(),
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        duration: req.body.duration,
        artistId: artistId
    };
    
    data.concerts.push(newconcert);
    writeProducts(data);
    res.status(201).json(newconcert);
};

// Mettre à jour un concert existant
exports.updateconcert = (req, res) => {
    const data = readfile();
    const id = Number(req.params.id);
    const concert = data.concerts.find(c => c.id === id);
    
    if (!concert) {
        return res.status(404).json({ message: "concert not found" });
    }
    
    // Si on essaie de modifier l'artiste lié, vérifier s'il existe
    if (req.body.artistId) {
        const artist = data.artists.find(a => a.id === Number(req.body.artistId));
        if (!artist) {
            return res.status(400).json({ message: "artistId does not exist" });
        }
        concert.artistId = Number(req.body.artistId);
    }
    
    // Mise à jour des autres champs s'ils sont fournis (avec priorité aux nouvelles valeurs)
    concert.title = req.body.title ?? concert.title;
    concert.date = req.body.date ?? concert.date;
    concert.time = req.body.time ?? concert.time;
    concert.duration = req.body.duration ?? concert.duration;
    
    writeProducts(data);
    res.status(200).json(concert);
};

// Supprimer un concert spécifique par son ID
exports.deleteconcert = (req, res) => {
    const data = readfile();
    const id = parseInt(req.params.id);
    const index = data.concerts.findIndex(p => p.id === id);
    
    if (index === -1) {
        return res.status(404).json({ message: "concert not found" });
    }
    
    data.concerts.splice(index, 1);
    writeProducts(data);
    res.status(200).json({ message: "concert deleted" });
};