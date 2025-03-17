require("dotenv").config();
const dotenv = require('dotenv')
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const User = require("./userModel");
const app = express();
const cors = require("cors");
const helmet = require("helmet")
const bcrypt = require("bcryptjs")
const appPassword = "yvil cmib rtwc mfzl";

//const peoplePath = path.join(__dirname, "./data.json");

// function getPeople() {
//   if (fs.existsSync(peoplePath)) {
//     return JSON.parse(fs.readFileSync("./data.json", "utf8"));
//   }
//   return [];
// }
// function savePeople(people) {
//   fs.writeFileSync("./data.json", JSON.stringify(people, null, 2), "utf8");
// }
// let people = getPeople();

   // console.log(`${process.env.NAME} ${process.env.PASSWORD} ${process.env.ADMINPASSWORD}`)
app.use(helmet({
    contentSecurityPolicy:{
        directives:{
            defaultSrc:["'self'"],
            connectSrc: ["'self'", "http://localhost:5000"],//allow api request
            styleSrc: ["'self'", "'unsafe-inline'", "http://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"] ,  
          
        }
    }
}))
app.use(cors({
  origin: "*",  // Allow all origins (for development)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.get("/api/people", async (req, res) => {
  try {
    const people = await User.find({});
    return res.status(200).json({ success: true, data: people });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: "internal server error" });
  }
});
app.post("/api/people/", async (req, res) => {
  try {
    const { firstname, lastname, email, number } = req.body;
    console.log(req.body);

    if (!firstname || !lastname || !email || !number) {
      return res
        .status(400)
        .json({ success: false, data: "Invalid user credentials" });
    }
    const person = await User.create({firstname:String(firstname), lastname:String(lastname), email:String(email), number:String(number)});
    return res.status(200).json({ success: true, data: person });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: "internal server error" });
  }
});
app.put("/api/people/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("this is id:", id);
    console.log("this is req body:", req.body);
    if (!id) {
      return res.status(400).json({ success: false, data: "missing user id" });
    }
    const updatedPerson = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json({ success: true, data: "user updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: "server error unable to update person" });
  }
});
app.delete("/api/people/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPerson = await User.findByIdAndDelete(id);
    if (deletedPerson) {
      return res
        .status(200)
        .json({ success: true, data: "person deleted successfully" });
    }
    return res
      .status(400)
      .json({ message: true, data: "user not found and unable to delete" });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: false,
        data: "server internal error, unable to delete user",
      });
  }
});

//create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sundayudoh383@gmail.com",
    pass: appPassword,
  },
  pool: true,
});



app.post("/sendmessage/oncreated", async (req, res) => {
  console.log("request body:", req.body);
  const { firstname, lastname, email, phone } = req.body;
  if (!firstname || !lastname || !email || !phone) {
    return res
      .status(400)
      .json({ success: false, data: "Invalid user credentials" });
  }
  //sunday or weekday
  const time = new Date().getHours()
  const day = new Date().getDay()
  const sundayOrWeekday = (day === 0 && time <=10)?"today":"on sunday"

  const mailOptions = {
   from: '"NewSprings Team" <sundayudoh383@gmail.com>',
   to: email,
   subject: "Welcome to NewSprings!",
   text: `Hello ${firstname} ${lastname},\n\n
Welcome to NewSprings! We're excited to have you on board.\n\n
Here's what you can do next:\n
- Explore our platform and get familiar with the features.\n
- Stay updated with our latest news and updates.\n
- Reach out if you have any questions—we're here to help!\n
- we would message you on ${email} or call ${phone} to reach out to you when neccessary!\n\n
If you ever need assistance, feel free to reply to this email.\n\n
Enjoy your journey with us!\n\n
Best regards see you in church ${sundayOrWeekday},\n
The NewSprings Team`
};

try {
   await transporter.sendMail(mailOptions)
   console.log("sent mail to user after creation")
   return res.status(200).json({ success: true, data: "sent email successfully"})
} catch (error) {
   console.log("unable send mail to user after creation")
   return res.status(200).json({ success: false, data: "unable to send email"})
}
});
app.post("/sendmessage/oncontact", async (req, res) => {
  console.log("request data:", req.body);

  //destructure req.body
  const { name, email, message } = req.body;
  console.log(req.body)
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid user credentials" });
  }

  //sunday or week day
  const time = new Date().getHours();
  const day = new Date().getDay();
  let sundayOrWeekday = day === 0 && time <= 10 ? "today" : "on sunday";

  let mailOptions = {
    from: '"from NewSprings" <sundayudoh383@gmail.com>',
    to: email,
    subject: "We have received your message",
    text: `Hello ${name},\n
    Thank you for reaching out to us. We have received your message and appreciate you taking the time to share your thoughts.\n\n
    We understand the importance of your concern and will review it carefully. If a response is required, we will get back to you as soon as possible.\n\n
    Your message:\n"${message}"\n
    We value your feedback and are committed to providing the best experience. Thank you for being part of NewSprings.\n\n
    Best regards,\nThe NewSprings Team`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("successfully send email");
    return res
      .status(200)
      .json({ success: true, message: "successfully send email" });
  } catch (error) {
    console.log("unable to send email because of :",error);
    return res
      .status(500)
      .json({ success: false, message: "unable to send email" });
  }
});




const harsFirstPassword = async ()=>{
  try {
  
  const envConfig =  dotenv.parse(fs.readFileSync(".env", "utf8"))
  console.log(envConfig)
  const harshedpassword = await bcrypt.hash(envConfig.ADMINPASSWORD, 10 )
  envConfig.HARSHEDADMINPASSWORD = harshedpassword
  const newFile = Object.entries(envConfig).map(([key, value])=> `${key}=${value}`).join("\n")

  fs.writeFileSync(".env", newFile, "utf8")

  dotenv.config()
  console.log(envConfig.HARSHEDADMINPASSWORD)
} catch (error) {
    console.log("unable to relate with harshed user:", error.message)
}

}
harsFirstPassword()





app.post("/password", async(req, res) => {
  try {
    const { userType } = req.body;
    console.log(req.body);
    let envConfig;
    if (fs.existsSync(".env")) {
      envConfig = dotenv.parse(fs.readFileSync(".env", "utf8"));
    }
    console.log("usertype", userType);
    console.log("password", envConfig.ADMINPASSWORD);
  
    if (await bcrypt.compare(userType, envConfig.HARSHEDADMINPASSWORD)) {
      return res
        .status(200)
        .json({ success: true, message: "Successfully logged in" });
    }
    return res.status(400).json({ success: false, message: "wrong and invlaid password" });
  } catch (error) {
      console.log("an unexpected error occured:", error.message)
  }
});


// app.put("/password", (req, res) => {
//   console.log("body", req.body);
//   const oldpassword = JSON.parse(fs.readFileSync("./password.json", "utf8"));
//   fs.writeFileSync(
//     "./password.json",
//     JSON.stringify(req.body, null, 2),
//     "utf8"
//   );
//   console.log("new password", req.body);
//   return res
//     .status(200)
//     .json({
//       newPassword: req.body.userType,
//       oldPassword: oldpassword.userType,
//     });
// });

app.put("/password", async (req, res) => {
  console.log("body", req.body);
  const envConfig = dotenv.parse(fs.readFileSync(".env", "utf8"));

  envConfig.ADMINPASSWORD = req.body.userType
  const harshedpassword = await bcrypt.hash(envConfig.ADMINPASSWORD, 10)
  envConfig.HARSHEDADMINPASSWORD = harshedpassword

    const returnEnv = Object.entries(envConfig).map(([key, value])=> `${key}=${value}` ).join("\n")
  fs.writeFileSync(
    ".env",
    returnEnv,
    "utf8"
  );
  console.log("new password", req.body);
  return res
    .status(200)
    .json({
      newPassword: req.body.userType,
      oldPassword: envConfig.ADMINPASSWORD,
    });
});
const connectDB = async () => {
  try {
    //sundayudoh383
    //sesRDSW46uapVu8i
    mongoose.connect(
      `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@newspringdb.qrbm5.mongodb.net/NewspringsDB?retryWrites=true&w=majority&appName=newspringDB`

    );
    console.log("connected successfuly to mongo");

    app.listen(5000, () => {
      console.log("listening on port 5000...");
    });
  
  } catch (error) {
    console.log("unable to connect to server");
  }
};

connectDB();

