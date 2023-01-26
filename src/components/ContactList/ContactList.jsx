import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Notiflix from 'notiflix';

import { delContact, fetchContacts } from 'redux/contactsSlice';
import Notification from 'components/Notification/Notification';

import styles from './ContactList.module.css';
import Loader from 'components/Loader/Loader';
// import { deleteContact, requestContacts } from 'redux/contactsSlice';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);
  const filter = useSelector(state => state.filter);

  useEffect(() => {
    dispatch(fetchContacts());
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

  const hasError = error.length > 0;

  return (
    <>
      {hasError && (
        <p>
          Oops, something went wrong... <b>{error}</b>
        </p>
      )}
      {isLoading && <Loader />}
      {!isLoading && !contacts.length ? (
        <Notification message="There is no contacts" />
      ) : (
        <>
          <p className={styles.contact}>
            Found {filteredContacts.length} contacts
          </p>
          <ul>
            {filteredContacts.map(({ id, name, phone }) => (
              <li className={styles.listItem} key={id}>
                <p className={styles.contact}>{name}:</p>
                <p className={styles.contact}>{phone}</p>
                <button
                  className={styles.delBtn}
                  type="button"
                  disabled={isLoading}
                  onClick={() => onDeleteContactBtnClick(id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
export default ContactList;
