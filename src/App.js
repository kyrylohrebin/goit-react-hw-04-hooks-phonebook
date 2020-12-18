import { useState, useEffect } from 'react';

import ContactForm from './Components/ContactForm/ContactForm';
import ContactList from './Components/ContactList/ContactList';
import Filter from './Components/Filter/Filter';
import styles from './App.module.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  const handleFormSumbit = contact => {
    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const isContactUnique = checkName => {
    return contacts.find(
      ({ name }) => name.toLowerCase() === checkName.toLowerCase(),
    );
  };

  const handleRemoveContact = contactId => {
    setContacts(prevContacts => [
      ...prevContacts.filter(({ id }) => id !== contactId),
    ]);
  };

  const handleFilterChange = event => {
    setFilter(event.currentTarget.value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm
        handleFormSumbit={handleFormSumbit}
        isContactUnique={isContactUnique}
      />

      <h2>Contacts</h2>
      <h3>Find contacts by name</h3>
      <Filter filter={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onRemove={handleRemoveContact} />
    </div>
  );
}

export default App;
