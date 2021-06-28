const ContactList = ({ contacts, onDelete }) =>
  contacts.map(({ id, name, number }) => (
    <li key={id}>
      {name}:{number}
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  ));

export default ContactList;
