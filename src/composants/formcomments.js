import React, { useState } from "react";
import axios from "axios";
function FormComment(props) {
    const baseUrl = 'http://127.0.0.1:8000/api/';
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');

    const saveComment = (e) => {
        
        //console.log(reponse)
        e.preventDefault();
        if (props.rep === "reponse") {
            const reponse={ nom: nom, email: email, reponse: comment, commentaire: 'http://127.0.0.1:8000/api/cmmentaires/'+props.id+'/' };
            console.log(reponse)
            axios.post(baseUrl+'reponses/',reponse ,{
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                }}).then((rep) => {
                    console.log(rep)
                    props.getComments();

                }).catch((err) => {
                    console.log(err);
                });
        
        } else {
            axios.post(baseUrl+'cmmentaires/',{ nom: nom, email: email, commentaire: comment ,lieu:'http://127.0.0.1:8000/api/lieux/'+props.idLieux+'/'}, {headers: {
                'Content-Type': 'application/json',
                    accept: 'application/json',
              }},).then((rep) => {
                console.log(rep)
                props.getComments();

            }).catch((err) => {
                console.log(err);
            });
        

        }
        
    }
    return (
        <div className={props.rep == "reponse" ? "my-3 px-4" : "my-3"}>
            <h5>{props.rep == "reponse" ? "Répondre à" : "commenter"}</h5>
            <form onSubmit={(e)=>saveComment(e)}>
                <div className="mb-3">
                    <textarea className="form-control" placeholder="commenter" name="comment" onChange={(e) => setComment(e.target.value)}>
                    </textarea>


                </div>
                <div className={props.rep == "reponse" ? "mb-3 col-xl-9 col-md-12" : "mb-3 col-xl-6 col-md-12"} name="email">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email adresse*" onChange={(e) => setEmail(e.target.value)} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className={props.rep == "reponse" ? "mb-3 col-xl-9 col-md-12" : "mb-3 col-xl-6 col-md-12"}>
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nom*" name="nom" onChange={(e) => setNom(e.target.value)} />

                </div>

                <button type="submit" className="btn bg-orange">Submit</button>
            </form>
        </div>
    );
}
export default FormComment;