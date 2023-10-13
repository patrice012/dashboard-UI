const salesData = [
    {
        imgUrl: "/src/assets/group.svg",
        price: "$560k",
    },
    {
        imgUrl: "/src/assets/group.svg",
        price: "$560k",
    },
    {
        imgUrl: "/src/assets/group.svg",
        price: "$560k",
    },
];



const Card = ({ imgUrl, price }) => {
  return (
    <div className="sell-card">
      <div className="card-image">
        <img src={imgUrl} />
      </div>
      <div className="card--text">
        <h4>Total Sales</h4>
        <p>{ price}</p>
      </div>
    </div>
  );
};

const OutComes = () => {
  return (
    <section className="">
      <div className="max-container outcomes">
        {salesData.map((data, index) => <Card key={index} {...data} />)}
      </div>
    </section>
  );
};

export default OutComes;
