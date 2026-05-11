const User = require("../models/user.model"); 
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 
const register = async (req, res) => { 
try { 
const { name, email, password, role } = req.body; 
const existingUser = await User.findOne({ email }); 
if (existingUser) { 
return res.status(400).json({ message: "Email déjà utilisé" }); 
} 
const hashedPassword = await bcrypt.hash(password, 10); 
const user = await User.create({ 
name, 
email, 
password: hashedPassword, 
role: role || "user", 
}); 
res.status(201).json({ 
message: "Inscription réussie", 
user: { 
id: user._id, 
name: user.name, 
email: user.email, 
role: user.role, 
}, 
}); 
} catch (error) { 
res.status(400).json({ message: error.message }); 
} 
}; 
const login = async (req, res) => { 
try { 
const { email, password } = req.body; 
const user = await User.findOne({ email }); 
if (!user) { 
return res.status(401).json({ message: "Identifiants invalides" }); 
} 
const isMatch = await bcrypt.compare(password, user.password); 
if (!isMatch) { 
return res.status(401).json({ message: "Identifiants invalides" }); 
} 
const token = jwt.sign( 
{ 
userId: user._id, 
email: user.email, 
role: user.role, 
}, 
process.env.JWT_SECRET, 
{ expiresIn: "1d" } 
); 
res.json({ 
message: "Connexion réussie", 
token, 
}); 
} catch (error) { 
res.status(500).json({ message: error.message }); 
} 
}; 
module.exports = { 
register, 
login, 
};