import React, { useContext, useState } from 'react';
import { SignInBtn } from '../../components';
import { UserContext } from '../../contexts/user';
import "./style.css";

export default function Navbar() {

    const [user, setUser] = useContext(UserContext).user ;

    return (

        <div className="navbar">
        <p>React Social</p>

        {user ? <img className="navbar_img" src = {user.photoURL} />: <SignInBtn></SignInBtn>}
            
        </div>
    );
}
