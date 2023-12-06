import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Main} from "./pages/Home/Main";
import Home from "./pages/Home/Home";
import Login from "./pages/signup/Login"; 
import Signup from "./pages/signup/Signup"; 
import { Auction } from "./pages/auction/Auction";
import { Goods } from "./pages/goods/Goods"; 
import { Class } from "./pages/class/Class"; 
import { useState } from "react";

function App() {
  return (
    <>
         <Router>
            <Routes>
            <Route path="/Login" element={<Login/>} >    </Route>   
            <Route element={<Main/>}>
              {/*헤더영역 공통 레이아웃*/}        
              <Route path="/" element={<Home/>} >    </Route>  
         
              <Route path="/Signup" element={<Signup/>} >    </Route>  
              <Route path="/Auction" element={<Auction/>} >    </Route>  
              <Route path="/Class" element={<Class/>} >    </Route>  
              <Route path="/Goods" element={<Goods/>} >    </Route>  
            </Route>
                {/*메인 영역*/}             
                </Routes>
          </Router>
     
    </>
  )
}

export default App;
