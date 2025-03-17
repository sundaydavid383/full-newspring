import { useState, useEffect } from "react";
import "./dataBase.css";

const DataBase = ({ setActive, dataBase, setDataBase, onLoad }) => {
 
  const [seeForm, setSeeForm] = useState(false);
  const [seeData, setSeeData] = useState(false);
  const [seeEmailStatus, setSeeEmailStatus] = useState(false)
  const [emailStatus, setEmailStatus] = useState("")
  const [newAdminPassword, setNewAdminPassword] = useState("")
  const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  const [password, setPassword] = useState("")
  const [updateData, setUpdateData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    id: 0,
  });

  useEffect(() => {
    setActive("database");
  }, [])
  

  const handleNameChange = (e) => {
    const name = e.target.name;
    setUpdateData((prev) => ({ ...prev, [name]: e.target.value }));
  };






  async function deleteUser(id) {
    try {
      const response = await fetch(`http://localhost:5000/api/people/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data.data)
      onLoad();
    } catch (error) {
      console.error("this occured:", error);
      alert("there was an error while deleting");
    }
  }


  const onSubmit = (e) => {
    e.preventDefault();

    const firstNameLable = document.getElementById("updfirstNameLable");
    const firstname = document.getElementById("firstname");
    const lastNameLable = document.getElementById("updlastNameLable");
    const lastname = document.getElementById("lastname");
    const email = document.getElementById("email");
    const emailLabel = document.getElementById("updemailLabel");
    const phone = document.getElementById("phone");
    const phoneLable = document.getElementById("updphoneLable");
    const phoneRegx = /^\+?[0-9]\d{10,13}$/;
    const emailRegx = /^[A-Za-z0-9%._+-]+@[A-Za-z0-9._\-]+\.[A-Za-z-0-9-.]{2,6}$/;

    if (updateData.firstname.trim() === "") {
      firstname.classList.add("alert");
      firstNameLable.textContent = "input your first name";
      setTimeout(() => {
        firstname.classList.remove("alert");
      }, 2000);

      return;
    } else if (updateData.lastname.trim() === "") {
      lastname.classList.add("alert");
      lastNameLable.textContent = "input your last name";
      setTimeout(() => {
        lastname.classList.remove("alert");
      }, 2000);
      return;
    } else if (updateData.email.trim() === "") {
      email.classList.add("alert");
      emailLabel.textContent = "input email address";
      setTimeout(() => {
        email.classList.remove("alert");
      }, 2000);
      return;
    } else if (!emailRegx.test(updateData.email)) {
      email.classList.add("alert");
      emailLabel.textContent = "input a valid email address";
      setTimeout(() => {
        email.classList.remove("alert");
      }, 2000);
      return;
    } else if (updateData.phone.trim() === "") {
      phone.classList.add("alert");
      phoneLable.textContent = "input a phone number";
      setTimeout(() => {
        phone.classList.remove("alert");
      }, 2000);
      return;
    } else if (!phoneRegx.test(updateData.phone)) {
      phone.classList.add("alert");
      phoneLable.textContent = "input a valid phone number";
      setTimeout(() => {
        phone.classList.remove("alert");
      }, 2000);
      return;
    } else {
      e.target.reset();
      setUpdateData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        id: 0,
      });
      lastNameLable.textContent = "";
      firstNameLable.textContent = "";
      emailLabel.textContent = "";
      phoneLable.textContent = "";
      phone.classList.remove("alert");
      email.classList.remove("alert");
      lastname.classList.remove("alert");
      firstname.classList.remove("alert");
      setSeeForm(false);
      alert("You have been successfully updated the user");
      console.log(
        "this are the datas",
        updateData.firstname,
        updateData.email,
        updateData.lastname,
        updateData.phone
      );
      upDatePerson(
        updateData.id,
        updateData.firstname,
        updateData.lastname,
        updateData.email,
        updateData.phone
      );
    }
  };



  const upDatePerson = async (id, firstname, lastname, email, number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/people/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body:  JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          number: number
       }),
      });
      const data = await response.json();
      console.log(data.data)
      onLoad();
    } catch (error) {
      alert("this error occured", error);
    }
  };


  const onSubmitPass = async(e)=>{
    try {
      e.preventDefault()
      const response = await fetch("http://localhost:5000/password",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ userType: password})
      })
      if(!response.ok){
        throw new Error(`couldnt get response${response.statusText}`)
      }
      else{
        const data = await response.json()
        if(response.status == 400){
          //const adminPass = document.getElementById("adminPass")
          //adminPass.textContent = data.message
          
          setSeeEmailStatus(true)
          // setTimeout(() => {
          //       adminPass.textContent = ""
          //       setPassword("")
          // }, 2000);
        }
        else{
          setSeeData(true)
          setSeeEmailStatus(false)
        }
      }
    } catch (error) {
         setEmailStatus(error.message)
         setSeeEmailStatus(true)
         setTimeout(() => {
          setSeeEmailStatus(false)
          setEmailStatus("")
         }, 2000);
         setPassword("")
    }
  

 
  }


  const onSubmitAdminPass = async(e)=>{
    e.preventDefault()
    const response = await fetch("http://localhost:5000/password",{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({userType: newAdminPassword})
    })
    if(!response.ok){
      throw new Error(`couldnt get response${response.statusText}`)
    }
    const data = await response.json()
    if(data){
      setEmailStatus(`you have change the password from ${data.oldPassword}, ${data.newPassword}`)
      setSeeEmailStatus(true)
      setTimeout(() => {
       setSeeEmailStatus(false)
       setEmailStatus("")
      }, 2000);
      setNewAdminPassword("")
    }
  }


  return (
    <div className="database">
     { seeEmailStatus ?<div className="emial_status">
        <p>{emailStatus}</p>
        <div onClick={()=>{setSeeEmailStatus(false)}} className="btn">Got it</div>
      </div>:null}
      {seeData ?
      <div className="data">
        {seeForm ? (
        <form onSubmit={onSubmit}>
          <p>{updateData.firstname}</p>
          <p>{updateData.lastname}</p>
          <p>{updateData.email}</p>
          <h2>Register as a member</h2>{" "}
          <div className="inputs">
            <div className="names">
              <div className="input">
                <label htmlFor="">First Name:</label>
                <input
                  onChange={handleNameChange}
                  value={updateData.firstname}
                  type="text"
                  name="firstname"
                  id="firstname"
                />
                <label className="realLabels" id="updfirstNameLable"></label>{" "}
              </div>
              <div className="input">
                <label htmlFor="">Last Name:</label>{" "}
                <input
                  onChange={handleNameChange}
                  value={updateData.lastname}
                  type="text"
                  name="lastname"
                  id="lastname"
                />
                <label className="realLabels" id="updlastNameLable"></label>{" "}
              </div>
            </div>
            <div className="input">
              <label htmlFor="">Email:</label>{" "}
              <input
                onChange={handleNameChange}
                value={updateData.email}
                type="text"
                name="email"
                id="email"
              />{" "}
              <label className="realLabels" id="updemailLabel"></label>{" "}
            </div>
            <div className="input">
              <label htmlFor="">Phone:</label>{" "}
              <input
                onChange={handleNameChange}
                value={updateData.phone}
                type="text"
                name="phone"
                id="phone"
              />{" "}
              <label className="realLabels" id="updphoneLable"></label>{" "}
            </div>{" "}
            <button className="btn-slide" type="submit">
              {" "}
              <p>Register</p>{" "}
            </button>{" "}
          </div>{" "}
          <p></p>{" "}
        </form>
      ) : null}
      <table>
        <thead>
          <tr>
            <td> ID</td>
            <td>FirstName</td>
            <td>LastName</td>
            <td>Email</td>
            <td>Phone</td>
            <td>opt</td>
          </tr>
        </thead>
        <tbody>
          {dataBase.map((user, index) => (
            <tr key={user.id}>
              <td>{numbers[index]}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.number}</td>
              <td className="lastTD">
                <div onClick={() => deleteUser(user._id)} className="btn">
                  <p>Delete</p>
                </div>
                <div
                  onClick={() => {
                    console.log("user id", user._id);
                    setSeeForm(true);
                    setUpdateData({
                      firstname: user.firstname,
                      lastname: user.lastname,
                      email: user.email,
                      phone: user.number,
                      id: user._id,
                    });
                  }}
                  className="btn"
                >
                  <p>Update</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="securingData">
      <form onSubmit={onSubmitAdminPass} action="">
          <input
            value={newAdminPassword}
            onChange={(e) => {
                setNewAdminPassword(e.target.value);
                console.log(newAdminPassword)
            }}
            type="password"
            name="password"
            maxLength={4}
            placeholder="change admin password"
          />
          <button  className="btn" type="submit">
            <p>Enter</p>
          </button>
        </form>
        <label id="" htmlFor="">
        </label></div></div>:   
         <div className="securingData">
          <form onSubmit={onSubmitPass} action="">
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              console.log(password)
            }}
            type="password"
            name="password"
            placeholder="enter admin password"
          />
          <button className="btn" type="submit">
            <p>Enter</p>
          </button>
        </form>
     
</div>}
      
    </div>
  );
};

export default DataBase;
