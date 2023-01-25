// import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { GlobalStyleComponent } from 'styles/GlobalStyles';

import AddContactForm from './AddContactForm/AddContactForm';
import ContactFilter from './ContactFilter/ContactFilter';
import ContactList from './ContactList/ContactList';
import Section from './Section/Section';
import Notification from './Notification/Notification';
import { Container } from './Container/Container.styled';

export default function App() {
  const contacts = useSelector(state => state.contacts);

  const countTotalContacts = () => {
    return contacts.length;
  };

  return (
    <Container>
      <Section title="Phonebook">
        <AddContactForm />
        <ContactFilter />
      </Section>
      <Section title="Contacts">
        {countTotalContacts() ? (
          <ContactList />
        ) : (
          <Notification message="There is no contacts" />
        )}
      </Section>

      <GlobalStyleComponent />
    </Container>
  );
}
