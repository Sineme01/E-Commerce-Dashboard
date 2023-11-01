const express = require('express');
const cors = require('cors');
//to connect db
require('./db/config');

//Loading Collections
const User = require('./db/users');
const Product = require('./db/products');
const { default: mongoose } = require('mongoose');


const app = express();
app.use(express.json());
app.use(cors());//to handle cors error.

//register api
app.post("/register", async (req, resp) => {
    console.log("Sever listening.........");
    console.log(req.body);
    let userData = new User(req.body);
    let result = await userData.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
});

//login api
app.post("/login", async (req, resp) => {
    const data = req.body;
    console.log("server login listening.........");
    console.log(data);
    if (data.email && data.password) {
        let result = await User.findOne(data);

        if (result !== null) {
            result = result.toObject();
            delete result.password;
            resp.send(result);
        }
        else {
            resp.send({ "email": "Invalid" });
        }

    }
});

//add product api
app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);
    console.log(req.body);
    let result = await product.save();
    resp.send(result);
});

//product list api
app.get("/products", async (req, resp) => {
    let prodcuts = await Product.find();
    if (prodcuts.length > 0) {
        resp.send(prodcuts);
    }
    else {
        resp.send({ result: "No Prodcuts found" });
    }
});

//deleting api

app.delete("/delete/:id", async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
});


//Findone API
app.get("/product/:id", async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result)
        resp.send(result);
    else
        resp.send({ result: "No record found" });
});

//Updating API

app.put("/update/:id", async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    if (result)
        resp.send(result);
    else
        resp.send({ result: "Not Found" })
});

app.listen(5000);

