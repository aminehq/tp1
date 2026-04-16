const fs=require("fs")
function readfile() {
    const data=fs.readFileSync('./database.json',"utf-8")
    return JSON.parse(data)
}
function writeProducts(data) {
    fs.writeFileSync("./database.json", JSON.stringify(data, null, 2))
}
exports.getartist=(req,res)=>{
    
    const data=readfile()
    const genre=req.query.genre
    let artists=data.artists
    if(genre){
        artists=artists.filter(p=>p.genre===genre)
    }
    const stageId=req.query.stageId
    if(stageId){
        artists=artists.filter(p=>Number(p.stageId)===Number(stageId))
    }
    res.status(200).json(artists);
}
exports.getartistbyid=(req,res)=>{
    const data=readfile()
    const id=parseInt(req.params.id)
    const artist=data.artists.find(p=>p.id==id)
    if (!artist) {
        return res.status(404).json({message:"cette artist not found"})
    }
    res.status(200).json(artist)
}
exports.createartist = (req, res) => {
    const data = readfile()
    const stageId = Number(req.body.stageId)
    const stage = data.stages.find(s => s.id === stageId)
    if (!stage) {
        return res.status(400).json({message: "stageId does not exist"})
    }
    const newartist = {
        id: Date.now(),
        name: req.body.name,
        genre: req.body.genre,
        country: req.body.country,
        stageId: stageId
    }
    data.artists.push(newartist)
    writeProducts(data)
    res.status(201).json(newartist)
}
exports.updateartist = (req, res) => {
    const data = readfile()
    const id = Number(req.params.id)
    const artist = data.artists.find(a => a.id === id)
    if (!artist) {
        return res.status(404).json({ message: "artist not found" })
    }
    if (req.body.stageId) {
        const stage = data.stages.find(s => s.id === Number(req.body.stageId))
        if (!stage) {
            return res.status(400).json({message: "stageId does not exist"})
        }
        artist.stageId = Number(req.body.stageId)
    }
    artist.name = req.body.name ?? artist.name
    artist.genre = req.body.genre ?? artist.genre
    artist.country = req.body.country ?? artist.country
    writeProducts(data)
    res.status(200).json(artist)
}
exports.deleteartist=(req,res)=>{
    const data=readfile();
    const id=parseInt(req.params.id)
    const index=data.artists.findIndex(p=>p.id==id)
    if (index==-1) {
        return res.status(404).json({message:"artist not found"})
    }
    data.artists.splice(index,1)
    writeProducts(data)
    res.status(200).json({message:"artist deleted"})
}
exports.searchartist=(req,res)=>{
    const data=readfile();
    const name=req.query.name
    const artist=data.artists.filter(artist=>artist.name.toLowerCase().includes(name.toLowerCase()))
    if(artist.length === 0){
        return res.status(404).json({message:"artist not found"})
    }
    res.status(200).json(artist)
}
exports.getConcertsByArtist=(req,res)=>{
    const data=readfile();
    const id=parseInt(req.params.id)
    const concerts=data.concerts.filter(a => a.artistId === id)
    if(concerts.length === 0){
        return res.status(404).json({message:"concert not found"})
    }
    res.status(200).json(concerts)
}