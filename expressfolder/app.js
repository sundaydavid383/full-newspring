const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const User = require("./userModel");
const app = express();
const cors = require("cors");
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

app.use(cors());
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
    const person = await User.create(req.body);
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

//  const transporter = nodemailer.createTransport({
//    service: "gmail",
//    auth: {
//       user: "sundayudoh383@gmail.com",
//       pass: appPassword, // Ensure this is correct
//    },
//    pool: true, // Helps with connection issues
// });
// app.post("/sendmessage", async (req, res) => {
//    console.log("Request Body:", req.body);

//    const { name, email, message } = req.body;
//    if (!name || !email || !message) {
//       return res.status(400).json({ message: "Invalid user credentials" });
//    }

//    // Determine Sunday or Weekday Message
//    const day = new Date().getDay();
//    const time = new Date().getHours();
//    let sundayOrWeekday = (day === 0 || (day === 5 && time <= 13)) ? "today" : "on Sunday";

//    // Email Options
//    const mailOptions = {
//       from: '"newSprings" <sundayudoh383@gmail.com>',
//       to: email,
//       subject: "We have received your message",
//       text: `${name}, welcome to our website! Hope to see you in church ${sundayOrWeekday}.\n\nWe have received your message and will reach back to you later.\n\nMessage: ${message}`,
//    };

//    // Send Email
//    try {
//       await transporter.sendMail(mailOptions);
//       console.log("Email successfully sent!");
//       return res.status(200).json({ success: true, message: "Email successfully sent" });
//    } catch (error) {
//       console.error("Email error:", error.message);
//       return res.status(500).json({ success: false, message: "Unable to send email", error: error.message });
//    }
// });

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
    console.log("unable to send email");
    return res
      .status(500)
      .json({ success: false, message: "unable to send email" });
  }
});

//change admin password
app.post("/password", (req, res) => {
  const { userType } = req.body;
  console.log(req.body);
  let password;
  if (fs.existsSync("./password.json")) {
    password = JSON.parse(fs.readFileSync("./password.json", "utf8"));
  }
  console.log("usertype", userType);
  console.log("password", password.userType);

  if (userType === password.userType) {
    return res
      .status(200)
      .json({ success: true, message: "Successfully logged in" });
  }
  return res.status(400).json({ success: false, message: "wrong password" });
});
app.put("/password", (req, res) => {
  console.log("body", req.body);
  const oldpassword = JSON.parse(fs.readFileSync("./password.json", "utf8"));
  fs.writeFileSync(
    "./password.json",
    JSON.stringify(req.body, null, 2),
    "utf8"
  );
  console.log("new password", req.body);
  return res
    .status(200)
    .json({
      newPassword: req.body.userType,
      oldPassword: oldpassword.userType,
    });
});

// app.get('/api/people', (req, res)=>{
//    res.status(200).json({success:true, data:people})
// })
// app.post('/api/people', async(req,res)=>{
//    console.log("received data:", req.body)
//    const {firstname, lastname, email, phone} = req.body

//    if(!firstname || !lastname || !phone || !email){
//       return res.status(400).json({success:false, msg:"please provide name, email and phone"})
//    }

//    const newPerson = {id:people.length + 1,firstname, lastname, email, phone}
//    people.push(newPerson)
//    savePeople(people)
//    // try {
//    //    const mailOptions = {
//    //        from: '"My App" <sundayudoh383@gmail.com>',
//    //        to: email,  // Recipient's email
//    //        subject: "Welcome to My App!",
//    //        text: `Hello ${firstname} ${lastname},\n\nThank you for registering!\n\nBest regards,\nMy App Team`
//    //    };

//    //    const info = await transporter.sendMail(mailOptions);
//    //    console.log("Email sent:", info.response);

//       return res.status(201).json({ success: true, msg: "User registered and email sent", data: people });
//   //} catch (error) {
//    //   console.error("Error sending email:", error.message);

//       // Check for specific errors
//    //   if (error.message.includes("No recipients defined")) {
//    //       return res.status(400).json({ success: false, msg: "Invalid email address" });
//   //    }

//     //  return res.status(500).json({ success: false, msg: "User registered, but email could not be sent" });
//   //}
// })
// app.delete('/api/people',(req, res)=>{
//    const {Id}=req.body
//    console.log(req.body)
//    console.log(Id)
//    console.log("this is the id",Id)
//    if(!Id){
//       res.status(400).send({sucess:false, msg:"invalid user ID"})
//    }
//    people = people.filter(person=>person.id !== Id)
//    savePeople(people)

//    return res.status(200).json({sucess:true, data:people})

// })
// app.put('/api/people', (req, res)=>{
//      const {id, firstName, lastName, email, phone} = req.body
//      console.log("body",req.body)
//      if(!id || !firstName || !lastName || !email || !phone){
//       return res.status(404).send({success:false, msg:"you imported an invalid data"})
//      }
//      const person = people[id-1]
//      console.log("person",person)
//     const updatedPerson = people[id-1]
//     updatedPerson.id = id
//     updatedPerson.firstname = firstName
//     updatedPerson.lastname =  lastName
//     updatedPerson.email = email
//     updatedPerson.phone = phone
//      console.log("updated person", updatedPerson)
//      savePeople(people)
//      return res.status(200).json({success:true, data:people})

// })

const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://sundayudoh383:sesRDSW46uapVu8i@newspringdb.qrbm5.mongodb.net/NewspringsDB?retryWrites=true&w=majority&appName=newspringDB"
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
