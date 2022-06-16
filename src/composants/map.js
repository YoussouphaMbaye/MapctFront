import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import communeSen from "./../data/communeSen.json";
import limDistrict from "./../data/limDistrict.json";
import { MapContainer, GeoJSON, TileLayer, Marker, Popup, useMapEvents, LayersControl, } from 'react-leaflet'
//import mapData from "./data/contries.json";
// import MeasureControl from 'react-leaflet-measure';
// const measureOptions = {
//   position: 'topright',
//   primaryLengthUnit: 'meters',
//   secondaryLengthUnit: 'kilometers',
//   primaryAreaUnit: 'sqmeters',
//   secondaryAreaUnit: 'acres',
//   activeColor: '#db4a29',
//   completedColor: '#9b2d14'
// };
function LocationMarker() {
    const [position, setPosition] = useState(null);
    
    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}
function MyMap() {
    const mapStye={
        width: '100%',
        height: '100vh'
        
      }
    const baseURL = 'http://127.0.0.1:8000/api/';
    const [lieux, setLieux] = useState([]);
    const [nbcst_sante, setnbcst_sante] = useState(0);
    const [onbType, setonbType] = useState(null);
    const [listType, setlistType] = useState(new Set([]));
    const [listTypeNoSet, setlistTypeNoSet] = useState([]);
    const [listSecteur, setListSecteur] = useState(new Set([]));
    const [listDep, setListDep] = useState(new Set([]));
    const [listCommune, setListCommune] = useState(new Set([]));
    const [listRegion, setListRegion] = useState(new Set([]));
    const [secteur, setSecteur] = useState('');
    const [region, setRegion] = useState('');
    const [departement, setDepartement] = useState('');
    const [commune, setCommune] = useState('');

    const typeNb=(listTypeNoSetf,listTypef)=>{
        let nbType={};
        console.log('hhhhhhnnnnnnnnnnnnnhhhhhh');
        for (let tn of listTypeNoSetf){
            console.log('jjjj'+tn)
        for (let t of Array.from(listTypef)){
            if (tn==t){
                console.log(t);
                if(nbType[t]==null){
                    nbType[t]=0
                }
                nbType[t]=nbType[t]+1;
            }
            


        }
        
    }
        setonbType(nbType);
        console.log(nbType);
    }
    //list et quantité par secteur
    const listToSet = async (data) => {
        if (data.length > 0) {
            let st_sante = 0;
            let mlist_type = [];
            let mlist_dep = [];
            let mlist_com = [];
            let mlist_reg = [];
            let mlist_sec = [];
            for (const l in data) {
                mlist_type.push(data[l].type);
                mlist_dep.push(data[l].departement);
                mlist_com.push(data[l].commune);
                mlist_reg.push(data[l].region);
                mlist_sec.push(data[l].secteur);
                console.log("YYYYYYYY")
                console.log(mlist_sec)
                if (data[l].type === 'Structure de santé') {
                    st_sante += 1;
                }

            }
            setnbcst_sante(st_sante);
            console.log(mlist_type)
            setlistType(new Set(mlist_type))
            setlistTypeNoSet(mlist_type);
            setListDep(new Set(mlist_dep))
            setListCommune(new Set(mlist_com))
            setListRegion(new Set(mlist_reg))
            setListSecteur(new Set(mlist_sec))
            typeNb(mlist_type,new Set(mlist_type));

        }
    }
    
    const regChange = (reg) => {
        setRegion(reg);
        getLieuxWithFilter(secteur, departement, reg)
    }
    const depChange = (dep) => {
        setDepartement(dep);
        getLieuxWithFilter(secteur, dep, region)
    }
    const secChange = (sec) => {
        setSecteur(sec);
        getLieuxWithFilter(sec, departement, region)
    }
    const getLieuxWithFilter = async (secteur, dep, reg) => {

        const response = await axios.get(baseURL + "lieux/?secteur=" + secteur + "&departement=" + dep + "&region=" + reg).catch((err) => {
            console.log(err);
        }

        );
        setLieux(response.data.results)
        listToSet(response.data.results);
        
    }
    const getLieux = async () => {

        const response = await axios.get(baseURL + "lieux/").catch((err) => {
            console.log(err);
        }

        );
        setLieux(response.data.results);

        listToSet(response.data.results);
        

        console.log(lieux)
        console.log(response.data)
        console.log(listType)
    }
    useEffect(() => {
        getLieux();
        //typeNb();
        console.log(communeSen);
    }, [])
    const countryStyle = {
        fillColor: "red",
        fillOpacity: 1,
        color: "black",
        weight: 2,
    };
    // const onEachCountry = (country, layer) => {
    //     const countryName = country.properties.ADMIN;
    //     console.log(countryName);
    //     layer.bindPopup(countryName);

    //     layer.options.fillOpacity = Math.random(); //0-1 (0.1, 0.2, 0.3)
    //     // const colorIndex = Math.floor(Math.random() * this.colors.length);
    //     // layer.options.fillColor = this.colors[colorIndex]; //0

    //     layer.on({
    //      // click: this.changeCountryColor,
    //     });
    //   };

    return (
        <>   
            <div className='row mb-2'>
                {/* formulaire de recherche */}
                <div className='col-md-3'>
                    <select class="form-select" aria-label="Default select example" onChange={(e) => secChange(e.target.value)}>

                        <option selected value="">Secteur</option>
                        {(listSecteur.size > 0) ?
                            (Array.from(listSecteur).map((s, i) => {

                                console.log(s)
                                return <option value={s} key={i}>{s}</option>
                            }))
                            : ""}

                        {/* mettre la liste */}
                    </select>
                </div>
                <div className='col-md-3'>
                    <select class="form-select" aria-label="Default select example" onChange={(e) => regChange(e.target.value)}>
                        <option selected value="">Région</option>
                        {(listRegion.size > 0) ?
                            (Array.from(listRegion).map((s, i) => {

                                console.log(s)
                                return <option value={s} key={i}>{s}</option>
                            }))
                            : ""}
                    </select>
                </div>
                <div className='col-md-3'>
                    <select class="form-select" aria-label="Default select example" onChange={(e) => depChange(e.target.value)}>
                        <option selected value="">Département</option>
                        {(listDep.size > 0) ?
                            (Array.from(listDep).map((s, i) => {

                                console.log(s)
                                return <option value={s} key={i}>{s}</option>
                            }))
                            : ""}
                    </select>
                </div>
                <div className='col-md-3'>
                    <select class="form-select" aria-label="Default select example">
                        <option selected value="">Commune</option>
                        {(listCommune.size > 0) ?
                            (Array.from(listCommune).map((s, i) => {

                                console.log(s)
                                return <option value={s} key={i}>{s}</option>
                            }))
                            : ""}
                    </select>
                </div>

            </div>
            <div className='row'>
                {console.log(listType)}
                <div className='col-md-9'>
                    <MapContainer center={[14.4789286, -14.5168841]} zoom={7} style={mapStye}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LayersControl position="topright">

                            <LayersControl.Overlay name="Marker with popup">
                                <Marker position={[15.6172437, -16.2558184]} >
                                    <Popup>
                                        <Link to={"/details/" + 1}>nnnnnnnnn</Link>
                                    </Popup>
                                </Marker>
                            </LayersControl.Overlay>
                            <LayersControl.Overlay name="limite districts">
                                <GeoJSON data={limDistrict.features}>

                                </GeoJSON>
                            </LayersControl.Overlay>
                        </LayersControl>
                        {
                            lieux.map((l) => {
                                return (
                                    <Marker position={[l.latitude, l.longitude]} key={l.id}>
                                        <Popup>
                                            <Link to={"/details/" + l.id}>{l.nom}</Link>
                                        </Popup>
                                    </Marker>
                                )
                            }
                            )
                        }

                        <LocationMarker />
                        {/* <GeoJSON
                    style={countryStyle}
                    data={mapData.features}
                    onEachFeature={onEachCountry}
                /> */}
                    </MapContainer>
                </div>
                <div className='col-md-3'>
                    <ul class="list-group">
                    {onbType?Object.keys(onbType).map((l)=>{
                        return <li class="list-group-item d-flex justify-content-between align-items-center">
                            {l}
                            <span class="badge bg-orange rounded-pill">{onbType[l]}</span>
                        </li>}):""
                        }
                        

                    </ul>
                </div>
            </div>
        </>



    )
}
export default MyMap;