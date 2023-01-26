import { GlobalStyleComponent } from 'styles/GlobalStyles';

import AddContactForm from './AddContactForm/AddContactForm';
import ContactFilter from './ContactFilter/ContactFilter';
import ContactList from './ContactList/ContactList';
import Section from './Section/Section';
import { Container } from './Container/Container.styled';

export default function App() {
  return (
    <Container>
      <Section title="Phonebook">
        <AddContactForm />
        <ContactFilter />
      </Section>
      <Section title="Contacts">
        <ContactList />
      </Section>

      <GlobalStyleComponent />
    </Container>
  );
}
