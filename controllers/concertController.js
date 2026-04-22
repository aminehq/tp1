//create concert
const Concert = require('../models/Concert');
const Artist = require('../models/Artist');
exports.createconcert = async (req, res) => {
    try{
        const artistID = req.body.artistId;
        if(artistID){
            const artist = await Artist.findById(artistID);
            if(!artist){
                return res.status(404).json({
                    success: false,
                    message: 'Artist not found'
                })
            }
            const concert = await Concert.create(req.body);
            res.status(201).json({
                success: true,
                concert
            })
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
//get all concerts
exports.getconcert = async (req, res) => {
    try{
        const concerts = await Concert.find();
        res.status(200).json({
            success: true,
            concerts
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
//get concert by id
exports.getconcertbyid = async (req, res) => {
    try{
        const concert = await Concert.findById(req.params.id);
        if(!concert){
            return res.status(404).json({
                success: false,
                message: 'Concert not found'
            })
        }
        res.status(200).json({
            success: true,
            concert
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
//update concert
exports.updateconcert = async (req, res) => {
    try{
        const concert = await Concert.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!concert){
            return res.status(404).json({
                success: false,
                message: 'Concert not found'
            })
        }
        res.status(200).json({
            success: true,
            concert
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
//delete concert
exports.deleteconcert = async (req, res) => {
    try{
        const concert = await Concert.findByIdAndDelete(req.params.id);
        if(!concert){
            return res.status(404).json({
                success: false,
                message: 'Concert not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Concert deleted successfully'
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}