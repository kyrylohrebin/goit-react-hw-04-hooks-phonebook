import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import styles from './ContactForm.module.css';

function ContactForm({ handleFormSumbit, isContactUnique }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleFormChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const nameUnique = isContactUnique(name);

    if (nameUnique) {
      alert(`${name} is already exist`);
    } else {
      const contactAdd = { id: uuid(), name, number };
      handleFormSumbit(contactAdd);
    }

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        name="name"
        placeholder="Enter name"
        value={name}
        onChange={handleFormChange}
      />
      <input
        className={styles.input}
        type="tel"
        name="number"
        placeholder="Enter phone number"
        value={number}
        onChange={handleFormChange}
      />
      <button className={styles.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

export default ContactForm;
