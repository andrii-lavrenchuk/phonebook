const Filter = ({ filter, changeFilter }) => (
  <label>
    Search
    <input type="text" name="filter" value={filter} onChange={changeFilter} />
  </label>
);

export default Filter;
