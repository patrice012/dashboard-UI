import { useState } from "react";
import { useHistory } from "../hooks/history-hooks";

const ContentAction = () => {
  const [input, setInput] = useState("");
  const { filterHistory } = useHistory();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSumit = (e) => {
    e.preventDefault();
    filterHistory(input);
    // reset the input field
    e.target.reset()
  };


  return (
    <section className="action ">
      <div className="max-container">
        <div className="action--buttons">
          <button className="btn filter">
            <img src="/src/assets/Filters-lines.svg" />
            <span>Filters</span>
          </button>
          <button className="btn add-user">
            <img src="/src/assets/plus.svg" />
            <span>Add User</span>
          </button>
          <span>1 row selected</span>
        </div>
        <div className="form-control action--search">
          {/* <input type="text" placeholder="Search" className="input" /> */}
          <form onSubmit={(e) => handleSumit(e)}>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Search"
              className="input"
            />
          </form>
          <img src="/src/assets/search.svg" />
        </div>
      </div>
    </section>
  );
};

export default ContentAction;
