const app = require("./app");
const connectDB = require("./config/db");
require("dotenv").config();

// Connect to DB and Start Server
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});