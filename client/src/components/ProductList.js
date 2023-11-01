import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import delete_icon from "./assets/delete_icon.png";
import update_icon from "./assets/update_icon.png";
const ProductList = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products", {
            method: "get"
        });
        // console.log(result);
        result = await result.json();
        setData(result);
    }

    const deleteProduct = async (id) => {
        const url = "http://localhost:5000/delete/" + id;
        let output = await fetch(url, {
            method: "delete"
        });
        // console.log("delting id");
        // console.log(url);
        getProducts();
    };

    const updateProduct = async (id) => {
        const url = "/update/" + id;
        console.log("updating function");
        console.log(id);
        navigate(url);
    };

    // console.log(data);
    var productSerialNum = 1;
    var attributes = { "Name": "name", "₹ Price": "price", "Brand": "brand", "Category": "Category" };
    var props = ["S. No", "Name", "₹ Price", "Brand", "Category", "Update", "Delete"];
    if (data !== null) {
        return (
            <div className="flex justify-center mt-10 ">
                {props.map((item) => {
                    return (
                        <div className="grid">
                            {(item === "S. No") ? (
                                <>
                                    <h1 className="font-bold text-2xl ml-0 border-2 border-blue-500 p-5  text-black ">{item}</h1>
                                    {data.map((prod) => {
                                        return (
                                            <ul className="mt-0 ml-0 border-2 border-blue-500 px-5 py-2 ">
                                                <li className="flex justify-center">{productSerialNum++}</li>
                                                {/* <hr></hr> */}
                                            </ul>
                                        )
                                    })}
                                </>) : (
                                <>
                                    <h1 className="font-bold text-2xl ml-0 border-2 border-blue-500 p-5   text-black ">{item}</h1>
                                    {data.map((prod) => {
                                        return (
                                            <ul className="mt-0 ml-0 border-2 border-blue-500  ">
                                                {(item === "Update") ? (<button onClick={() => { updateProduct(prod?._id) }}><img src={update_icon} className="ml-12 w-7 h-[34px]"></img></button>) : (null)}
                                                {(item === "Delete") ? (<button onClick={() => { deleteProduct(prod?._id) }}><img src={delete_icon} className="ml-9 w-7 h-[34px]"></img></button>) : (null)}
                                                {(item !== "Delete" && item !== "Update") ? (<li className="px-5 py-2 flex justify-center">{prod[attributes[item]]}</li>) : (null)}

                                            </ul>
                                        )
                                    })}
                                </>)}

                        </div>
                    )
                })}
            </div >
        );
    }
};

export default ProductList;