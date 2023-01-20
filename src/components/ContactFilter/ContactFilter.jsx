import { useSelector, useDispatch } from 'react-redux';

import styles from './ContactFilter.module.css';

import { filterContacts } from 'redux/filterSlice';

const ContactFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  const changeFilter = event => {
    dispatch(filterContacts(event.currentTarget.value));
  };

  return (
    <label className={styles.label}>
      Find contacts by name:
      <input
        className={styles.input}
        onChange={changeFilter}
        value={filter}
        type="text"
        name="filter"
      />
    </label>
  );
};

export default ContactFilter;
