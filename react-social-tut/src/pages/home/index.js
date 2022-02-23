import React from 'react'
import { SignInBtn } from '../../components'
import { CreatePost, Feed, Navbar } from '../../containers'
import "./style.css"

function Home() {
    return (
        <div className="home">           
            <Navbar></Navbar>
            <CreatePost></CreatePost>
            <Feed></Feed>
        </div>
    )
}

export default Home
