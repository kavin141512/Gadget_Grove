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

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://laxmanpanjalingam2004:RlffCk5P3KNoLhay@laxmanecommerce.fcesaim.mongodb.net/gadgetgrove?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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
    required: true, // Make email field required
  },
  password: String,
  confirmpassword: String,
  image: String,
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
      res.send({ message: "User with the email already exists", alert: false });
    } else {
      const data = new userModel(req.body);
      const savedUser = await data.save();
      res.send({
        message: "Registered successfully",
        user: savedUser,
        alert: true,
      });
    }
  } catch (error) {
    console.error("Error in signup:", error.message);
    res.status(500).send({ message: "Internal server error" });
  }
});

// login api
app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body; // Extract both email and password from the request body
  console.log(email);

  try {
    const result = await userModel.findOne({ email: email });

    if (result) {
      // result contains user details as an object
      console.log(result);

      // Check if the provided password matches the stored password
      if (password === result.password) {
        const dataSent = {
          _id: result._id,
          fname: result.fname,
          lname: result.lname,
          email: result.email,
          password: result.password,
          confirmpassword: result,
          image: result.image,
        };
        res.send({
          message: "Login Successful! Welcome Back",
          alert: true,
          data: dataSent,
        });
      } else {
        res.send({ message: "Incorrect password", alert: false });
      }
    } else {
      res.send({ message: "User not found", alert: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error", alert: false });
  }
});


app.listen(PORT, () => console.log("SERVER IS RUNNING AT PORT: " + PORT));
