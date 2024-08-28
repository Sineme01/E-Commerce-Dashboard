import './App.css';
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import PrivateComponent from './components/privateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from "./components/ProductList";
import Update from './components/Update';
import Profile from './components/Profile';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        {/* <h1 className="text-green-600 text-3xl font-semibold">E-Dashbaord</h1> */}
        <Nav />
        <div className="flex-1">
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path='/' element={<ProductList />}></Route>
              <Route path='/add' element={<AddProduct />}></Route>
              <Route path='/update/:id' element={<Update />}></Route>
              <Route path='/logout' element={<h1>Logout Component</h1>}></Route>
              <Route path='/Profile' element={<Profile />}></Route>
            </Route>
            <Route path='/Signup' element={<Signup />}></Route>
            <Route path='/login' element={<Login />}></Route>
          </Routes>
        </div>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
