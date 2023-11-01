import React from "react";
import { useState } from "react";
const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [Category, setCategory] = useState("");
    const [brand, seBtrand] = useState("");
    // console.log(name);
    const addProduct = async () => {
        if (name !== "" && price !== "" && Category !== "" && brand !== "") {
            const auth = localStorage.getItem("user");
            const userId = JSON.parse(auth)._id;
            // console.log("userID");
            // console.log(userId);
            let productAPI = await fetch("http://localhost:5000/add-product", {
                method: "post",
                body: JSON.stringify({ name, price, Category, brand, userId }),
                headers: {
                    "content-type": "application/json"
                }
            });
            alert("Product is added to the Database");
            // if (name !== "") {
                setName("");
                setPrice("");
                setCategory("");
                seBtrand("");
            // }
        }
        else {
            alert("Enter all the details of product");
        }
    };

    return (
        <div className="grid justify-center">
            <div className="grid justify-center mt-24 border-2 p-10 rounded-xl">
                <h1 className="text-3xl font-bold ml-16 mb-5">Add Product</h1>
                <input type="text" placeholder="Enter Product Name" onChange={(e) => { setName(e.target.value) }} value={name}
                    className="border-2 border-blue-300 mb-5 w-80 h-10 rounded-md p-2 my-3></input>"></input>
                <input type="text" placeholder="Enter Product Price" onChange={(e) => { setPrice(e.target.value) }} value={price}
                    className="border-2 border-blue-300 mb-5 w-80 h-10 rounded-md p-2 my-3></input>"></input>
                <input type="text" placeholder="Enter Product Category" onChange={(e) => { setCategory(e.target.value) }} value={Category}
                    className="border-2 border-blue-300 mb-5 w-80 h-10 rounded-md p-2 my-3></input>"></input>
                <input type="text" placeholder="Enter Product Brand" onChange={(e) => { seBtrand(e.target.value) }} value={brand}
                    className="border-2 border-blue-300 mb-5 w-80 h-10 rounded-md p-2 my-3></input>"></input>
                <button onClick={() => { addProduct() }} className="bg-orange-400 p-1 rounded-md hover:bg-green-500 text-white text-lg font-mono">Add Product</button>
            </div>
        </div>

    )
};
export default AddProduct;