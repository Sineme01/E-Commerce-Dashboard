import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
const Nav = () => {
    let auth = localStorage.getItem("user");
    // console.log("auth");
    // console.log(auth);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear("user");
        console.log("Logout successfully executed");
        navigate("/");
    }
    console.log("auth sdfasddddddddddddddddd");
    console.log(auth);

    if (auth !== undefined) { console.log("hue -> ",auth);auth = JSON.parse(auth); } //
    return (
        <div className="border-2 rounded-xl shadow-md">
            <ul className="bg-white">

                {
                    auth === null ?
                        <>
                            <div className="flex justify-end ">
                                <div className="flex flex-wrap">
                                    <li className="py-2 px-3 rounded-lg bg-purple-500 m-2 font-serif text-white mx-5 hover:bg-green-500"><Link to="/login">Login</Link></li>
                                    <li className="py-2 px-3 rounded-lg bg-purple-500 my-2 font-serif text-white mx-1 hover:bg-green-500"><Link to="/Signup">Sign-Up</Link></li>
                                </div>
                            </div>
                        </> :
                        <>
                            <div className="flex justify-between">
                                <a href="/"><img src={logo} className="w-12 h-12 ml-5"></img></a>
                                <div className="flex flex-wrap">
                                    <li className="py-2 px-3 rounded-lg bg-purple-500 my-2 font-serif text-white mx-1 hover:bg-green-500"><Link to="/">Products</Link></li>
                                    <li className="py-2 px-3 rounded-lg bg-purple-500 my-2 font-serif text-white mx-1 hover:bg-green-500"><Link to="/add">Add Product</Link></li>
                                    {/* <li className="py-2 px-3 rounded-lg bg-purple-500 my-2 font-serif text-white mx-1 hover:bg-green-500"><Link to="/update">Update Product</Link></li> */}
                                    <li className="py-2 px-3 rounded-lg bg-purple-500 my-2 font-serif text-white mx-1 hover:bg-green-500"><Link to="/profile">{auth.name}</Link></li>
                                    <li className="py-2 px-3 rounded-lg bg-purple-500 my-2 font-serif text-white mx-1 hover:bg-green-500"><Link to="/login" onClick={logout}>Logout</Link></li>
                                </div>
                            </div>
                        </>
                }

            </ul>
        </div>
    )
};

export default Nav;