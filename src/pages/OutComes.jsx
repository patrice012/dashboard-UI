const Card = () => {
  return (
    <div className="sell-card">
      <div className="card-image">
        <img src="/src/assets/group.svg" />
      </div>
      {/* <img src="/src/assets/group.svg" /> */}

      <div className="card--text">
        <h4>Total Sales</h4>
        <p>$560k</p>
      </div>
    </div>
  );
};

const OutComes = () => {
  return (
    <section className="">
      <div className="max-container outcomes">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
};

export default OutComes;
