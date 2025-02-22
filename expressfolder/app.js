const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const cors = require('cors')


const peoplePath = path.join(__dirname, "./data.json")
  function getPeople() {
     if(fs.existsSync(peoplePath)){
       return JSON.parse(fs.readFileSync('./data.json', "utf8"))
     }
     return []
  }
  function savePeople(people) {
        fs.writeFileSync("./data.json", JSON.stringify(people, null, 2), "utf8")    
  }
let people = getPeople()





 console.log(people)
 app.use(cors())
 app.use(express.json())
//  const authorize = require('./authorize')
app.get('/api/people', (req, res)=>{
   res.status(200).json({success:true, data:people})
})
app.post('/api/people', (req,res)=>{
   console.log("received data:", req.body)
   const {firstname, lastname, email, phone} = req.body

   if(!firstname || !lastname || !phone || !email){
      return res.status(400).json({success:false, msg:"please provide name, email and phone"})
   }

   const newPerson = {id:people.length + 1,firstname, lastname, email, phone}
   people.push(newPerson)
   savePeople(people)

   res.status(201).json({success:true, data:people})
})
app.delete('/api/people',(req, res)=>{
   const {Id}=req.body
   console.log(req.body)
   console.log(Id)
   console.log("this is the id",Id)
   if(!Id){
      res.status(400).send({sucess:false, msg:"invalid user ID"})
   }
   people = people.filter(person=>person.id !== Id)
   savePeople(people)
   return res.status(200).json({sucess:true, data:people})
  
})
app.put('/api/people', (req, res)=>{
     const {id, firstName, lastName, email, phone} = req.body
     console.log("body",req.body)
     if(!id || !firstName || !lastName || !email || !phone){
      return res.status(404).send({success:false, msg:"you imported an invalid data"})
     }
     const person = people[id-1]
     console.log("person",person)
    const updatedPerson = people[id-1]
    updatedPerson.id = id
    updatedPerson.firstname = firstName
    updatedPerson.lastname =  lastName
    updatedPerson.email = email
    updatedPerson.phone = phone
     console.log("updated person", updatedPerson)
     savePeople(people)
     return res.status(200).json({success:true, data:people})
     
    
})
app.listen(5000, ()=>{
   console.log('Server is listening on port 5000....');
})