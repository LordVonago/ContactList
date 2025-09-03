import classes from "./Home.module.css";
import { handleSubmit, handleContactDelete } from "../Scripts/scripts";
import { useEffect, useState } from "react";

const Home = () => {
  const [ContactList, setContactList] = useState(() => {
    const sessionContactList = sessionStorage.getItem("ContactList");
    return sessionContactList ? JSON.parse(sessionContactList) : [];
  });

  const [errorMsg, setErrorMsg] = useState("");

  return (
    <>
      <div className={classes.mainContainer}>
        <div className={classes.contactCreationContainer}>
          <form
            onSubmit={(e) =>
              handleSubmit(e, ContactList, setContactList, setErrorMsg)
            }
          >
            <div className={classes.inputsGroups}>
              <label htmlFor="input">Name:</label>
              <input type="text" name="label" id="name" />
            </div>
            <div className={classes.inputsGroups}>
              <label htmlFor="input">Number:</label>
              <input type="number" name="phone" id="phone" />
            </div>
            <div className={classes.inputsGroups}>
              <label htmlFor="Select">Color:</label>
              <select name="color" id="select">
                <option value="008000">Green</option>
                <option value="ff0000">Red</option>
                <option value="ffff00">Yellow</option>
                <option value="0000ff">Blue</option>
              </select>
            </div>
            <input type="submit" name="Submit" id="submit" value={"Save"} />
          </form>
        </div>

        <div
          className={classes.errorBox}
          style={{ display: errorMsg ? "flex" : "none" }}
        >
          <p className={classes.errorMsg}>{errorMsg}</p>
        </div>

        <div className={classes.contactCards}>
          <ul>
            {ContactList.length == 0 ? (
              <p style={{ color: "#fff" }}>
                The contacts you entered will appear here.
              </p>
            ) : (
              []
            )}

            {ContactList.map((contact, index) => (
              <li
                key={index}
                style={{ borderTop: `5px solid #${contact.color}` }}
              >
                <p>{contact.label}</p>
                <p>{contact.phone}</p>
                <button
                  id={index}
                  className={classes.removeBtn}
                  onClick={(e) =>
                    handleContactDelete(e, ContactList, setContactList)
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
