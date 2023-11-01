import React from "react";
import Avatar from "./assets/Avatar.png";
const Profile = () => {
    let auth = localStorage.getItem("user");
    auth = JSON.parse(auth);
    return (
        <div className="grid justify-center mt-24 ">
            <div className="grid justify-center border-2 rounded-xl shadow-xl p-10">
                <div className="flex justify-center">
                    <img src={Avatar} className="w-20 h-20 border-2 rounded-full border-black"></img>
                </div>
                <div className="flex justify-center">
                    <h1 className="font-semibold text-3xl font-mono mt-5 bg-orange-500 p-3 rounded-xl text-white">{auth?.name}</h1>
                </div>
                <div className="flex justify-center mt-4 bg-orange-500 p-1 rounded-xl text-white font-mono">
                    <h1 >Email id :  {auth?.email}</h1>
                </div>
                <div className="flex justify-center mt-1 bg-orange-500 p-1 rounded-xl text-white font-mono">
                    <h1 className="">User id:  {auth?._id}</h1>
                </div>
            </div>
        </div>
    );
};

export default Profile;