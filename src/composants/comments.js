import React, { useEffect, useState } from "react";
import FormComment from "./formcomments";
import axios from "axios";
import ReactPaginate from 'react-paginate';
function Comments(props) {
  const baseUrl = 'http://127.0.0.1:8000/api/';
  const [listComments, setListComments] = useState([]);
  const [listPage, setListPage] = useState([]);
  const [nbItems, setNbItems] = useState();
  const [repEtat, setRepEtat] = useState(false);
  const [idC, setIdC] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const limit=4;

  const handlePageClick = (e,i) => {
    console.log('nnnnnnnnnn')
    console.log(i)

    setCurrentPage(i);
    getComments();

  }
  const repondez = async (id) => {
    setIdC(id);
    await setRepEtat(true);
    if (repEtat) {
      setRepEtat(false);


    } else {
      setRepEtat(true);
    }
    console.log(repEtat)
    console.log(idC)
  }
  //http://127.0.0.1:8000/api/cmmentaires/?limit=2&offset=1
  const getComments = async () => {
    console.log('run getcomments.......')
    let mComments = [];
    const response = await axios.get(baseUrl + 'cmmentaires/?ordering=-update_at&id=&commentaire=&lieu=' + props.lieux.id + '&limit='+limit+'&offset=' + currentPage+'/').catch((err) => {
      console.log(err);
    });
    console.log(response.data.results);
    setNbItems(response.data.count)
    let pages=[];
    let a=Math.ceil(response.data.count/limit);
    console.log(a+"mmmmmmmmmmm");
    for(let i=0;i<a;i++){
      pages.push(i);

    }
    setListPage(pages);

    if (response.data.results.length > 0) {
      for (let c of response.data.results) {
        console.log(c);
        await axios.get(baseUrl + 'reponses/?commentaire=' + c['id'] + '&ordering=-update_at/').then((rep) => {
          console.log(rep.data);
          c['rep'] = rep.data
          mComments.push(c);

        }).catch((err) => {
          console.log(err);
        });
      }
      console.log(mComments);
      setListComments(mComments);

    }
  }
  useEffect(() => {

    getComments();
    setPageCount(Math.ceil(nbItems / limit));
    //setCurrentPage(1)

  }, []);
  return (
    <div>
      {console.log(Math.ceil(nbItems / 1))}
      {console.log('ici')}
      {console.log(pageCount)}
      {console.log(currentPage)}
      <FormComment idLieux={props.lieux.id} getComments={getComments}/>


      <section className="gradient-custom">

        <div className="container-fluid my-1 py-2">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-lg-12 col-xl-10">
              <div className="card">
                <div className="card-body p-3">
                  <h4 className="text-center mb-4 pb-2">{nbItems} commentaires</h4>

                  <div className="row">
                    <div className="col">
                      {listComments.map((c, i) => {
                        return (
                          <div className="d-flex flex-start mb-3" key={i}>
                            <img className="rounded-circle shadow-1-strong me-3"
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar" width="65"
                              height="65" />
                            <div className="flex-grow-1 flex-shrink-1">
                              <div>
                                <div className="d-flex justify-content-between align-items-center">
                                  <p className="mb-1">
                                    {c.nom} <span className="small">- 2 hours ago</span>
                                  </p>
                                  <button className="btn bg-orange" onClick={() => repondez(c.id)}><i className="fa fa-reply fa-xs"></i><span className="small"> répondre</span></button>
                                </div>
                                <p className="small mb-0">
                                  {c.commentaire}
                                </p>
                              </div>
                              {/* <ReactPaginate
                                breakLabel="..."
                                nextLabel="next >"
                                onPageChange={(e) => handlePageClick(e)}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                previousLabel="< previous"
                                containerClassName={'pagination'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-link'}
                                marginPagesDisplayed={'3'}
                                pageClassName={'page-link'}
                                renderOnZeroPageCount={null}
                              /> */}
                            
                              {(repEtat && idC == c.id) ?
                                <FormComment rep="reponse" nom={c.nom} id={c.id} />
                                :
                                ""}

                              {c.rep.map((r, index) => {
                                return <div className="d-flex flex-start mt-4" key={index}>
                                  <a className="me-3" href="#">
                                    <img className="rounded-circle shadow-1-strong"
                                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp" alt="avatar"
                                      width="65" height="65" />
                                  </a>
                                  <div className="flex-grow-1 flex-shrink-1">
                                    <div>
                                      <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1">
                                          {r.nom} <span className="small">- 3 hours ago</span>
                                        </p>
                                      </div>
                                      <p className="small mb-0">
                                        {r.reponse}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              })}
                            </div>
                          </div>)
                      })}
                      {/* pagination */}
                      {listPage.length>1?
                      <nav aria-label="Page navigation example">
                        <ul class="pagination">
                          {currentPage-1>=0?
                          <li class="page-item"><button class="page-link"  onClick={(e)=>handlePageClick(e,currentPage - 1)} >Previous</button></li>
                          :""}
                        
                          {listPage.map((p,i)=>{
                            return <li class="page-item"><button class="page-link"  onClick={(e)=>handlePageClick(e,p)} key={i}>{p+1}</button></li>
                          })}
                          {(currentPage+1)<pageCount?
                          <li><button class="page-link"  onClick={(e)=>handlePageClick(e,currentPage+1)} >Next</button></li>
                          :""}
                        </ul>
                      </nav>
                      :""}
                      {/* pagination */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Comments;