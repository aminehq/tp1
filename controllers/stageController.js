const Stage = require('../models/Stage')
const Artist = require('../models/Artist')

// create stage
exports.createstage = async (req, res) => {
    try {
        const stage = await Stage.create(req.query)
        res.status(201).json({ success: true, stage })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// get all stages
exports.getstage = async (req, res) => {
    try {
        const stages = await Stage.find()
        res.status(200).json({ success: true, stages })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// get artists by stage
exports.getartistBystage = async (req, res) => {
    try {
        const stageId = req.params.id

        const stage = await Stage.findById(stageId)
        if (!stage) {
            return res.status(404).json({
                success: false,
                message: 'Stage not found'
            })
        }

        const artists = await Artist.find({ stageId })

        res.status(200).json({
            success: true,
            artists
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
} // ← هذا كان مفقود

// get stage by id
exports.getstagebyid = async (req, res) => {
    try {
        const stage = await Stage.findById(req.params.id)
        if (!stage) {
            return res.status(404).json({
                success: false,
                message: 'Stage not found'
            })
        }
        res.status(200).json({ success: true, stage })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// update stage
exports.updatestage = async (req, res) => {
    try {
        const stage = await Stage.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!stage) {
            return res.status(404).json({
                success: false,
                message: 'Stage not found'
            })
        }
        res.status(200).json({ success: true, stage })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// delete stage
exports.deletestage = async (req, res) => {
    try {
        const stage = await Stage.findByIdAndDelete(req.params.id)
        if (!stage) {
            return res.status(404).json({
                success: false,
                message: 'Stage not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Stage deleted successfully'
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}