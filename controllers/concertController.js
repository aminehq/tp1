const fs=require("fs")
function readfile() {
    const data=fs.readFileSync('./database.json',"utf-8")
    return JSON.parse(data)
}
function writeProducts(data) {
    fs.writeFileSync("./database.json", JSON.stringify(data, null, 2))
}
exports.getconcert=(req,res)=>{
    const data=readfile()
    const concert=data.concerts
    res.status(200).json(concert);
}
exports.getconcertbyid=(req,res)=>{
    const data=readfile()
    const id=parseInt(req.params.id)
    const concert=data.concerts.find(p=>p.id==id)
    if (!concert) {
        return res.status(404).json({message:"cette concert not found"})
    }
    res.status(200).json(concert)
}
exports.createconcert = (req, res) => {
    const data = readfile()
    const artistId = Number(req.body.artistId)
    const artist = data.artists.find(a => a.id === artistId)
    if (!artist) {
        return res.status(400).json({message: "artistId does not exist"})
    }
    const newconcert = {
        id: Date.now(),
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        duration: req.body.duration,
        artistId: artistId
    }
    data.concerts.push(newconcert)
    writeProducts(data)
    res.status(201).json(newconcert)
}
exports.updateconcert = (req, res) => {
    const data = readfile()
    const id = Number(req.params.id)
    const concert = data.concerts.find(c => c.id === id)
    if (!concert) {
        return res.status(404).json({ message: "concert not found" })
    }
    if (req.body.artistId) {
        const artist = data.artists.find(a => a.id === Number(req.body.artistId))
        if (!artist) {
            return res.status(400).json({message: "artistId does not exist"})
        }
        concert.artistId = Number(req.body.artistId)
    }
    concert.title = req.body.title ?? concert.title
    concert.date = req.body.date ?? concert.date
    concert.time = req.body.time ?? concert.time
    concert.duration = req.body.duration ?? concert.duration
    writeProducts(data)
    res.status(200).json(concert)
}
exports.deleteconcert=(req,res)=>{
    const data=readfile();
    const id=parseInt(req.params.id)
    const index=data.concerts.findIndex(p=>p.id==id)
    if (index==-1) {
        return res.status(404).json({message:"concert not found"})
    }
    data.concerts.splice(index,1)
    writeProducts(data)
    res.status(200).json({message:"concert deleted"})
}