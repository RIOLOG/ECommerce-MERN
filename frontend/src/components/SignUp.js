import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const SignUp = () => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth)
        {
            navigate('/')
        }
    })


    const collectData = async ()=>{
        console.log(name,email,password);
        let result = await fetch('http://localhost:5000/register' ,{
            method:'post',
            body: JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        });
        result = await result.json();
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate('/');
    }



    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
            <input className="inputBox"  type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
            <input className="inputBox"  type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />

            <button onClick={collectData} className="appButton" type="button" >SignUp</button>
        </div>
    )
}

export default SignUp;