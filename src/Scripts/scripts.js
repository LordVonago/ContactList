export function handleSubmit(e, ContactList, setContactList, setErrorMsg) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formInputs = Object.fromEntries(formData.entries());

  const hasError = formFillingErrorValidator(formInputs);
  if (hasError) {
    setErrorMsg(hasError);
    return;
  } else {
    setErrorMsg(null);
  }

  const hasRepetedValues = duplicatedContactListValidator(
    ContactList,
    formInputs
  );
  if (hasRepetedValues) {
    setErrorMsg(hasRepetedValues);
    return;
  } else {
    setErrorMsg(null);
  }

  const newContactList = [...ContactList, formInputs];
  sessionStorage.setItem("ContactList", JSON.stringify(newContactList));
  setContactList(newContactList);

  e.target.reset();

  return;
}

function formFillingErrorValidator(formInputs) {
  const name = formInputs.label.toLowerCase().trim(" ");
  const phone = formInputs.phone.trim(" ");
  let error = "";

  if (name.length < 3 || name == "") {
    error = "The name must have at least 3 letters";
  } else if (phone.length < 5 || phone == "") {
    error = "The phone must have at least 5 number";
  }
  return error;
}

function duplicatedContactListValidator(ContactList, formInputs) {
  const formLabel = formInputs.label.toLowerCase().trim(" ");
  const formPhone = formInputs.phone.trim(" ");
  let msg = "";

  for (let i = 0; i < ContactList.length; i++) {
    const element = ContactList[i];
    let contactLabel = element.label.toLowerCase().trim(" ");
    let contactPhone = element.phone.trim(" ");

    if (contactLabel == formLabel) {
      msg = "There is already a contact with this name: " + (i + 1);
      break;
    } else if (contactPhone == formPhone) {
      msg = "There is already a contact with this phone: " + (i + 1);
      break;
    }
  }
  return msg;
}

export function handleContactDelete(e, ContactList, setContactList) {
  let ContactListArr = Object.values(ContactList);
  ContactListArr.splice(e.target.id, 1);
  setContactList(ContactListArr);
}
