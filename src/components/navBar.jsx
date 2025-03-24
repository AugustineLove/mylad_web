import React from 'react'
import { navLinks } from '../constants/navLinks';
import { NavLink } from "react-router";
import AppButton from './button';


const NavBar = () => {
    return (
    <nav className="bg-white shadow-md flex items-center content-center justify-between h-[100px] text-[#000] fixed w-[100%] z-10 px-[70px]">
        <div>AppName</div>
        <div className="m-[70px flex">
            <ul className="space-x-3 flex items-center">
           {navLinks.map((link)=>(<li key={link.name}><NavLink to={link.path}>{link.name}</NavLink></li>))}
        </ul>
        <div className='pl-[40px]'>
            <a href="/login"><AppButton name="Login"/></a>
        </div>
        </div>
        
    </nav>
    )
}
export default NavBar;