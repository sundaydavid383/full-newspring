import { useState } from "react";
import "./dataBase.css";
import { data } from "react-router";

const DataBase = ({ setActive, dataBase, setDataBase, onLoad }) => {
  const [seeForm, setSeeForm] = useState(false);
  const [updateData, setUpdateData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    id: 0,
  });

  const handleNameChange = (e) => {
    const name = e.target.name;
    setUpdateData((prev) => ({ ...prev, [name]: e.target.value }));
  };
  setActive("database");
  async function deleteUser(Id) {
    try {
      const response = await fetch("http://localhost:5000/api/people", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Id }),
      });
      const data = await response.json();
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
    const emailRegx =
      /^[A-Za-z0-9%._+-]+@[A-Za-z0-9._\-]+\.[A-Za-z-0-9-.]{2,6}$/;

    if (updateData.firstName.trim() === "") {
      firstname.classList.add("alert");
      firstNameLable.textContent = "input your first name";
      setTimeout(() => {
        firstname.classList.remove("alert");
      }, 2000);

      return;
    } else if (updateData.lastName.trim() === "") {
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
        firstName: "",
        lastName: "",
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
      alert("You have been successfully added to the list!");
      console.log(
        "this are the datas",
        updateData.firstName,
        updateData.email,
        updateData.lastName,
        updateData.phone
      );
      upDatePerson(
        updateData.id,
        updateData.firstName,
        updateData.lastName,
        updateData.email,
        updateData.phone
      );
    }
  };

  const upDatePerson = async (id, firstName, lastName, email, phone) => {
    try {
      const response = await fetch("http://localhost:5000/api/people", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, firstName, lastName, email, phone }),
      });
      const data = await response.json();
      onLoad();
    } catch (error) {
      alert("this error occured", error);
    }
  };

  return (
    <div className="database">
      {console.log("database:", dataBase)}

      {seeForm ? (
        <form onSubmit={onSubmit}>
          <p>{updateData.firstName}</p>
          <p>{updateData.lastName}</p>
          <p>{updateData.email}</p>
          <h2>Register as a member</h2>{" "}
          <div className="inputs">
            <div className="names">
              <div className="input">
                <label htmlFor="">First Name:</label>
                <input
                  onChange={handleNameChange}
                  value={updateData.firstName}
                  type="text"
                  name="firstName"
                  id="firstname"
                />
                <label className="realLabels" id="updfirstNameLable"></label>{" "}
              </div>
              <div className="input">
                <label htmlFor="">Last Name:</label>{" "}
                <input
                  onChange={handleNameChange}
                  value={updateData.lastName}
                  type="text"
                  name="lastName"
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
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td className="lastTD">
                <div onClick={() => deleteUser(user.id)} className="btn">
                  <p>Delete</p>
                </div>
                <div
                  onClick={() => {
                    console.log("user id", user.id);
                    setSeeForm(true);
                    setUpdateData({
                      firstName: user.firstname,
                      lastName: user.lastname,
                      email: user.email,
                      phone: user.phone,
                      id: user.id,
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
    </div>
  );
};

export default DataBase;
