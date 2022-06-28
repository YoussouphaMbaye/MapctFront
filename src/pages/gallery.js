import React, { useEffect,useState } from "react";
import axios  from "axios";
function Gallery() {
    const [lieux, setLieux] = useState([]);
    const [selectedPhoto,setSelectedPhoto]= useState(null);
    const [lat,setLat]= useState('');
    const [lng,setLng]= useState('');
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [nbItems, setNbItems] = useState(1);
    const [listPage, setListPage] = useState([]);
    const baseURL = 'http://127.0.0.1:8000/api/';
    const limit=3;
    const getLieux = async () => {
        const response = await axios.get(baseURL + 'lieux/?count='+limit+'&page=' + currentPage + '&ordering=-update_at/').catch((err) => {
            console.log(err);
        }
      );
      setLieux(response.data.results);
      setNbItems(response.data.count);
      let pages=[];
      let a=Math.ceil(response.data.count/limit);
      console.log(a+"mmmmmmmmmmm");
      for(let i=0;i<a;i++){
          pages.push(i);
      }
      setListPage(pages);
      setPageCount(Math.ceil(response.data.count / limit));
  }
  const handlePageClick = async(e,i) => {
    console.log('lahilahilalah')
    console.log(i)

    await setCurrentPage(i);
    console.log(currentPage)
    

  }
  //imediate change of currentPage
  useEffect(()=>{
    getLieux();
  },[currentPage])

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
    <div className="container-fluid">
      <div className="row">
                {lieux.length > 0 ? lieux.map((l) => {
                  return <div className="col-lg-4 col-md-6 col-sm-12 mb-2 mt-5 " onClick={()=>selectImg(l.photos,l.longitude,l.latitude)}>
                    <img src={l.photos} className="img-fluid im-lieu w-100 im-gallery"/>
                    </div>
                })
                :""}
                {/* pagination */}
                {listPage.length>1?
                 <div className="mx-auto d-flex justify-content-center mt-5">
                      <nav aria-label="Page navigation example mx-auto">
                        <ul class="pagination">
                          {(currentPage - 1>0)?
                          <li class="page-item"><button class="page-link"  onClick={(e)=>handlePageClick(e,currentPage-1)} >Previous</button></li>
                          :""}
                        
                          {listPage.length>1?listPage.map((p,i)=>{
                            return <li class={(p+1==currentPage)?"active page-item":"page-item"}><button class="page-link"  onClick={(e)=>handlePageClick(e,p+1)} key={i}>{p+1}</button></li>
                          }):''}
                          {(currentPage+1<=pageCount)?
                          <li><button class="page-link"  onClick={(e)=>handlePageClick(e,currentPage+1)} >Next</button></li>
                          :""}
                        </ul>
                      </nav>
                      </div>
                      :""}
                    {/* pagination */}
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