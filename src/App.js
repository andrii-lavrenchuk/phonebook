import { Component } from "react";
import shorid from "shortid";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";

class App extends Component {
  state = {
    contacts: [
      // { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      // { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      // { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      // { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],

    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  componentWillUnmount() {}

  addContact = ({ name, number }) => {
    const newContact = {
      id: shorid.generate(),
      name,
      number,
    };
    if (
      this.state.contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert("Contact with this name is already exist");
      return;
    }
    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  deleteContact = (contactId) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((contact) => contactId !== contact.id),
    }));
  };

  handleInputChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  changeFilter = (e) => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.addContact(this.state);

    this.setState({
      name: "",
      number: "",
    });
  };

  render() {
    const { filter } = this.state;
    return (
      <div>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.addContact} />
        <Filter filter={filter} changeFilter={this.changeFilter} />
        <h2>Contacts</h2>

        <ContactList
          onDelete={this.deleteContact}
          contacts={this.getVisibleContacts()}
        />
      </div>
    );
  }
}

export default App;
