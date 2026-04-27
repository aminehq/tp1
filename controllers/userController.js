const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
exports.inscriptioncontroller = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name, email, password: hashedPassword })
        res.status(201).json({ success: true, user: newUser })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
exports.connexioncontroller = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.status(200).json({ success: true, token })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}