import React from "react";
import { Link, useNavigate,NavLink } from "react-router-dom";
import { EmailShareButton, FacebookShareButton,FacebookIcon,LinkedinIcon,LinkedinShareButton,TwitterIcon } from "react-share";
function Footer(){
    return(
        <div>
            <section className="footer mt-5">
    <div className="footer container py-4">
      <div className="row mx-auto">
        <div className="col-lg-3 col-md-6 col-12 ">
          <h3>MAP-CT</h3>
          <p>MAP-CT est une plateforme de cartographie numérique participative et inclusive des collectivités territoriales.</p>

        </div>
        <div className="col-lg-2 col-md-6 col-12 ">
          <h3>Liens utils</h3>
          <ul className="list-item list-unstyled">
            <li><NavLink to='/lieux' className="text-white link-utils" aria-current="page" >Lieux</NavLink></li>
            <li><NavLink to='/apropos' className="text-white link-utils" >A propos</NavLink></li>
            <li><NavLink to='/gallery' className="text-white link-utils">Gallery</NavLink></li>
            <li><NavLink to='/contact' className="text-white link-utils" >Contact</NavLink></li>
            
          </ul>
        </div>
        <div className="col-lg-4 col-md-6 col-12 ">
          <h3>Adresse</h3>
          <p>Saint-louis Avenu des Grands hommes</p>
          <h5>Email</h5>
          <p>contact@geomatica-services.com</p>
          <h5>Téléphone</h5>
          <p>+221 33 961 28 23/778302335</p>

        </div>
        <div className="col-lg-3 col-md-6 col-12 ">
          <h3>Suivez nous</h3>
          <div className="row">
            <div className="col-md-4 col-sm-2 col-2 mb-2 pr-0">
              <a href="https://web.facebook.com/geomaticaforgis"><FacebookIcon size={40}/></a>
              
            </div>
          
            <div className="col-md-4 col-sm-2 col-2 mb-2 pr-0">
            
            <a href="https://www.linkedin.com/company/geomatica-s%C3%A9n%C3%A9gal"><LinkedinIcon size={40}/></a>
           </div>
          
            <div className="col-md-4 col-sm-2 col-2 mb-2 pr-0">
            <a href="https://mobile.twitter.com/geomaticaforgis"><TwitterIcon size={40}/></a>
           </div>
            
            
          </div>

        </div>
      </div>
      </div>
    </section>

        </div>

    )
}
export default Footer;