import React, { useEffect, useState } from "react";
import Carousel from "../composants/carousel";
import MyMap from "../composants/map";
import { Link } from "react-router-dom";
import axios from 'axios';
function Home() {
    
    return (
        <div >
            <Carousel/>
            <section id="section1" className="container-fluid pt-5 mt-5">
                <div className="row mx-auto">
                    <div className="col-lg-4 col-md-12 col-12 my-card text-center">
                    
                        <div className="details">
                        <i className="fa fa-bullhorn fa-5x color-orange" aria-hidden="true"></i>
                            <h5>C'est quoi MAP-CT</h5>
                            <hr className="w-25 mx-auto"/>
                            <p>
                            MAP-CT est une plateforme de cartographie numérique participative et inclusive des collectivités territoriales. Développée par GEOMATICA, MAP-CT se veut un cadre de production, de partage et de valorisation des données pour un meilleur impact dans le développement des collectivités territoriales.
                            </p>
                            <Link to={'/'} className="mx-auto color-orange" >Lire plus</Link>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-12 my-card text-center">
                       
                        <div className="details">
                        <i className="fa fa-bullseye fa-5x color-orange" aria-hidden="true"></i>
                            <h5>Contexte</h5>
                            <p>
                            L’Acte III de la décentralisation est une des réformes
                             phares proposée par le Gouvernement pour la réduction 
                             des inégalités sociales. La territorialisation des 
                             politiques publiques constitue un aspect important de
                              cette réforme en attendant 
                            la mise en place des pôles territoires dans un avenir proche.
                            </p>
                            <Link to={'/'} className="mx-auto color-orange" >Lire plus</Link>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-12 my-card text-center">
                        
                        <div className="details">
                        <i className="fa fa-eye fa-5x color-orange" aria-hidden="true"></i>
                            <h5>Objectif</h5>
                            <p>
                            Cartographie exhaustive des collectivités territoriales dans une démarche participative et inclusive.
                            mpliquer toutes les forces vives dans tout le processus d’élaboration de la cartographie numérique.
                            </p>
                            <Link to={'/'} className="mx-auto color-orange" >Lire plus</Link>
                        </div>
                    </div>
                </div>
                
            </section>
            <div className="container-fluid pt-5">
                <MyMap/>
            </div>
        </div>
    )
}
export default Home;