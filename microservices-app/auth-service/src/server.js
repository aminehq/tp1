require("dotenv").config(); 
const app = require("./app"); 
const connectDb = require("./config/db"); 
const PORT = process.env.PORT || 5000; 
const startServer = async () => { 
await connectDb(); 
app.listen(PORT, () => { 
console.log(`Auth service running on port ${PORT}`); 
}); 
}; 
startServer(); 