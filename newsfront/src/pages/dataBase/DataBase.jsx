import { useState, useEffect } from "react";
import "./dataBase.css";

const DataBase = ({ setActive, dataBase, setDataBase, onLoad }) => {
 
  const [seeForm, setSeeForm] = useState(false);
  const [seeData, setSeeData] = useState(false);
  const [loading, setLoading] = useState(false)


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

    const base_Url = 'https://full-newspring.onrender.com/'






  async function deleteUser(id) {
    try {
      const response = await fetch(`${base_Url}api/people/${id}`, {
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
    const age = document.getElementById("age");
    const ageLable = document.getElementById("updageLable");
  
    const phoneRegx = /^\+?[0-9]\d{10,13}$/;
    const emailRegx = /^[A-Za-z0-9%._+-]+@[A-Za-z0-9._\-]+\.[A-Za-z-0-9-.]{2,6}$/;
  
    // Validate all fields
    if (updateData.firstname.trim() === "") {
      firstname.classList.add("alert");
      firstNameLable.textContent = "Input your first name";
      setTimeout(() => {
        firstname.classList.remove("alert");
      }, 2000);
  
      return;
    } else if (updateData.lastname.trim() === "") {
      lastname.classList.add("alert");
      lastNameLable.textContent = "Input your last name";
      setTimeout(() => {
        lastname.classList.remove("alert");
      }, 2000);
      return;
    } else if (updateData.email.trim() === "") {
      email.classList.add("alert");
      emailLabel.textContent = "Input email address";
      setTimeout(() => {
        email.classList.remove("alert");
      }, 2000);
      return;
    } else if (!emailRegx.test(updateData.email)) {
      email.classList.add("alert");
      emailLabel.textContent = "Input a valid email address";
      setTimeout(() => {
        email.classList.remove("alert");
      }, 2000);
      return;
    } else if (updateData.phone.trim() === "") {
      phone.classList.add("alert");
      phoneLable.textContent = "Input a phone number";
      setTimeout(() => {
        phone.classList.remove("alert");
      }, 2000);
      return;
    } else if (!phoneRegx.test(updateData.phone)) {
      phone.classList.add("alert");
      phoneLable.textContent = "Input a valid phone number";
      setTimeout(() => {
        phone.classList.remove("alert");
      }, 2000);
      return;
    } else if (isNaN(updateData.age) || updateData.age <= 15) {
      age.classList.add("alert");
      ageLable.textContent = "Input a valid age";
      setTimeout(() => {
        age.classList.remove("alert");
      }, 2000);
      return;
    } else {
   
      e.target.reset();
      setUpdateData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        school: "",
        occupation: "",
        hobbies: "",
        heardAboutUs: "",
        interest: "",
        age: "",
        id: 0,
      });
      lastNameLable.textContent = "";
      firstNameLable.textContent = "";
      emailLabel.textContent = "";
      phoneLable.textContent = "";
      ageLable.textContent = "";
      phone.classList.remove("alert");
      email.classList.remove("alert");
      lastname.classList.remove("alert");
      firstname.classList.remove("alert");
      age.classList.remove("alert");
      setSeeForm(false);
      alert("User updated successfully");
      console.log("Updated user data:", updateData);
  
      // Call backend to update user
      upDatePerson(
        updateData.id,
        updateData.firstname,
        updateData.lastname,
        updateData.email,
        updateData.phone,
        updateData.school,
        updateData.occupation,
        updateData.hobbies,
        updateData.heardAboutUs,
        updateData.interest,
        updateData.age
      );
    }
  };



  const upDatePerson = async (
  id,
  firstname,
  lastname,
  email,
  number,
  school,
  occupation,
  hobbies,
  heardAboutUs,
  interest
) => {
  try {
    setLoading(true);

    const response = await fetch(`${base_Url}api/people/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        number,
        school,
        occupation,
        hobbies,
        heardAboutUs,
        interest,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // If backend sent a message, show it
      const errorMessage = data?.message || "An error occurred while updating.";
      setEmailStatus(errorMessage);
      setSeeEmailStatus(true);
      return;
    }

    // If successful
    console.log(data.data);
    onLoad();
  } catch (error) {
    // If fetch itself failed (network, etc.)
    setEmailStatus(error.message || "Something went wrong.");
    setSeeEmailStatus(true);
  } finally {
    setLoading(false);
  }
};


const onSubmitPass = async (e) => {
  e.preventDefault();
  try {
    setLoading(true)
    const response = await fetch(`${base_Url}password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userType: password }),
    });

    const data = await response.json();

    if (!response.ok) {
  const errorMessage = data?.message || `Error: ${response.statusText}`;
  setEmailStatus(data?.message || `Error: ${response.statusText}`);
  setSeeEmailStatus(true);
  return;
}

if (response.status === 400) {
  setEmailStatus(data.message || "Invalid password.");
  setSeeEmailStatus(true);
} else {
  setSeeData(true);
  setSeeEmailStatus(false);
}
  } catch (error) {
    setEmailStatus(error.message || "Network error.");
    setSeeEmailStatus(true);
  } finally {
    setPassword("");
    setLoading(false)
    setTimeout(() => {
      setSeeEmailStatus(false);
      setEmailStatus("");
    }, 2000);
  }
};


  const onSubmitAdminPass = async(e)=>{
    e.preventDefault()
    const response = await fetch(`${base_Url}password`,{
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

if (loading) return  <div className="loading">
    <div className="bar bar1"></div>
    <div className="bar bar2"></div>
    <div className="bar bar3"></div>
  </div>;
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
  <h2>Register as a member</h2>
  <div className="inputs">
    <div className="names">
      <div className="input">
        <input
          onChange={handleNameChange}
          value={updateData.firstname}
          type="text"
          name="firstname"
          id="firstname"
          placeholder="First Name"
        />
        <label className="realLabels" id="updfirstNameLable"></label>
      </div>
      <div className="input">
        <input
          onChange={handleNameChange}
          value={updateData.lastname}
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Last Name"
        />
        <label className="realLabels" id="updlastNameLable"></label>
      </div>
    </div>
    <div className="input">
      <input
        onChange={handleNameChange}
        value={updateData.email}
        type="text"
        name="email"
        id="email"
        placeholder="Email"
      />
      <label className="realLabels" id="updemailLabel"></label>
    </div>
    <div className="names">
      <div className="input">
        <input
          onChange={handleNameChange}
          value={updateData.phone}
          type="text"
          name="phone"
          id="phone"
          placeholder="Phone"
        />
        <label className="realLabels" id="updphoneLable"></label>
      </div>
      <div className="input">
        <input
          onChange={handleNameChange}
          value={updateData.age}
          type="number"
          name="age"
          id="age"
          min="0"
          placeholder="Age"
        />
        <label className="realLabels" id="updageLable"></label>
      </div>
    </div>

    {/* New Fields for Admin to Edit */}
    <div className="input">
      <input
        onChange={handleNameChange}
        value={updateData.school}
        type="text"
        name="school"
        id="school"
        placeholder="School"
      />
      <label className="realLabels" id="updschoolLable"></label>
    </div>
    <div className="input">
      <input
        onChange={handleNameChange}
        value={updateData.occupation}
        type="text"
        name="occupation"
        id="occupation"
        placeholder="Occupation"
      />
      <label className="realLabels" id="updoccupationLable"></label>
    </div>
    <div className="input">
      <input
        onChange={handleNameChange}
        value={updateData.hobbies}
        type="text"
        name="hobbies"
        id="hobbies"
        placeholder="Hobbies"
      />
      <label className="realLabels" id="updhobbiesLable"></label>
    </div>
    <div className="input">
      <input
        onChange={handleNameChange}
        value={updateData.heardAboutUs}
        type="text"
        name="heardAboutUs"
        id="heardAboutUs"
        placeholder="How did you hear about us?"
      />
      <label className="realLabels" id="updheardAboutUsLable"></label>
    </div>
    <div className="input">
      <input
        onChange={handleNameChange}
        value={updateData.interest}
        type="text"
        name="interest"
        id="interest"
        placeholder="Areas of Interest"
      />
      <label className="realLabels" id="updinterestLable"></label>
    </div>

    <button className="btn-slide" type="submit">
      <p>Register</p>
    </button>
  </div>
  <p></p>
</form>
      ) : null}
  <div className="user-list">
  {dataBase.map((user, index) => (
    <div key={user._id} className="user-card">
      <div className="user-info">
        <div><strong>ID:</strong> <p>{numbers[index]}</p></div>
        <div><strong>First Name:</strong> <p>{user.firstname}</p></div>
        <div><strong>Last Name:</strong> <p>{user.lastname}</p></div>
        <div><strong>Email:</strong> <p>{user.email}</p></div>
        <div><strong>Phone:</strong> <p>{user.phone}</p></div>
        <div><strong>Age:</strong> <p>{user.age}</p></div>
        <div><strong>School:</strong> <p>{user.school || "Not provided"}</p></div>
        <div><strong>Occupation:</strong> <p>{user.occupation || "Not provided"}</p></div>
        <div><strong>Hobbies:</strong> <p>{user.hobbies || "Not provided"}</p></div>
        <div><strong>Heard About Us:</strong> <p>{user.heardAboutUs || "Not provided"}</p></div>
        <div><strong>Interest:</strong> <p>{user.interest || "Not provided"}</p></div>
      </div>
      <div className="user-actions">
        <div onClick={() => deleteUser(user._id)} className="btn">
          <p>Delete</p>
        </div>
        <div
  onClick={() => {
    console.log("user id", user._id);
    setSeeForm(true);  // Show the update form
    setUpdateData({
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
      id: user._id,
    });
  }}
  className="btn"
>
  <p>Update</p>
</div>
      </div>
    </div>
  ))}
</div>
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
