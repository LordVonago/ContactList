import classes from "./Home.module.css";
import { handleSubmit } from "../Scripts/scripts";
import { useEffect, useState } from "react";

const Home = () => {
  const [contacts, setContacts] = useState(() => {
    const sessionContacts = sessionStorage.getItem("ContactList");
    return sessionContacts ? JSON.parse(sessionContacts) : [];
  });

  return (
    <>
      <div className={classes.mainContainer}>
        <div className={classes.contactCreationContainer}>
          <form onSubmit={(e) => handleSubmit(e, contacts, setContacts)}>
            <div className={classes.inputsGroups}>
              <label htmlFor="input">Name:</label>
              <input type="text" name="label" id="name" />
            </div>
            <div className={classes.inputsGroups}>
              <label htmlFor="input">Number:</label>
              <input type="number" name="number" id="number" />
            </div>
            <div className={classes.inputsGroups}>
              <label htmlFor="Select">Color:</label>
              <select name="color" id="select">
                <option value="ffffff">White</option>
                <option value="008000">Green</option>
                <option value="ff0000">Red</option>
                <option value="ffff00">Yellow</option>
              </select>
            </div>
            <input type="submit" name="Submit" id="submit" value={"Save"} />
          </form>
        </div>
        <div className={classes.contactCards}>
          <ul>
            {contacts.map((contact, index) => (
              <li
                key={index}
                style={{ borderTop: `2px solid #${contact.color}` }}
              >
                <p>{contact.label} </p>
                <p>{contact.number}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
