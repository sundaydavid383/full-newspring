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
const authRoutes = require("./routes/loginRoutes");
const {generateOtp, hashOtp, sendOtpEmail, getExpiryTime} = require("./utils/sendOtp");



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
  })
);
app.use(express.json());
const contentFilePath = path.join(__dirname, "data", "homeContent.json");


const OTP_SECRET = process.env.OTP_SECRET || "change_this_in_prod";
const OTP_EXPIRY_MINUTES = Number(process.env.OTP_EXPIRY_MINUTES) || 10;
const OTP_RESEND_LIMIT = Number(process.env.OTP_RESEND_LIMIT) || 5; // per window
const OTP_RESEND_WINDOW_MINUTES = Number(process.env.OTP_RESEND_WINDOW_MINUTES) || 60;
const OTP_RESEND_COOLDOWN_MS = Number(process.env.OTP_RESEND_COOLDOWN_MS) || 60 * 1000



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

// ================== ADD A NEW PERSON (REGISTER) ==================
app.post("/api/people", async (req, res) => {
  const OTP_EXPIRY_MINUTES = Number(process.env.OTP_EXPIRY_MINUTES) || 10;
  console.log("➡️ [START] Received request at /api/people");

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
      password,
    } = req.body || {};

    console.log("🔎 Step 1: Validating required fields...");
    if (!firstname || !lastname || !email || !phone || !password) {
      console.warn("⚠️ Validation failed: Missing required fields");
      return res.status(400).json({
        success: false,
        message:
          "Please fill in your first name, last name, email, phone number, and password. These are required to continue.",
      });
    }

    console.log("✉️ Step 2: Normalizing email...");
    const normalizedEmail = String(email).trim().toLowerCase();

    console.log("🔎 Step 3: Checking for existing user...");
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      console.warn("⚠️ User already exists:", normalizedEmail);
      return res.status(409).json({
        success: false,
        message:
          "This email is already registered. If it belongs to you, try logging in instead of signing up again.",
      });
    }

    console.log("🔐 Step 4: Hashing password...");
    const hashedPassword = await bcrypt.hash(String(password), 12);

    console.log("🔑 Step 5: Generating OTP...");
    const otp = generateOtp(); // you already have this
    const otpHash = hashOtp(otp); // you already have this
    const otpExpiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    console.log("📝 Step 6: Creating user (unverified)...");
    await User.create({
      firstname: String(firstname).trim(),
      lastname: String(lastname).trim(),
      email: normalizedEmail,
      phone: String(phone).trim(),
      age: age ? Number(age) : undefined,
      school: school ? String(school).trim() : "",
      occupation: occupation ? String(occupation).trim() : "",
      hobbies: hobbies ? String(hobbies).trim() : "",
      heardAboutUs: heardAboutUs ? String(heardAboutUs).trim() : "",
      interest: interest ? String(interest).trim() : "",
      password: hashedPassword,
      otpHash,
      otpExpiry,
      otpResendCount: 0,
      otpLastSentAt: new Date(),
      isVerified: false,
    });

    console.log("📧 Step 7: Sending OTP email...");
    const mailSent = await sendOtpEmail(normalizedEmail, otp);

    // IMPORTANT: do NOT return user data here (intentional)
    console.log("🎉 Step 8: Registration completed for", normalizedEmail, "mailSent:", !!mailSent);
    return res.status(201).json({
      success: true,
      message: mailSent
        ? "✅ Account created. Please check your email for the OTP."
        : "⚠️ Account created, but OTP email could not be sent. Try resending later.",
    });
  } catch (err) {
    console.error("❌ [ERROR] in /api/people:", err);

    if (err.code === 11000) {
      console.warn("⚠️ Duplicate email error triggered");
      return res.status(409).json({
        success: false,
        message:
          "This email is already linked to an account. Please use a different one or log in if it’s yours.",
      });
    }

    console.error("💥 Unexpected server error occurred");
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong on our side. Please try again later. If it continues, contact support.",
    });
  }
});

//=================== VERIFY OTP ========================
app.post("/api/auth/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body || {};
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required." });
    }
    const normalizedEmail = String(email).trim().toLowerCase();

    console.log("➡️ VERIFY OTP: Looking up user", normalizedEmail);
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(404).json({ success: false, message: "User not found." });

    if (user.isVerified) return res.status(400).json({ success: false, message: "User already verified." });
    if (!user.otpHash || !user.otpExpiry) return res.status(400).json({ success: false, message: "No OTP found. Please request a new code." });

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ success: false, message: "OTP expired. Please request a new code." });
    }

    const incomingHash = hashOtp(String(otp).trim());
    if (incomingHash !== user.otpHash) {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }

    // Mark verified and clear OTP-related fields
    user.isVerified = true;
    user.otpHash = null;
    user.otpExpiry = null;
    user.otpResendCount = 0;
    user.otpLastSentAt = null;
    await user.save();

    // prepare safe user data (everything except password & OTP fields)
    const safeData = {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      age: user.age,
      school: user.school,
      occupation: user.occupation,
      hobbies: user.hobbies,
      heardAboutUs: user.heardAboutUs,
      interest: user.interest,
      department: user.department,
      education: user.education,
      image: user.image,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    // Optionally issue a JWT so frontend can auto-login after verification
    let token = null;
    if (process.env.JWT_SECRET) {
      token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
    }

    console.log("✅ OTP verified for", user.email);
    return res.json({
      success: true,
      message: "Account verified successfully.",
      data: safeData,
      token, // may be null if JWT_SECRET not set; frontend should handle it
    });
  } catch (err) {
    console.error("Error in /api/auth/verify-otp:", err);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
});

//=================== RESEND OTP ====================
app.post("/api/auth/resend-otp", async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ success: false, message: "Email required." });

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(404).json({ success: false, message: "User not found." });

    if (user.isVerified) return res.status(400).json({ success: false, message: "User already verified." });

    // Cooldown: prevent too-frequent presses (e.g. spam clicks)
    const now = Date.now();
    if (user.otpLastSentAt) {
      const msSinceLast = now - new Date(user.otpLastSentAt).getTime();
      if (msSinceLast < OTP_RESEND_COOLDOWN_MS) {
        return res.status(429).json({ success: false, message: `Please wait ${Math.ceil((OTP_RESEND_COOLDOWN_MS - msSinceLast)/1000)}s before requesting again.` });
      }
    }

    // Windowed limit (e.g. max N resends per window)
    const windowMs = OTP_RESEND_WINDOW_MINUTES * 60 * 1000;
    if (user.otpLastSentAt && (now - new Date(user.otpLastSentAt).getTime()) <= windowMs) {
      // still inside window
      user.otpResendCount = (user.otpResendCount || 0);
      if (user.otpResendCount >= OTP_RESEND_LIMIT) {
        return res.status(429).json({ success: false, message: "Resend limit reached. Please try again later." });
      }
    } else {
      // window expired -> reset counter
      user.otpResendCount = 0;
    }

    // Generate new OTP, hash & save
    const otp = generateOtp();
    user.otpHash = hashOtp(otp);
    user.otpExpiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
    user.otpResendCount = (user.otpResendCount || 0) + 1;
    user.otpLastSentAt = new Date();

    await user.save();

    const mailSent = await sendOtpEmail(user.email, otp);
    if (!mailSent) {
      console.warn("Resend OTP email failed for:", user.email);
      return res.status(200).json({ success: true, message: "OTP regenerated but sending failed (check server logs)." });
    }

    if (process.env.NODE_ENV !== "production") {
      console.log("DEBUG Resent OTP for", user.email, ":", otp);
    }

    return res.json({ success: true, message: "OTP resent successfully." });
  } catch (err) {
    console.error("Error in /api/auth/resend-otp:", err);
    return res.status(500).json({ success: false, message: "Internal server error." });
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


//========================== DELETE ALL USERS ============//
app.delete("/api/people", async (req, res) => {
  console.log("➡️ STEP 1: DELETE /api/people ");

  try {
    console.log("➡️ STEP 2: Attempting to delete all users from DB...");
    const result = await User.deleteMany({});

    if (result.deletedCount === 0) {
      console.warn("⚠️ STEP 3: No users found to delete");
      return res.status(400).json({ success: false, message: "No users found to delete" });
    }

    console.log("✅ STEP 3: All users deleted successfully");
    return res.status(200).json({ success: true, message: "All users deleted successfully" });

  } catch (err) {
    console.log("❌ ERROR: Failed to delete all users:", err.message);
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
  const { firstname, lastname, email, ministry, answers } = req.body;
  console.log("📥 Incoming registration request:", { firstname, lastname, email, ministry, answers });

  try {
    // ✅ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ No user found with that email.");
      return res.status(200).json({
        code: "USER_NOT_FOUND",
        message: "User not found. Please signup first.",
      });
    }

    // Debug log
    console.log("👤 Full user object from DB:", user.toObject ? user.toObject() : user);

    // ✅ Check name mismatch (either first OR last name must match)
    if (user.firstname !== firstname && user.lastname !== lastname) {
      console.log("❌ Name mismatch for the provided email.");
      return res.status(200).json({
        code: "EMAIL_NAME_MISMATCH",
        message: "The name you entered does not match the email in our records.",
      });
    }

    console.log("🔍 User lookup result: FOUND");

    // ✅ Make sure ministries array exists
    user.ministries = user.ministries || [];

    console.log("📂 Current ministries before update:", user.ministries);

    // ✅ Register user for ministry with answers
    const existingMinistry = user.ministries.find(
      (m) => m.name === ministry
    );

    if (existingMinistry) {
      console.log(`⚠️ User already registered in "${ministry}"`);
      return res.status(200).json({
        code: "ALREADY_REGISTERED",
        message: "User already registered in this ministry.",
      });
    }

    // Push new ministry object with answers
    user.ministries.push({
      name: ministry,
      joinedAt: new Date(),
      responses: answers || [],
    });

    await user.save();
    console.log(`✅ Added ministry "${ministry}" to user:`, user._id);

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



 



app.use("/api/auth", authRoutes);

app.use("/sendmessage", contactRoute)

const harsFirstPassword = async () => {
  try {
    // Load current .env
    const envPath = path.join(__dirname, ".env");
    const envConfig = dotenv.parse(fs.readFileSync(envPath, "utf8"));

    // Check if ADMINPASSWORD exists
    if (!envConfig.ADMINPASSWORD) {
      throw new Error("ADMINPASSWORD not found in .env");
    }

    // Only hash if HARSHEDADMINPASSWORD is not set yet
    if (!envConfig.HARSHEDADMINPASSWORD) {
      const hashedPassword = await bcrypt.hash(envConfig.ADMINPASSWORD, 10);
      envConfig.HARSHEDADMINPASSWORD = hashedPassword;

      // Write back both ADMINPASSWORD and HARSHEDADMINPASSWORD
      const newFile = Object.entries(envConfig)
        .map(([key, value]) => `${key}=${value}`)
        .join("\n");

      fs.writeFileSync(envPath, newFile, "utf8");
      console.log("Hashed password saved to .env");
    } else {
      console.log("HARSHEDADMINPASSWORD already exists in .env");
    }

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
  console.log("🔹 /password endpoint hit");

  try {
    const { userType } = req.body;
    if (!userType) {
      console.error("❌ No password provided in request body");
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // ================== STEP 1: Try to get from process.env first ==================
    let storedHash = process.env.HARSHEDADMINPASSWORD;
    console.log("🔍 Checking process.env for HARSHEDADMINPASSWORD...");

    // ================== STEP 2: If not found, fallback to .env file ==================
    if (!storedHash) {
      console.warn("⚠️ HARSHEDADMINPASSWORD not in process.env, checking .env file...");

      if (fs.existsSync(".env")) {
        try {
          const envContent = fs.readFileSync(".env", "utf8");
          const envConfig = dotenv.parse(envContent);
          storedHash = envConfig.HARSHEDADMINPASSWORD;
          console.log("✅ Loaded HARSHEDADMINPASSWORD from .env file");
        } catch (err) {
          console.error("❌ Failed to parse .env file:", err);
          return res.status(500).json({
            success: false,
            message: "Error reading configuration file",
            error: err.message,
          });
        }
      }
    }

    // ================== STEP 3: Validate hash availability ==================
    if (!storedHash) {
      console.error("❌ HARSHEDADMINPASSWORD not found anywhere");
      return res.status(500).json({
        success: false,
        message: "Admin password hash missing in server configuration",
      });
    }

    console.log("🔑 Input password:", userType);
    console.log("🔒 Stored hash:", storedHash);

    // ================== STEP 4: Compare with bcrypt ==================
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(userType, storedHash);
      console.log("🔍 bcrypt.compare result:", isMatch);
    } catch (err) {
      console.error("❌ bcrypt.compare failed:", err);
      return res.status(500).json({
        success: false,
        message: "Password verification failed",
        error: err.message,
      });
    }

    // ================== STEP 5: Send result ==================
    if (isMatch) {
      console.log("✅ Password correct, login successful");
      return res.status(200).json({
        success: true,
        message: "Successfully logged in",
      });
    } else {
      console.warn("⚠️ Wrong password provided");
      return res.status(400).json({
        success: false,
        message: "Wrong or invalid password",
      });
    }
  } catch (error) {
    console.error("🔥 Unexpected error in /password route:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
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
















