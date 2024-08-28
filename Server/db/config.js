import { connect } from 'mongoose';

//url string to connect to db
const url = "mongodb://127.0.0.1:27017/E-Commerce-Dashboard";

//making connection with database.
connect(url);