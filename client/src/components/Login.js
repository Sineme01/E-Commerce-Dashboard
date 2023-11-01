import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setUserEmail] = useState("");
    const [password, setUserPass] = useState("");
    const [hoverPassword, setHoverPassword] = useState(true);
    const [hoverEmail, setHoverEmail] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(false);
    // Define the regular expression pattern for the email format
    const emailPattern = /^[a-zA-Z0-9]+@[A-Za-z]+\.[A-Za-z]/;
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate('/');
        }
    }, []);

    const emailInput = (e) => {
        setUserEmail(e.target.value);
        setIsValidEmail(emailPattern.test(e.target.value));
    }

    const dataCollect = async () => {
        if (email !== "" && password !== "") {
            const credential = JSON.stringify({ email, password });
            let data = await fetch("http://localhost:5000/login", {
                method: "post",
                body: credential,
                headers: { "content-Type": "application/json" }
            });
            data = await data.json();
            console.log(data);
            if (data.email !== "Invalid") {
                localStorage.setItem("user", JSON.stringify(data));
                navigate("/");
            }
            else {
                alert("Enter correct login credentials.\nIf you are a new user then Register.");
            }
        }
        else {
            alert("Please enter all the required details");
        }
    }
    // console.log("email validity");
    // console.log(email, isValidEmail);
    return (
        <div className="grid justify-center mt-24">
            <div className="grid justify-center border-2 p-10 rounded-xl">
                <h1 className="text-3xl font-bold ml-24 mb-5">Login</h1>
                <input type="email" onChange={(e) => { emailInput(e) }} placeholder="Enter your email"
                    className="border-2 border-blue-400 w-80 h-10 rounded-md p-2 my-3"
                    onClick={() => { setHoverEmail(true) }} onBlur={() => { setHoverEmail(false) }}></input>
                {hoverEmail === false && isValidEmail === false ? (<h1 className="text-red-500">*Enter valid email adress</h1>) : (null)}
                <input type="password" onChange={(e) => { setUserPass(e.target.value); }} placeholder="Enter your password"
                    className="border-2 border-blue-400 w-80 h-10 rounded-md p-2 my-3"
                    onClick={() => { setHoverPassword(true) }} onBlur={() => { setHoverPassword(false) }}></input>
                {hoverPassword === false && password === "" ? (<h1 className="text-red-500">*Enter your Password</h1>) : (null)}
                <button onClick={() => { dataCollect() }} className="bg-orange-400 p-1 rounded-md hover:bg-green-500 text-white text-lg font-mono">Login</button>
            </div>
        </div>
    )
}

export default Login;