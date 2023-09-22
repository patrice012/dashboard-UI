const ContentAction = () => {
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
          <input type="text" placeholder="Search" className="input" />
          <img src="/src/assets/search.svg" />
        </div>
      </div>
    </section>
  );
};

export default ContentAction;
