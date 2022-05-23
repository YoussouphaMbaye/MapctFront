
import React, { useEffect, useState } from "react";
import { Link, useNavigate,NavLink } from "react-router-dom";
import logo from "../imgs/logo.png"

function Header() {
  
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 fixed-top">
        <div className="container">
          <NavLink to='/' className="navbar-brand" href="#">MAP-CT</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <NavLink to='/' className="nav-link" aria-current="page" >Acceuil</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/lieux' className="nav-link" aria-current="page" >Lieux</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/' className="nav-link" >A propos</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/gallery' className="nav-link">Gallery</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/' className="nav-link" >Contact</NavLink>
                </li>
              <li className="nav-item">
                <NavLink to='/' className="nav-link" >
                  <i className="fa fa-search"></i>
                </NavLink>
              </li>
              {/* <li className="nav-item">
                
                <Link to='/'><i className="fa fa-shopping-cart"></i></Link>
                
              </li> */}


            </ul>
          </div>
        </div>
      </nav>
      <div className="my-header px-4 py-3">
       
        <div>
          <Link to='/' type="button" className=" position-relative">
            <i className="fa fa-shopping-cart fa-2x"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              99+
              <span className="visually-hidden">unread messages</span>
            </span>
          </Link>
        </div>
      </div>

    </div>

  )
}
export default Header;



