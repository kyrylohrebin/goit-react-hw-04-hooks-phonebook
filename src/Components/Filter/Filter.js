const Filter = ({ filter, onChange }) => {
  return (
    <input
      type="text"
      name="filter"
      value={filter}
      onChange={onChange}
      placeholder="Enter name to search"
    />
  );
};

export default Filter;
