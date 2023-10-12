import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencil } from "react-icons/hi2";

export const UserDetail = (props) => {
    const id = props.id;

    return (
        <>
            <tr>
                <td>
                    <div className="flex items-center space-x-3">
                        <label>
                            <input
                                defaultChecked
                                // checked={selected}
                                type="checkbox"
                                className="checkbox"
                            />
                        </label>
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img
                                    src={props.profil_img}
                                    alt="profile picture"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="user">
                                <span className="user--name">{props.name}</span>
                                <span>
                                    <img src={props.flag} />
                                </span>
                            </div>
                            <div className="user--email">{props.country}</div>
                        </div>
                    </div>
                </td>
                <td>{props.language}</td>
                <td>{props.occupation}</td>
                <th>{props.objective}</th>
                <th>{props.subscription}</th>
                <th>
                    <div className="row-action">
                        <div>
                            <HiOutlineTrash
                                onClick={() => {
                                    props.handleRemoveClick(id);
                                }}
                            />
                        </div>
                        <div>
                            <HiOutlinePencil
                                onClick={() => props.handleUpdate(id)}
                            />
                        </div>
                    </div>
                </th>
            </tr>
        </>
    );
};
