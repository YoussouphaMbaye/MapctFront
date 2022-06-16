import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import axios from 'axios';
import Comments from "../composants/comments";

import { MapContainer, GeoJSON, TileLayer, Marker, Popup, useMapEvents, LayersControl, } from 'react-leaflet'
function Details() {
    const mapStye = {
        width: '100%',
        height: '60vh'

    }
    const idParam = useParams('id');
    const baseURL = "http://127.0.0.1:8000/api";
    const [lieu, setLieux] = useState(null);
    const [lesLieux,setLesLieux]=useState([]);
    const [lieuDuType, setLieuxDuType] = useState([]);
    const [listType, setlistType] = useState(new Set([]));
    const [listSecteur, setListSecteur] = useState(new Set([]));
    const getLieux = async () => {

        const response = await axios.get(baseURL + "/lieux/" + idParam.id + "/").catch((err) => {
            console.log(err);
        }
        );
        setLieux(response.data);
        console.log('-------------'+response.data.type)
        //donnee du type
        if (response.data) {
            const response2 = await axios.get(baseURL + "/lieux/?id=&nom=&secteur=&departement=&region=&type="+response.data.type).catch((err) => {
                console.log(err);
            }
            );
            console.log('hier hier hier')
            setLieuxDuType(response2.data.results);
            console.log(response2.data)
        }
    }
    const listToSet = async (data) => {
        if (data.length > 0) {
            let mlist_type = [];
            let mlist_sec = [];
            for (const l in data) {
                mlist_type.push(data[l].type);
                mlist_sec.push(data[l].secteur);
                console.log("YYYYYYYY")
                console.log(mlist_sec)
                

            }
           
            setlistType(new Set(mlist_type))
            setListSecteur(new Set(mlist_sec))

            

        }
    }
    const getLesLieux = async () => {
        const response = await axios.get(baseURL + "/lieux/").catch((err) => {
            console.log(err);
        }
        );
        setLesLieux(response.data.results);
        listToSet(response.data.results);
        
        console.log(response.data);
        listToSet(response.data);
    }
    useEffect(() => {
        getLieux();
        getLesLieux();
    }, [])

    return (

        <div className="container-fluid pt-5 mt-2">
            {(lieu != null) ?
                <div className="row mx-auto">
                    <div className="col-md-7">

                        <div className="imp-content ">
                            <img src={lieu.photos} width='' alt='...' />
                        </div>
                        <div className="pt-2">
                            <h5 className="mb-0">{lieu.nom}</h5>
                            <hr className="hr mt-1" />
                        </div>
                        <div className="lieux-desc pt-1">
                            <p>
                                {lieu.description}
                            </p>
                        </div>
                        <Comments lieux={lieu} />
                    </div>

                    <div className="col-md-4">
                        <div className="search-blog mb-2">
                            <form>
                                <label className="sr-only" for="inlineFormInputGroupUsername2">Username</label>
                                <div className="input-group mb-2 mr-sm-2">

                                    <div class="input-group mb-3 rech">
                                        <input type="text" class="form-control" placeholder="rechercher" aria-label="Username" />
                                        <span class="input-group-text"><i className="fa fa-search"></i></span>
                                    </div>

                                </div>
                            </form>
                        </div>
                        <div className="petit-map mb-3">
                            <MapContainer center={[lieu.latitude, lieu.longitude]} zoom={13} style={mapStye}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[lieu.latitude, lieu.longitude]} >
                                    <Popup>
                                        <h4>{lieu.nom}</h4>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                        <div className="blog-category mb-3">
                            <h6 className="text-uppercase font-weight-bold mb-1">Types de lieux</h6>
                            <ul class="list-group list-group-flush">
                            {(listSecteur.size > 0) ?
                            (Array.from(listType).map((s, i) => {

                                console.log(s)
                                return <li class="list-group-item d-flex justify-content-between align-items-center px-0  py-2">
                                    <Link to={"/lieux/secteur/" + s} style={{ textDecoration: 'none',color:'black' }}>
                                                {s}
                                                
                                        </Link>
                                        <span class=""><i class="fa fa-angle-right" aria-hidden="true"></i></span>
                                        </li>
                            }))
                            : ""}
                                
                            </ul>
                        </div>
                        <div className="recent-blog ">
                            <h6 className="text-uppercase font-weight-bold ">Autres lieux</h6>
                            {lieuDuType.length>0 ? lieuDuType.map((l) => {
                                return <Link to={"/detais/"+l.id} style={{ textDecoration: 'none',color:'black' }}><div class="d-flex mb-2">
                                            <div class="flex-shrink-0">
                                                <img src={l.photos} alt="..." className="small-img"/>
                                            </div>
                                            <div class="flex-grow-1 ms-3 text-media">
                                                <h5>{l.nom}</h5>
                                                <p>{(l.description!=null)?l.description.substring(0,65):""}...</p>
                                            </div>
                                        </div></Link>
                            }) : ""
                            }

                        </div>
                        <div className="tags pt-3">
                            <h6 className="text-uppercase font-weight-bold">Secteurs d'activité</h6>
                            {(listSecteur.size > 0) ?
                            (Array.from(listSecteur).map((s, i) => {

                                console.log(s)
                                return <Link to={"/lieux/"+s+"/type"}  style={{marginRight:'20px',background: 'coral',opacity:'0.7'}} className="btn btn-light mb-2 mr-2" key={i}>{s}</Link>
                            }))
                            : ""}
                            
                        </div>
                    </div>

                </div>
                : ""}
        </div>


    )
}
export default Details;