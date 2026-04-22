//create artist
const Artist = require('../models/Artist');
const Stage = require('../models/Stage');
exports.createartist = async (req, res) => {
    try{
       const stageID = req.body.stageID;
        if(stageID){
            const stage = await Stage.findById(stageID);
            if(!stage){
                return res.status(404).json({
                    success: false,
                    message: 'Stage not found'
                })
            }
            const artist = await Artist.create(req.body);
            res.status(201).json({
                success: true,
                artist
            })
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
//get all artists
exports.getartist = async (req, res) => {
    try{
        const artists = await Artist.find();
        res.status(200).json({
            success: true,
            artists
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
//get artist by id
exports.getartistbyid = async (req, res) => {
    try{
        const artist = await Artist.findById(req.params.id);
        if(!artist){
            return res.status(404).json({
                success: false,
                message: 'Artist not found'
            })
        }
        res.status(200).json({
            success: true,
            artist
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
//update artist
exports.updateartist = async (req, res) => {
    try{
        const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!artist){
            return res.status(404).json({
                success: false,
                message: 'Artist not found'
            })
        }
        res.status(200).json({
            success: true,
            artist
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
//delete artist
exports.deleteartist = async (req, res) => {
    try{
        const artist = await Artist.findByIdAndDelete(req.params.id);
        if(!artist){
            return res.status(404).json({
                success: false,
                message: 'Artist not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Artist deleted successfully'
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
