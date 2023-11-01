import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {

    const [name, setUserName] = useState("");
    const [email, setUserEmail] = useState("");
    const [password, setUserPass] = useState("");
    const [hoverName, setHoverName] = useState(true);
    const [hoverPassword, setHoverPassword] = useState(true);
    const [hoverEmail, setHoverEmail] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate('/');
        }
    }, []);

    // console.log(name, email, password);

    // Define the regular expression pattern for the email format
    const emailPattern = /^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]/;
    const emailInput = (e) => {
        setUserEmail(e.target.value);
        setIsValidEmail(emailPattern.test(e.target.value));
    }

    const collectData = async () => {
        if (name !== "" && email !== "" && password !== "") {
            let result = await fetch("http://localhost:5000/register", {
                method: "post",
                body: JSON.stringify({ name, email, password }),
                headers: { "content-Type": "application/json" }
            });
            result = await result.json();
            console.log(result);
            localStorage.setItem("user", JSON.stringify(result));
            navigate('/');
        }
        else {
            alert("Please fill in the requied details");
        }
    };

    // console.log("hover");
    // console.log(hoverName, hoverEmail, hoverPassword);
    // console.log(name, email, password);

    return (
        <div className="grid justify-center">
            <div className="mt-24  p-5 rounded-xl shadow-lg">
                <h1 className="font-bold text-3xl  mx-28 p-2 font-sans">Register</h1>
                <div className="p-5 flex flex-col">
                    <input type="text" placeholder="Enter Name" className="border-2 border-blue-400 w-80 h-10 rounded-md p-2 my-3"
                        onChange={(e) => { setUserName(e.target.value); }} onClick={() => { setHoverName(true) }} onBlur={() => { setHoverName(false) }}></input>
                    {hoverName === false && name === "" ? (<h1 className="text-red-500">*Enter your name</h1>) : (null)}
                    <input type="email" placeholder="Enter your email adress" className="border-2 border-blue-400 w-80 h-10 rounded-md p-2 my-3"
                        onChange={(e) => { emailInput(e) }} onClick={() => { setHoverEmail(true) }} onBlur={() => { setHoverEmail(false) }}></input>
                    {hoverEmail === false && isValidEmail===false ? (<h1 className="text-red-500">*Enter valid email adress</h1>) : (null)}
                    <input type="password" placeholder="Enter Password" className="border-2 border-blue-400 w-80 h-10 rounded-md p-2 my-3"
                        onChange={(e) => { setUserPass(e.target.value); }} onClick={() => { setHoverPassword(true) }} onBlur={() => { setHoverPassword(false) }}></input>
                    {hoverPassword === false && password === "" ? (<h1 className="text-red-500">*Enter your Password</h1>) : (null)}
                    <button onClick={() => { collectData() }} className="bg-orange-400 p-1 rounded-md hover:bg-green-500 text-white text-lg font-mono">Sign-Up</button>
                </div>
            </div >
        </div>
    )
};

export default Signup;