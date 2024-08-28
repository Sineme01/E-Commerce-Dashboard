import express, { json } from 'express';
import cors from 'cors';
//to connect db
import './db/config';

//Loading Collections
import User, { findOne } from './db/users';
import Product, { find, deleteOne, findOne as _findOne, updateOne } from './db/products';
import { default as mongoose } from 'mongoose';

import { sign } from 'jsonwebtoken';
const jwtKey = 'e-comm'; //Keep this key secret otherwise anyone can generate webTokens from this.

const app = express();
app.use(json());
app.use(cors());//to handle cors error.

//register api
app.post("/register", async (req, resp) => {
    console.log("Sever listening.........");
    console.log(req.body);
    let userData = new User(req.body);
    let user = await userData.save();
    user = user.toObject();
    delete user.password;
    sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send({ result: "Something went wrong" });
        }
        else {
            resp.send({ user, auth: token });
        }
    })
    // console.log("hue");
});

//login api
app.post("/login", async (req, resp) => {
    const data = req.body;
    console.log("server login listening.........");
    console.log(data);
    if (data.email && data.password) {
        let user = await findOne(data);

        if (user !== null) {
            user = user.toObject();
            delete user.password;
            sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "Something went wrong" });
                }
                else {
                    resp.send({ user, auth: token });
                }

            })
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
    let prodcuts = await find();
    if (prodcuts.length > 0) {
        resp.send(prodcuts);
    }
    else {
        resp.send({ result: "No Prodcuts found" });
    }
});

//deleting api

app.delete("/delete/:id", async (req, resp) => {
    const result = await deleteOne({ _id: req.params.id });
    resp.send(result);
});


//Findone API
app.get("/product/:id", async (req, resp) => {
    let result = await _findOne({ _id: req.params.id });
    if (result)
        resp.send(result);
    else
        resp.send({ result: "No record found" });
});

//Updating API

app.put("/update/:id", async (req, resp) => {
    let result = await updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    if (result)
        resp.send(result);
    else
        resp.send({ result: "Not Found" })
});
//This is a middleware function that is being created to verify JWT tokens and then giving access to APIs.
function verifyToken(req, resp, next) {
    let token = req.headers['authorization'];
    console.log("middleware called.....", token);
    next();
}


app.listen(5000);

