const fs=require("fs")
function readfile() {
    const data=fs.readFileSync('./database.json',"utf-8")
    return JSON.parse(data)
}
function writeStages(data) {
    fs.writeFileSync("./database.json", JSON.stringify(data, null, 2))
}
exports.getstage=(req,res)=>{
    const data=readfile()
    const stages=data.stages
    res.status(200).json(stages);
}
exports.getstagebyid=(req,res)=>{
    const data=readfile()
    const id=parseInt(req.params.id)
    const stage=data.stages.find(p=>p.id==id)
    if (!stage) {
        return res.status(404).json({message:"cette stage not found"})
    }
    res.status(200).json(stage)
}
exports.createstage=(req,res)=>{
    const data=readfile()
    const newstage={
        id:Date.now(),
        name:req.body.name,
        city:req.body.city,
        capacity:req.body.capacity
    }
    data.stages.push(newstage)
    writeStages(data)
    res.status(201).json(newstage)
}
exports.updatestage=(req,res)=>{
    const data=readfile();
    const id=parseInt(req.params.id)
    const stage=data.stages.find(p=>p.id==id)
    if (!stage) {
        return res.status(404).json({message:"stage not found"})
    }
    stage.name=req.body.name||stage.name
    stage.city=req.body.city||stage.city
    stage.capacity=req.body.capacity||stage.capacity
    writeStages(data)
    res.status(200).json(stage)
}
exports.deletestage=(req,res)=>{
    const data=readfile();
    const id=parseInt(req.params.id)
    const index=data.stages.findIndex(p=>p.id==id)
    if (index==-1) {
        return res.status(404).json({message:"stage not found"})
    }
    data.stages.splice(index,1)
    writeStages(data)
    res.status(200).json({message:"stage deleted"})
}
exports.getartistBystage=(req,res)=>{
    const data=readfile();
    const id=parseInt(req.params.id)
    const artists=data.artists.filter(a => a.stageId === id)
    if(artists.length === 0){
        return res.status(404).json({message:"artist not found"})
    }
    res.status(200).json(artists)
}