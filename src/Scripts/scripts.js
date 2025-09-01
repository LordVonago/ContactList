export function handleSubmit(e, contacts, setContacts) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formInputs = Object.fromEntries(formData.entries());
  const newContactList = [...contacts, formInputs];
  console.log(newContactList);

  sessionStorage.setItem("ContactList", JSON.stringify(newContactList));
  setContacts(newContactList);
  return;
}
