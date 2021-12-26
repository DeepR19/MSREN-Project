import React , {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";

import Img from "../../images/logo.png";
import Facebook from "../../images/facebook.png";
import Instagram from "../../images/instagram.png";
import Gmail from "../../images/gmail.png";
import Linkedin from "../../images/OIP.jpg";

// import {UserContext} from "../../App";

import "./Header.css";

const Header =() => {
    // const {state, dispatch} = useContext(UserContext);
    const [userName, setUserName] = useState("");
    const  callHome = async () => {
        try{
            const res = await fetch("/getdata",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                } 
            });

            const data = await res.json();
            setUserName(data.phone);

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }
        }
        catch(e){
            console.log(e)
        }

    }

    useEffect(() => {
        callHome();
    },[userName])

    useEffect(() => {
         let toggler = document.querySelector(".navToggle");
        let sideBar = document.querySelector(".sideBar");
        let header = document.querySelector("header");

        toggler.addEventListener("click",() => {
            toggler.classList.toggle("active");   
            header.classList.toggle("active"); 
            sideBar.classList.toggle("full");
        })
    })
      
    const RenderMenu = () => {
        if(userName){
            return(
                <>
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/contact">ContactUs</NavLink></li>                    
                    <li><NavLink to="/room">RoomUI</NavLink></li>
                    <li><NavLink to="/logout">Logout</NavLink></li>                   
                </>
            )
        }
        else{
            return(
                <>
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/contact">ContactUs</NavLink></li>
                    <li><NavLink to="/">Login</NavLink></li>
                    <li><NavLink to="/register">Register</NavLink></li> 
                </>
            )
        }};
    

    return(
        <>
            <div className="navToggle">
                <span/>  <span/>  <span/>                
            </div>

            <header>
                <ul>
                    <RenderMenu/>
                </ul>
            </header>

            <div className="sideBar">
                <img src={Img} alt="Brand"/>

                <ul className="nav">
                    <RenderMenu/>
                </ul>


                <ul className="sci">
                   
                        <li> <NavLink to="/">
                            <img title="Facebook" src={Facebook} alt="facebook"/>
                        
                        </NavLink></li>

                        <li> <NavLink to="/">
                                <img title="Instagram" src={Instagram} alt="instagram"/>
                            
                        </NavLink></li>

                        <li> <NavLink to="/">
                                <img title="Linkedin" src={Linkedin} alt="linkedin"/>
                            
                        </NavLink></li>

                        <li> <NavLink to="/">
                                <img title="Gmail" src={Gmail} alt="gmail"/>
                        
                        </NavLink> </li>
                </ul>
            </div>
        </>
    )
}
export default Header;