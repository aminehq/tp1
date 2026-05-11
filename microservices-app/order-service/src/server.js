require("dotenv").config(); 
const app = require("./app"); 
const connectDb = require("./config/db"); 
const PORT = process.env.PORT || 5002; 
const startServer = async () => { 
await connectDb(); 
app.listen(PORT, () => { 
console.log(`Order service running on port ${PORT}`); 
}); 
}; 
startServer(); 