import React, { useEffect,useState } from "react";
import axios  from "axios";
function Gallery() {
    const [lieux, setLieux] = useState([]);
    const [selectedPhoto,setSelectedPhoto]= useState(null);
    const [lat,setLat]= useState('');
    const [lng,setLng]= useState('');
    const baseURL = 'http://127.0.0.1:8000/api/';
    const getLieux = async () => {
        const response = await axios.get(baseURL + "lieux/").catch((err) => {
            console.log(err);
        }
      );
      setLieux(response.data.results);
  }
  useEffect(()=>{
    getLieux();

  })
  const handleClick=(e)=>{
    if(e.target.classList.contains('backdrop')){
      setSelectedPhoto(null);
    }
  }
  const selectImg=(url,lat,long)=>{
   setSelectedPhoto(url);
   setLat(lat);
   setLng(long)
  }

  return (
    <>
    <div className="container-fluid pt-5  ">
      <div className="row">
                {lieux.length > 0 ? lieux.map((l) => {
                  return <div className="col-lg-4 col-md-6 col-sm-12 mb-2 mt-5" onClick={()=>selectImg(l.photos,l.longitude,l.latitude)}>
                    <img src={l.photos} className="img-fluid im-lieu w-100"/>
                    </div>
                })
                :""}
      </div>
      {selectedPhoto?<div className="col-md-12 backdrop mt-5" onClick={(e)=>handleClick(e)}>
        <img className="w-100" src={selectedPhoto}/>
        <p>Latitude: {lat} Longitude: {lng}</p>
      </div>:""}
      </div>
     
    </>
  )
}
export default Gallery;