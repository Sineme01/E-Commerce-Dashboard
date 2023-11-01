import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const Update = () => {
    const prodId = useParams();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [Category, setCategory] = useState("");
    const [brand, seBtrand] = useState("");
    // console.log("update comp");
    // console.log(prodId);

    useEffect(() => {
        getSingleProduct();
    }, []);

    const getSingleProduct = async () => {
        const url = "http://localhost:5000/product/" + prodId?.id;
        let itemToBeUPdated = await fetch(url, {
            method: "get",
        });
        itemToBeUPdated = await itemToBeUPdated.json();
        setName(itemToBeUPdated?.name);
        setPrice(itemToBeUPdated?.price);
        setCategory(itemToBeUPdated?.Category);
        seBtrand(itemToBeUPdated?.brand);
    }

    const updateProduct = async () => {
        if (name !== "" && price !== "" && Category !== "" && brand !== "") {
            const url = "http://localhost:5000/update/" + prodId?.id;
            let result = await fetch(url, {
                method: "put",
                body: JSON.stringify({ name, price, Category, brand }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            result = await result.json();
            console.log(result);
            alert("Product info is updated");
        }
        else {
            alert("Enter all the details of product");
        }
    };

    return (
        <div className="grid justify-center">
            <div className="grid justify-center mt-24 border-2 p-10 rounded-xl">
                <h1 className="text-3xl font-bold ml-10 mb-5">Update Product</h1>
                <input type="text" placeholder="Enter Product Name" onChange={(e) => { setName(e.target.value) }} value={name}
                    className="border-2 border-blue-300 mb-5 w-80 h-10 rounded-md p-2 my-3></input>"></input>
                <input type="text" placeholder="Enter Product Price" onChange={(e) => { setPrice(e.target.value) }} value={price}
                    className="border-2 border-blue-300 mb-5 w-80 h-10 rounded-md p-2 my-3></input>"></input>
                <input type="text" placeholder="Enter Product Category" onChange={(e) => { setCategory(e.target.value) }} value={Category}
                    className="border-2 border-blue-300 mb-5 w-80 h-10 rounded-md p-2 my-3></input>"></input>
                <input type="text" placeholder="Enter Product Brand" onChange={(e) => { seBtrand(e.target.value) }} value={brand}
                    className="border-2 border-blue-300 mb-5 w-80 h-10 rounded-md p-2 my-3></input>"></input>
                <button onClick={() => { updateProduct() }} className="bg-orange-400 p-1 rounded-md hover:bg-green-500 text-white text-lg font-mono">Update Product</button>
            </div>
        </div>

    )
};

export default Update;