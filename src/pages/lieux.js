import React, { useEffect, useState } from "react";
import MyMap from "../composants/map";
import axios from "axios";
import { Link,useParams } from "react-router-dom"
function Lieux() {
    const baseURL = 'http://127.0.0.1:8000/api/';
    const [lieux, setLieux] = useState([]);
    const [nbcst_sante, setnbcst_sante] = useState(0);
    const [listType, setlistType] = useState(new Set([]));
    const [listSecteur, setListSecteur] = useState(new Set([]));
    const [listDep, setListDep] = useState(new Set([]));
    const [listCommune, setListCommune] = useState(new Set([]));
    const [listRegion, setListRegion] = useState(new Set([]));
    const [secteur, setSecteur] = useState("");
    const [region, setRegion] = useState("");
    const [departement, setDepartement] = useState("");
    const [commune, setCommune] = useState("");
    const [type, setType] = useState("");
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [nbItems, setNbItems] = useState();
    const [listPage, setListPage] = useState([]);
    const limit=3;
    const secParam = useParams('secteur');
    const handlePageClick = (e,i) => {
        console.log('nnnnnnnnnn')
        console.log(i)
    
        setCurrentPage(i);
        getLieuxWithFilter(secteur,departement,region);
    
      }
    //list et quantité par secteur
    const listToSet = (data) => {
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
            setListDep(new Set(mlist_dep))
            setListCommune(new Set(mlist_com))
            setListRegion(new Set(mlist_reg))
            setListSecteur(new Set(mlist_sec))
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
    const getLieuxWithFilter = async (secteur, dep, reg,type) => {

        const response = await axios.get(baseURL + "lieux/?secteur=" + secteur + "&type="+type+"&departement=" + dep + "&region=" + reg+'&limit='+limit+'&offset=' + currentPage + '&ordering=-update_at/').catch((err) => {
            console.log(err);
        }

        );
        setLieux(response.data.results)
        listToSet(response.data.results);
        //gestion pagination
        console.log('ici ici ici')
        console.log(response.data.results);
        setNbItems(response.data.count)
        let pages=[];
        let a=Math.ceil(response.data.count/limit);
        console.log(a+"mmmmmmmmmmm");
        for(let i=0;i<a;i++){
        pages.push(i);

        }
        setListPage(pages);

        //gestion pagination
    }
    const getLieux = async () => {

        const response = await axios.get(baseURL + "lieux/").catch((err) => {
            console.log(err);
        }

        );
        setLieux(response.data);

        listToSet(response.data);

        console.log(lieux)
        console.log(response.data)
        console.log(listType)
    }
    useEffect(() => {
        //getLieux();
        console.log(secParam)
        console.log('layhila))))))))))))))))))))))))))))))))))))))))))))))))))s')
        console.log(secParam.secteur)
        if(secParam.secteur && secParam.type){
            // setSecteur(secParam.secteur)
            // setType(secParam.type)
            //getLieuxWithFilter(secParam.secteur,departement,region,secParam.type);
            if(secParam.secteur!='secteur'){
                setSecteur(secParam.secteur)
                getLieuxWithFilter(secParam.secteur,departement,region,type);
            }else if(secParam.type!='type'){
                setType(secParam.type)
                console.log(secParam.type)
                getLieuxWithFilter(secteur,departement,region,secParam.type);
            }else if(secParam.type!='type' && secParam.secteur!='secteur'){
                setType(secParam.type)
                setSecteur(secParam.secteur)
                getLieuxWithFilter(secParam.secteur,departement,region,secParam.type);
            }else{
                getLieuxWithFilter(secteur,departement,region,type);
            }
        }else{
            getLieuxWithFilter(secteur,departement,region,type);
        }
        
        
       
        // console.log(communeSen);
    }, [],departement,region)
    const countryStyle = {
        fillColor: "red",
        fillOpacity: 1,
        color: "black",
        weight: 2,
    };
    return (

        <div className="container-fluid pt-5 mt-1 ">
             <div className='row mb-3'>
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
            <div className="row">
                {lieux.length > 0 ? lieux.map((l) => {
                    return (<div className="col-lg-4 col-md-6 mb-5">
                        <Link to={"/details/" + l.id} className="my-link" style={{ textDecoration: 'none',color:'black' }}>
                            <div className="post" data-aos="fade-up" data-aos-duration="1000">
                                <img className="img-fluid im-lieu w-100" src={l.photos} alt="Blog" />
                                <div className="post_inner py-3">
                                    <p className="mb-1 font-weight-bold">13th March,2019 </p>
                                    <h5 className="font-weight-bold">{l.nom}</h5>
                                    <p>{(l.description!=null)?l.description.substring(0,65):""}...</p>
                                    {/* <div className="comment d-flex">
                                        <span className="mr-3"><i className="fa fa-user mr-3 color-orange"></i>Admin</span>
                                        <span className="mr-3"><i className="fa fa-comments mr-3 color-orange"></i>Comments</span>
                                    </div> */}
                                    <a className="btn bg-orange " href="blog-detail.html">Lire plus</a>
                                </div>
                            </div>
                        </Link>
                    </div>)
                }) : ""}

                {/* pagination */}
                {listPage.length>1?
                 <div className="mx-auto d-flex justify-content-center">
                      <nav aria-label="Page navigation example mx-auto">
                        <ul class="pagination">
                          {currentPage-1>=0?
                          <li class="page-item"><button class="page-link"  onClick={(e)=>handlePageClick(e,currentPage - 1)} >Previous</button></li>
                          :""}
                        
                          {listPage.length>1?listPage.map((p,i)=>{
                            return <li class="page-item"><button class="page-link"  onClick={(e)=>handlePageClick(e,p)} key={i}>{p+1}</button></li>
                          }):''}
                          {(currentPage+1)<pageCount?
                          <li><button class="page-link"  onClick={(e)=>handlePageClick(e,currentPage+1)} >Next</button></li>
                          :""}
                        </ul>
                      </nav>
                      </div>
                      :""}
                    {/* pagination */}

            </div>
        </div>

    )
}
export default Lieux;