import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      getUsers();
    }, []);
  
    const getUsers = () => {
      setLoading(true);
      axiosClient.get('/users').then(({ data }) => {
          setLoading(false);
          setUsers(data.data); // Update the users state with the received data
          console.log(data);
        })
        .catch(() => {
          setLoading(false);
        });
    };
    const onDelete = (user) =>{
        if(!window.confirm("Do you realy want to delete?")){
            return;
        }
        axiosClient.delete(`/users/${user.id}`).then(() =>{
            getUsers();
        })
    }
  
    return(
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', allignItems:'center'}}>
                <h1>Users</h1>
                <Link to="/users/new" className="btn-add">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created_at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">Loading...</td>
                        </tr>
                    </tbody>
                    }
                    {!loading && <tbody>
                        {users.map(u =>(
                            <tr>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.created_at}</td>
                                <td>
                                    <Link className="btn-edit" to={'/users/'+u.id}>Edit</Link>
                                    &nbsp;
                                    <Link onClick={ev => onDelete(u)} className="btn-delete">Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>}
                </table>
            </div>
        </div>
    )
  }