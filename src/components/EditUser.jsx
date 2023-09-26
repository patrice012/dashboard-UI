import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchData from "../hooks/fetchData";
import { callEndpoint } from "../../server/endpoint";
import { useParams } from "react-router-dom";

const UpdateUser = (props) => {
  
  let { id } = useParams();

    // const id = state.id
      const [editUser, setEditUser] = useState({});
    //   if(isSuccess) setdata({data}) 


 const handleSaveClick = (e) => {
    e.preventDefault()
    console.log(editUser, 'edited data')
   // Send a request to update the user object on the server
//    updateHistory(id, data);
 };


//    const handleInputChange = (e) => {
//     console.log(e, 'taping in')
//      const { name, value } = e.target;
//      setEditUser((editUser) => ({
//        ...editUser,
//        [name]: value,
//      }));
//    };



  // État local pour les données actuelles (anciennes)
  const [currentUser, setCurrentUser] = useState({});



     // Utilisez useEffect pour mettre à jour les données actuelles lorsque les props changent
  // useEffect(() => {
  //   setCurrentUser({ ...props });
  //   setEditUser({ ...props });
  // }, [props]);




const url = `${callEndpoint}/${id}`



  useEffect(() => {
    console.log('mount component')
    // setEditUser(props)
    fetch(url).then(res => res.json()).then(res => setEditUser(res)).catch(err => console.log(err))
  }, [url])


  console.log(editUser, 'currentuser')
  // console.log(props, 'props')

    return (
<>
      <section>
        <div className="max-content">
        <form  className="add-user--form" name="userForm">
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
        </div>
      </section>
</>
    );
  }

export default UpdateUser;
