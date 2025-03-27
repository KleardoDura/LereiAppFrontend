import PropType from "prop-types";

const SortBy = ({ onSortHandler }) => {
  return (
    <select
      defaultValue="default"
      onChange={(event) => onSortHandler(event.target.value)}
    >
      <option value="default">Sipas më të rejave</option>
      <option value="nameA2Z">Sipas emrit (A-Z)</option>
      <option value="nameZ2A">Sipas emrit (Z-A)</option>
      <option value="priceLow2High">
        Sipas çmimit: nga i ulëti te i larti
      </option>
      <option value="priceHigh2Low">
        Sipas çmimit: nga i larti te i ulëti
      </option>
    </select>
  );
};

SortBy.propTypes = {
  onSortHandler: PropType.func.isRequired,
};

export default SortBy;
