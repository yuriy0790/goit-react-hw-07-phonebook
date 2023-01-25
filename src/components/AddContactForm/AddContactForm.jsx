import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notiflix from 'notiflix';

import styles from './AddContactForm.module.css';

import { addContact } from 'redux/contactsSlice';

export default function AddContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(contacts);
    const existingName = contacts.find(
      el => el.name.toLowerCase() === name.toLowerCase()
    );

    const existingNumber = contacts.find(el => el.phone === number);

    if (existingName) {
      Notiflix.Notify.failure(`"${name}" is allready in contact list`);
      return;
    }

    if (existingNumber) {
      Notiflix.Notify.failure(
        `You allready have contact "${existingNumber.name}" with same number "${number}" in contact list`
      );
      return;
    }

    const contact = {
      // id: number,
      name: name,
      phone: number,
    };
    dispatch(addContact(contact));

    Notiflix.Notify.success(
      `"${contact.name}" successfully added to contact list`
    );

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Name:
        <input
          className={styles.input}
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={styles.label}>
        Phone:
        <input
          className={styles.input}
          onChange={handleChange}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={styles.gradientButton}>
        Add contact
      </button>
    </form>
  );
}
