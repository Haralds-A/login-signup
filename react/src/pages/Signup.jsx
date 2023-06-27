import axios from "axios";
import { useState } from "react";
import { useRef } from "react"
import { Link} from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

export default function Signup(){
    const nameReff = useRef();
    const emailReff = useRef();
    const passwordReff = useRef();
    const passwordConfirmReff = useRef();
    const [errors,setErrors]= useState(null)
    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev) =>{
        ev.preventDefault();
        const payload = {
            name: nameReff.current.value,
            email: emailReff.current.value,
            password: passwordReff.current.value,
            password_confirmation: passwordConfirmReff.current.value
        }
        axiosClient.post('/signup', payload)
            .then(({data}) =>{
            setUser(data.user)            
            setToken(data.token)    
            console.log(data.token)        
        }).catch(err =>{      
            const response = err.response;
            if(response && response.status === 422){
                console.log(response.data.errors);
                setErrors(response.data.errors);
            }
        })
    }
    return(        
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Signup</h1>
                    {errors && <div className="alert">
                        {Object.keys(errors).map(key =>[
                            <p key={key}>{errors[key][0]}</p>
                        ])}
                        </div>}
                    <input ref={nameReff} placeholder="Full Name" />
                    <input ref={emailReff} type="email" placeholder="Email" />
                    <input ref={passwordReff} type="password" placeholder="Password" />
                    <input ref={passwordConfirmReff} type="password" placeholder="Confirm Password" />
                    <button className="btn btn-block">Signup</button>
                    <p className="message">Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </div>
    )
}