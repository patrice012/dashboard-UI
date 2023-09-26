const CreateUser = (props) => {
    return (
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Create</h3>
  
          <form onSubmit={props.handleSubmit} className="add-user--form" name="userForm">
            <div className="join add-user--fields">
              <input
                className="input input-bordered join-item"
                placeholder="Name"
                name="username"
                required
              />
  
              <input
                className="input input-bordered join-item"
                placeholder="Language"
                name="language"
                required
              />
              <input
                className="input input-bordered join-item"
                placeholder="Occupation"
                name="occupation"
                required

              />
              <input
                className="input input-bordered join-item"
                placeholder="Objective"
                name="objective"
                required

              />
              <input
                className="input input-bordered join-item"
                placeholder="Subscription"
                name="subscription"
                required

              /> 
              <select name="state" className="select select-bordered">
                <option>United State</option>
                <option>France</option>
                <option>Germany</option>
              </select>
              <label className="label">
                <span className="label-text-alt">Select State</span>
              </label>
            </div>
            <button className="btn">Create</button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    );
  }





 

  export default CreateUser;