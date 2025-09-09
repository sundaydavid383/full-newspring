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
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const appPassword = "yvil cmib rtwc mfzl";
const homeContent = require("./data/homeContent");
const fetch = require('node-fetch');
const contactRoute = require("./routes/contactRoutes");

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
// ================== GET ALL PEOPLE ==================
app.get("/api/people", async (req, res) => {
  console.log("➡️ STEP 1: GET /api/people called");

  try {
    console.log("➡️ STEP 2: Fetching all people from database...");
    const people = await User.find({});
    console.log("✅ STEP 3: Successfully fetched", people.length, "records");

    return res.status(200).json({ success: true, data: people });
  } catch (error) {
    console.error("❌ ERROR: Failed to fetch people:", error.message);
    return res.status(500).json({ success: false, data: "internal server error" });
  }
});


// ================== ADD A NEW PERSON ==================
app.post("/api/people", async (req, res) => {
  console.log("➡️ STEP 1: POST /api/people called");
  console.log("➡️ STEP 2: Request body received:", req.body);

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

    console.log("➡️ STEP 3: Validating required fields...");
    if (!firstname || !lastname || !email || !phone) {
      console.warn("⚠️ STEP 3.1: Missing required fields");
      return res.status(400).json({ success: false, message: "Please provide all required fields." });
    }
    console.log("✅ STEP 3.2: Validation passed");

    // 🔎 STEP 4: Check if user already exists
    const existingUser = await User.findOne({ email: String(email) });
    if (existingUser) {
      console.warn("⚠️ STEP 4.1: User with this email already exists:", email);
      return res.status(409).json({ success: false, message: "User already exists." });
    }

    console.log("➡️ STEP 5: Creating user in database...");
    const person = await User.create({
      firstname: String(firstname),
      lastname: String(lastname),
      email: String(email),
      phone: String(phone),
      age: age ? Number(age) : null,
      school: school ? String(school) : "",
      occupation: occupation ? String(occupation) : "",
      hobbies: hobbies ? String(hobbies) : "",
      heardAboutUs: heardAboutUs ? String(heardAboutUs) : "",
      interest: interest ? String(interest) : "",
    });

    console.log("✅ STEP 6: User created successfully with ID:", person._id);
    return res.status(201).json({ success: true, data: person });

  } catch (error) {
    console.error("❌ ERROR: Failed to add person:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// ================== UPDATE A PERSON ==================
app.put("/api/people/:id", async (req, res) => {
  console.log("➡️ STEP 1: PUT /api/people called with ID:", req.params.id);
  console.log("➡️ STEP 2: Request body received:", req.body);

  try {
    const { firstname, lastname, email, number, school, occupation, hobbies, heardAboutUs, interest } = req.body;

    console.log("➡️ STEP 3: Validating all fields...");
    if (!firstname || !lastname || !email || !number || !school || !occupation || !hobbies || !heardAboutUs || !interest) {
      console.warn("⚠️ STEP 3.1: Validation failed - missing fields");
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    console.log("✅ STEP 3.2: Validation passed");

    console.log("➡️ STEP 4: Updating user in database...");
    const updatedPerson = await User.findByIdAndUpdate(
      req.params.id,
      { firstname, lastname, email, number, school, occupation, hobbies, heardAboutUs, interest },
      { new: true }
    );

    if (!updatedPerson) {
      console.warn("⚠️ STEP 5: User not found with ID:", req.params.id);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("✅ STEP 6: User updated successfully:", updatedPerson._id);
    return res.status(200).json({ success: true, data: updatedPerson });

  } catch (error) {
    console.error("❌ ERROR: Failed to update user:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


// ================== DELETE A PERSON ==================
app.delete("/api/people/:id", async (req, res) => {
  console.log("➡️ STEP 1: DELETE /api/people called with ID:", req.params.id);

  try {
    console.log("➡️ STEP 2: Attempting to delete user from DB...");
    const { id } = req.params;
    const deletedPerson = await User.findByIdAndDelete(id);

    if (deletedPerson) {
      console.log("✅ STEP 3: Person deleted successfully:", id);
      return res.status(200).json({ success: true, data: "Person deleted successfully" });
    }

    console.warn("⚠️ STEP 3: User not found, unable to delete:", id);
    return res.status(400).json({ success: false, data: "User not found and unable to delete" });

  } catch (error) {
    console.error("❌ ERROR: Failed to delete person:", error.message);
    return res.status(500).json({
      success: false,
      data: "Server internal error, unable to delete user",
    });
  }
});

//create transporter
// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "sundayudoh383@gmail.com",
    pass: process.env.EMAIL_PASS,
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
    text: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to NewSprings</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center" style="padding: 20px;">
          <table width="600" cellpadding="20" cellspacing="0" border="0" style="background-color: #ffffff; box-shadow: 0px 0px 10px rgba(0,0,0,.2); border-radius: 8px;">
            <tr>
              <td>
                <h2 style="color: rgb(19, 97, 26); margin-bottom: 20px;">Hello {{firstname}} {{lastname}},</h2>

                <p style="color: #333333; font-size: 15px; line-height: 1.6;">
                  Welcome to <strong>NewSprings</strong>! We're excited to have you on board.
                </p>

                <p style="color: #333333; font-size: 15px; line-height: 1.6;">
                  Here's what you can do next:
                </p>

                <ul style="color: #333333; font-size: 15px; line-height: 1.6;">
                  <li>Explore our platform and get familiar with the features.</li>
                  <li>Stay updated with our latest news and updates.</li>
                  <li>Reach out if you have any questions—we're here to help!</li>
                  <li>We will message you at <strong>{{email}}</strong> or call <strong>{{phone}}</strong> when necessary!</li>
                </ul>

                <p style="color: #333333; font-size: 15px; line-height: 1.6;">
                  If you ever need assistance, feel free to reply to this email.
                </p>

                <p style="color: #333333; font-size: 15px; line-height: 1.6; margin-top: 20px;">
                  Enjoy your journey with us!
                </p>

                <p style="color: #333333; font-size: 15px; line-height: 1.6;">
                  Best regards, see you in church on <strong>{{sundayOrWeekday}}</strong>,<br />
                  <strong style="color: rgb(19, 97, 26);">The NewSprings Team</strong>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
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

app.post("/api/ministry-register", async (req, res) => {
  const { name, email, ministry } = req.body;
  console.log("📥 Incoming registration request:", { name, email, ministry });

  try {
    // Check if user exists
    const user = await User.findOne({ name, email });
    console.log("🔍 User lookup result:", user ? "FOUND" : "NOT FOUND");

    if (!user) {
      console.log("❌ No user found with that name + email. Redirect needed.");
      return res.status(200).json({
        code: "USER_NOT_FOUND",
        message: "User not found. Please signup first.",
      });
    }

    // Make sure ministries array exists
    user.ministries = user.ministries || [];
    console.log("📂 Current ministries before update:", user.ministries);

    // Register user for ministry if not already
    if (!user.ministries.includes(ministry)) {
      user.ministries.push(ministry);
      await user.save();
      console.log(`✅ Added ministry "${ministry}" to user:`, user._id);
    } else {
      console.log(`⚠️ User already registered in "${ministry}"`);
    }

    return res.status(200).json({
      code: "REGISTERED",
      message: `User registered to ministry: ${ministry}`,
    });
  } catch (error) {
    console.error("💥 Server error during ministry registration:", error);
    return res.status(500).json({
      code: "SERVER_ERROR",
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
});



 



app.use("/sendmessage", contactRoute)

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



// This is the endpoint React will call

app.post('/api/getverse', (req, res) => {
  const { mood } = req.body;

  if (!mood) {
    return res.status(400).json({ error: 'No mood provided' });
  }

  const pythonProcess = spawn('python', ['speak.py', mood]);

  let verse = '';
  let error = '';

  pythonProcess.stdout.on('data', (data) => {
    verse += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    error += data.toString();
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0 || error) {
      console.error('Python error:', error);
      return res.status(500).json({ error: 'Error from Python script' });
    }

    res.json({ verse: verse.trim() });
  });
});



//// ==========================
///=================================newsletter subscription and messging
const subscriberRoutes = require('./service/subscribe');

app.use(subscriberRoutes);
//python speak
const speakAfterRegistration = require("./service/afterRegistration")
app.use("/speak", speakAfterRegistration);

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
















