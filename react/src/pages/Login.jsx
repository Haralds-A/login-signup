import { Link} from "react-router-dom"
import { useStateContext } from "../context/ContextProvider";
import { useRef } from "react"
import { useState } from "react";
import axiosClient from "../axios-client";

export default function Login(){
    const emailReff = useRef();
    const passwordReff = useRef();
    const {setUser, setToken} = useStateContext();
    const [errors,setErrors]= useState(null)

    const onSubmit = (ev) =>{
        ev.preventDefault()
        const payload = {
            email: emailReff.current.value,
            password: passwordReff.current.value
        }
        setErrors(null);
        axiosClient.post('/login', payload)
            .then(({data}) =>{
            setUser(data.user)            
            setToken(data.token)         
        }).catch(err =>{      
            console.log(err)
            const response = err.response;
            if(response && response.status === 422){
                if(response.data.errors){
                    setErrors(response.data.errors);
                }else{
                    setErrors({
                        email: [response.data.message]
                    });
                }
                
            }
        })
    }
     return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login in to your account</h1>
                    <input ref={emailReff} type="email" placeholder="Email" />
                    <input ref={passwordReff} type="password" placeholder="Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">Not Registered? <Link to="/signup">Create an account</Link></p>
                </form>
            </div>
        </div>
    )
}