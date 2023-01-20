import { useSelector, useDispatch } from 'react-redux';
import Notiflix from 'notiflix';

import styles from './ContactList.module.css';

import { deleteContact } from 'redux/contactsSlice';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const onDeleteContactBtnClick = contactId => {
    const deletedContact = contacts.find(contact => contact.id === contactId);
    Notiflix.Notify.success(`"${deletedContact.name}" successfully deleted`);

    dispatch(deleteContact(contactId));
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <>
      <p className={styles.contact}>Found {filteredContacts.length} contacts</p>
      <ul>
        {filteredContacts.map(({ id, name, number }) => (
          <li className={styles.listItem} key={id}>
            <p className={styles.contact}>{name}:</p>
            <p className={styles.contact}>{number}</p>
            <button
              className={styles.delBtn}
              type="button"
              onClick={() => onDeleteContactBtnClick(id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
export default ContactList;
