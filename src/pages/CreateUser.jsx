const AddUser = () => {
    return (
      <section className="add-user">
        <div className="add-user__container max-container">
          <form className="add-user--form">
            <div className="join add-user--fields">
              <input
                className="input input-bordered join-item"
                placeholder="Name"
              />
              <input
                className="input input-bordered join-item"
                placeholder="State"
              />

              {/* </div> */}
              {/* <div className="join"> */}
              <input
                className="input input-bordered join-item"
                placeholder="Language"
              />
              <input
                className="input input-bordered join-item"
                placeholder="Occupation"
              />
              <input
                className="input input-bordered join-item"
                placeholder="Objective"
              />
              <input
                className="input input-bordered join-item"
                placeholder="Subscription"
              />
              <div className="form-control w-full max-w-xs">
                <select className="select select-bordered">
                  {/* <option disabled selected>
                    Pick State
                  </option> */}
                  <option>United State</option>
                  <option>France</option>
                  <option>Germany</option>
                </select>
                <label className="label">
                  <span className="label-text-alt">Select State</span>
                  {/* <span className="label-text-alt">Alt label</span> */}
                </label>
              </div>
            </div>
            <button className="btn join-item rounded-r-full">Subscribe</button>
          </form>
        </div>
      </section>
    );
}

export default AddUser