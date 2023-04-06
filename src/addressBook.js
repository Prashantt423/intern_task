import React, { useState } from "react";
import "./addressBook.css";
import { v4 } from "uuid";
function AddressBook() {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [editName, setEditName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [newMobile, setNewMobile] = useState("");
  const [editMobile, setEditMobile] = useState("");
  const [filterText, setFilterText] = useState("");
  const [editId, setEditId] = useState("");

  const addContact = () => {
    const newContact = { name: newName, mobile: newMobile, id: v4() };
    const duplicateMobile = contacts.find(
      (contact) => contact.mobile === newMobile
    );
    if (!duplicateMobile) {
      const temp = [...contacts, newContact];
      temp.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      setContacts(temp);
      setNewName("");
      setNewMobile("");
    } else {
      alert("Mobile number already exists!");
    }
  };
  const addEditContact = () => {
    if (editMobile == "" || editName === "") {
      alert("Name or mobile can't be empty");
      return;
    }
    const duplicateMobile = contacts.find(
      (contact) => contact.mobile === (editMobile && contact.id != editId)
    );
    console.log(editMobile);
    if (!duplicateMobile) {
      contacts.forEach((e) => {
        if (e.id === editId) {
          e.name = editName;
          e.mobile = editMobile;
        }
      });
      setContacts([...contacts]);
      setIsOpen(false);
      setEditMobile("");
      setEditName("");
      setEditId("");
    } else {
      alert("Mobile number already exists!");
    }
  };

  // Function to delete a contact
  const deleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts([...updatedContacts]);
  };

  // Function to filter contacts by name or mobile number
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(filterText.toLowerCase()) ||
      contact.mobile.includes(filterText)
  );

  return (
    <div className="box">
      <h1>Address Book Manager</h1>
      <div className="formElement">
        <label htmlFor="name">Name:</label>
        <input
          className="form-input"
          type="text"
          id="name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div className="formElement">
        <label htmlFor="mobile">Mobile:</label>
        <input
          className="form-input"
          type="text"
          id="mobile"
          value={newMobile}
          onChange={(e) => setNewMobile(e.target.value)}
        />
      </div>
      <button className="primaryButton" onClick={addContact}>
        Add Contact
      </button>
      <div className="formElement">
        <label htmlFor="filter">Filter:</label>
        <input
          className="form-input"
          type="text"
          id="filter"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.mobile}</td>
              <td>
                <button
                  className="primaryButton"
                  onClick={() => {
                    setEditId(contact.id);
                    setIsOpen(true);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="primaryButton"
                  onClick={() => deleteContact(contact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="modal" style={{ display: isOpen ? "flex" : "none" }}>
        <div className="editForm">
          <a
            href="#"
            class="close"
            onClick={() => {
              setIsOpen(false);
              setEditMobile("");
              setEditName("");
              setEditId("");
            }}
          ></a>
          <div className="formElement">
            <label htmlFor="name">Name:</label>
            <input
              className="form-input"
              type="text"
              id="name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>
          <div className="formElement">
            <label htmlFor="mobile">Mobile:</label>
            <input
              className="form-input"
              type="text"
              id="mobile"
              value={editMobile}
              onChange={(e) => setEditMobile(e.target.value)}
            />
          </div>
          <button className="primaryButton" onClick={addEditContact}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddressBook;
