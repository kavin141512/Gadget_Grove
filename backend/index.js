const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

// MONGODB CONNECTION
console.log(process.env.MONGODB_URL);

mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://laxmanpanjalingam2004:RlffCk5P3KNoLhay@laxmanecommerce.fcesaim.mongodb.net/gadgetgrove?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// SCHEMA
const userSchema = mongoose.Schema({
  fname: String,
  lname: String,
  email: {
    type: String,
    unique: true,
    required: true // Make email field required
  },
  password: String,
  confirmpassword: String,
  image: String
});

// MODEL
const userModel = mongoose.model("user", userSchema);

// API
app.get("/", (req, res) => {
  res.send("Server is running");
});

// SIGNUP API
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      
      res.send({ message: "User with the email already exists" });
    } else {
      const data = new userModel(req.body);
      const savedUser = await data.save();
      res.send({ message: "Registered successfully", user: savedUser });
    }
  } catch (error) {
    console.error("Error in signup:", error.message);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.listen(PORT, () => console.log("SERVER IS RUNNING AT PORT: " + PORT));
