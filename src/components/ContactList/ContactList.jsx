import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Notiflix from 'notiflix';

import styles from './ContactList.module.css';
import { delContact, requestContacts } from 'redux/contactsSlice';

// import { deleteContact, requestContacts } from 'redux/contactsSlice';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  // const isLoading = useSelector(state => state.contacts.isLoading);
  // const error = useSelector(state => state.contacts.error);
  const filter = useSelector(state => state.filter);

  useEffect(() => {
    dispatch(requestContacts());
  }, [dispatch]);

  const onDeleteContactBtnClick = contactId => {
    const deletedContact = contacts.find(contact => contact.id === contactId);
    Notiflix.Notify.success(`"${deletedContact.name}" successfully deleted`);

    dispatch(delContact(contactId));
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <>
      <p className={styles.contact}>Found {filteredContacts.length} contacts</p>
      <ul>
        {filteredContacts.map(({ id, name, phone }) => (
          <li className={styles.listItem} key={id}>
            <p className={styles.contact}>{name}:</p>
            <p className={styles.contact}>{phone}</p>
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
