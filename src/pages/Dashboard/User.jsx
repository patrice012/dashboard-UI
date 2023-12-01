import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencil } from "react-icons/hi2";

export const UserDetail = (props) => {
    const { _id:id } = props;
    const {
        profil_img,
        flag,
        name,
        country,
        language,
        occupation,
        objective,
        subscription,
        index,
    } = props;
    const { handleRemoveClick, handleUpdate, handleSelecte } = props;
    const { selected } = JSON.parse(sessionStorage.getItem("selection")).filter(ele => ele.id == id);

    return (
        <>
            <tr>
                <td>
                    <div className="flex items-center space-x-3">
                        <label>
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={selected}
                                onChange={() => {
                                    handleSelecte(index);
                                }}
                            />
                        </label>
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={profil_img} alt="profile picture" />
                            </div>
                        </div>
                        <div>
                            <div className="user">
                                <span className="user--name">{name}</span>
                                <span>
                                    <img src={flag} />
                                </span>
                            </div>
                            <div className="user--email">{country}</div>
                        </div>
                    </div>
                </td>
                <td>{language}</td>
                <td>{occupation}</td>
                <th>{objective}</th>
                <th>{subscription}</th>
                <th>
                    <div className="row-action">
                        <div>
                            <HiOutlineTrash
                                onClick={() => {
                                    handleRemoveClick(id);
                                }}
                            />
                        </div>
                        <div>
                            <HiOutlinePencil onClick={() => handleUpdate(id)} />
                        </div>
                    </div>
                </th>
            </tr>
        </>
    );
};
