require("dotenv").config();
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const User = require("./userModel");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser")
const { spawn } = require("child_process");
const appPassword = "yvil cmib rtwc mfzl";
const homeContent = require("./data/homeContent");

app.use(cors());
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
// Serve static files from the "assets" folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));
const port = process.env.Port

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
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "http://localhost:5001"], //allow api request
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "http://fonts.googleapis.com",
          "https://cdnjs.cloudflare.com",
        ],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
      },
    },
  })
);
app.use(
  cors({
    origin: "*", // Allow all origins (for development)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
const contentFilePath = path.join(__dirname, "data", "homeContent.json");

function getBase64Image(imagePath){
  try {
     const image = fs.readFileSync(imagePath);
     return `data:image/jpeg;base64,${image.toString("base64")}`;
  } catch (error) {
    console.error( `Error reading file: ${imagePath}`, error)
    return null
  }
}

app.get("/api/home-content", (req, res) => {
  try {
    const rawData = fs.readFileSync(contentFilePath, "utf8")
    const data = JSON.parse(rawData);

    //dynamically insert base64 image sources
    const imagedir = path.join(__dirname, "assets")

    if(data.journeyData?.length){
      data.journeyData[0].images[0].src = getBase64Image(path.join(imagedir, "rccg5.jpg"));
      data.journeyData[0].images[1].src = getBase64Image(path.join(imagedir, "rccg2.jpg"));
    }
    res.json(data);
    console.log(data);
  } catch (error) {
    console.error("Failed to read or parse homeContent file", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
 // Send homeContent data as response
});


  

 
app.put("/api/update-home-content", (req, res) => {
  try {
    const { journeyData, sections, videoData, churchCards, events, ministryAreas, features, schedule, eventData, articles } = req.body;
      // Save rccg5.jpg if a new base64 image was sent
      if (journeyData[0].images[0].src.startsWith("data:image")) {
        const base64Data1 = journeyData[0].images[0].src.replace(/^data:image\/\w+;base64,/, "");
        fs.writeFileSync(path.join(__dirname, "assets", "rccg5.jpg"), Buffer.from(base64Data1, "base64"));
      }
  
      // Save rccg2.jpg if a new base64 image was sent
      if (journeyData[0].images[1].src.startsWith("data:image")) {
        const base64Data2 = journeyData[0].images[1].src.replace(/^data:image\/\w+;base64,/, "");
        fs.writeFileSync(path.join(__dirname, "assets", "rccg2.jpg"), Buffer.from(base64Data2, "base64"));
      }

    // ✅ Save the updated full content
    fs.writeFileSync(
      contentFilePath,
      JSON.stringify({ journeyData, sections, videoData, churchCards, events, ministryAreas, features, schedule, eventData, articles }, null, 2)
    );

    res.status(200).json({ success: true, message: "Content updated successfully!" });
  } catch (error) {
    console.error("Error updating home content:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});



app.post('/log', (req,res)=>{
  const logData = req.body;

  //format the log entry
  const logEntry = `
  [${new Date().toISOString()}] ERROR:
  Message: ${logData.message}
  Source: ${logData.source}
  Line: ${logData.lineno}, Column:${logData.colno}
  Stack: ${logData.error || 'No stack trace'}
  ............................
  `;

  // Append log entry to a file (logs/errors.log)
  const logFilePath = path.join(__dirname, 'logs', 'errors.log')

  //Ensure the logs directory exists
  fs.mkdir(path.join(__dirname, 'logs'), {recursive:true}, (err)=>{
    if(err){
      console.error('Could not create logs dirctory:', err);
      return res.status(500).send('Could not create logs dirctory');
    }

    fs.appendFile(logFilePath, logEntry, (err)=> {
      if(err){
        console.error('Failed to write log:', err);
        return res.status(500).send('Internal server Error')
      }
      res.status(200).send('log recieved')
    })
  })
})
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
    const {
      firstname,
      lastname,
      email,
      phone,
      age,
      school,
      occupation,
      hobbies,
      heardAboutUs,
      interest,
    } = req.body;

    console.log(req.body);  // This will print the received data for debugging

    // Check if required fields are present
    if (!firstname || !lastname || !email || !phone) {
      return res
        .status(400)
        .json({ success: false, data: "Please provide all required fields." });
    }

    // Create a new person in the database
    const person = await User.create({
      firstname: String(firstname),
      lastname: String(lastname),
      email: String(email),
      phone: String(phone),
      age: age ? Number(age) : null,  // If age is provided, convert it to a number, otherwise set as null
      school: school ? String(school) : "",  // Optional field
      occupation: occupation ? String(occupation) : "",  // Optional field
      hobbies: hobbies ? String(hobbies) : "",  // Optional field
      heardAboutUs: heardAboutUs ? String(heardAboutUs) : "",  // Optional field
      interest: interest ? String(interest) : "",  // Optional field
    });
    console.log("user added successfully")
    return res.status(200).json({ success: true, data: person });
    
  } catch (error) {
    console.error("Error in adding person:", error);
    return res
      .status(500)
      .json({ success: false, data: "Internal server error" });
  }
});
app.put("/api/people/:id", async (req, res) => {
  try {
    const { firstname, lastname, email, number, school, occupation, hobbies, heardAboutUs, interest } = req.body;
    if (!firstname || !lastname || !email || !number || !school || !occupation || !hobbies || !heardAboutUs || !interest) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const updatedPerson = await User.findByIdAndUpdate(
      req.params.id,
      { firstname, lastname, email, number, school, occupation, hobbies, heardAboutUs, interest },
      { new: true }
    );
    if (!updatedPerson) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, data: updatedPerson });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
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
    return res.status(500).json({
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

//send message
app.post("/sendmessage/oncreated", async (req, res) => {
  console.log("request body:", req.body);
  const { firstname, lastname, email, phone } = req.body;
  if (!firstname || !lastname || !email || !phone) {
    return res
      .status(400)
      .json({ success: false, data: "Invalid user credentials" });
  }
  //sunday or weekday
  const time = new Date().getHours();
  const day = new Date().getDay();
  const sundayOrWeekday = day === 0 && time <= 10 ? "today" : "on sunday";

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
The NewSprings Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("sent mail to user after creation");
    return res
      .status(200)
      .json({ success: true, data: "sent email successfully" });
  } catch (error) {
    console.log("unable send mail to user after creation");
    return res
      .status(200)
      .json({ success: false, data: "unable to send email" });
  }
});
app.post("/sendmessage/oncontact", async (req, res) => {
  console.log("request data:", req.body);

  //destructure req.body
  const { name, email, message } = req.body;
  console.log(req.body);
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
    Best regards,\nThe NewSprings Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("successfully send email");
    return res.status(200).json({
      success: true,
      message:
        "successfully send email check your spam list if notv foun in your inbox",
    });
  } catch (error) {
    console.log("unable to send email because of :", error);
    return res
      .status(500)
      .json({ success: false, message: "unable to send email" });
  }
});

//harshed password
const harsFirstPassword = async () => {
  try {
    const envConfig = dotenv.parse(fs.readFileSync(".env", "utf8"));
    console.log(envConfig);
    const harshedpassword = await bcrypt.hash(envConfig.ADMINPASSWORD, 10);
    envConfig.HARSHEDADMINPASSWORD = harshedpassword;
    const newFile = Object.entries(envConfig)
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");

    fs.writeFileSync(".env", newFile, "utf8");

    dotenv.config();
    console.log(envConfig.HARSHEDADMINPASSWORD);
  } catch (error) {
    console.log("unable to relate with harshed user:", error.message);
  }
};
harsFirstPassword();

//python speak
app.post("/speak/after/registration", (req, res) => {
  const { firstname, phone, email } = req.body;

  let pythonProcess;

  setTimeout(() => {
    pythonProcess = spawn("python", ["speak.py", firstname, phone, email]);
  }, 5001);

  pythonProcess.stdout.on("data", (data) => {
    console.log(`Python data: ${data.toString()}`);
    //send response only if not already sent
    if (!res.headersSent) {
      res.status(200).json({ message: data.toString().trim() });
    }
  });
  pythonProcess.stderr.on("data", (data) => {
    console.log(`Python Error: ${data.toString()}`);
    //send response onlu if not already sent
    if (!res.headersSent) {
      res.status(500).json({ error: data.toString() });
    }
  });
});

app.post("/password", async (req, res) => {
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
    return res
      .status(400)
      .json({ success: false, message: "wrong and invlaid password" });
  } catch (error) {
    console.log("an unexpected error occured:", error.message);
  }
});
app.put("/password", async (req, res) => {
  console.log("body", req.body);
  const envConfig = dotenv.parse(fs.readFileSync(".env", "utf8"));

  envConfig.ADMINPASSWORD = req.body.userType;
  const harshedpassword = await bcrypt.hash(envConfig.ADMINPASSWORD, 10);
  envConfig.HARSHEDADMINPASSWORD = harshedpassword;

  const returnEnv = Object.entries(envConfig)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  fs.writeFileSync(".env", returnEnv, "utf8");
  console.log("new password", req.body);
  return res.status(200).json({
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

    app.listen(port||5001, () => {
      console.log("listening on port 5001...");
    });
  } catch (error) {
    console.log("unable to connect to server");
  }
};

connectDB();
