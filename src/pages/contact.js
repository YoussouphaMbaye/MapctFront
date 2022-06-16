function Contact() {
    return <div classNameName="container mt-5">
        <div classNameName=" ">
            <div className="gmap_canvas col-md-9 mx-auto mt-4"><iframe  className="w-100" height="600" id="gmap_canvas" src="https://maps.google.com/maps?q=geomatica%20saint-louis&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div>
        </div> 
        {/* =============formulaire de contact==================== */}
        <section className="mb-4 col-md-9 mx-auto px-sm-3">

            <h2 className="h1-responsive font-weight-bold text-center my-4">Contactez nous</h2>
            <p className="text-center w-responsive mx-auto mb-5">Avez-vous des questions? N'hésitez pas à nous contacter directement. Notre équipe reviendra vers vous dans les heures qui suivent pour vous aider.</p>

            <div className="row">

                <div className="col-md-9 mb-md-0 mb-5">
                    <form id="contact-form" name="contact-form" action="mail.php" method="POST">

                        <div className="row">

                            <div className="col-md-6">
                                <div className="md-form mb-0">
                                    <input type="text" id="name" name="name" className="form-control" />
                                    <label for="name" className="">Votre nom</label>
                                </div>
                            </div>


                            <div className="col-md-6">
                                <div className="md-form mb-0">
                                    <input type="text" id="email" name="email" className="form-control" />
                                    <label for="email" className="">Votre email</label>
                                </div>
                            </div>


                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="md-form mb-0">
                                    <input type="text" id="subject" name="subject" className="form-control" />
                                    <label for="subject" className="">Objet</label>
                                </div>
                            </div>
                        </div>


                        <div className="row">

                            <div className="col-md-12">

                                <div className="md-form">
                                    <textarea type="text" id="message" name="message" rows="2" className="form-control md-textarea"></textarea>
                                    <label for="message">Message</label>
                                </div>

                            </div>
                        </div>


                    </form>

                    <div className="text-center text-md-left">
                        <a className="btn btn-primary" onclick="document.getElementById('contact-form').submit();">Envoyer</a>
                    </div>
                    <div className="status"></div>
                </div>



                <div className="col-md-3 text-center">
                    <ul className="list-unstyled mb-0">
                        <li><i className="fa fa-map-marker fa-2x color-orange"></i>
                            <p>San Francisco, CA 94126, USA</p>
                        </li>

                        <li><i className="fa fa-phone mt-4 fa-2x color-orange"></i>
                            <p>+ 01 234 567 89</p>
                        </li>

                        <li><i className="fa fa-envelope mt-4 fa-2x color-orange"></i>
                            <p>contact@mdbootstrap.com</p>
                        </li>
                    </ul>
                </div>


            </div>

        </section>
    </div>
}
export default Contact