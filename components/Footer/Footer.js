const Footer = () => {

  const reDirectToUrl=(url)=>{
    window.open(url, '_blank');
  }

    return (
      <footer className="bg-dark text-light py-4">
        <div className="container">
          <div className="d-flex felxMobile align-items-center justify-content-between">
            <div className="">
              <p className="mb-0">© All rights reserved to Windo | 2023 News</p>
            </div>
            
            <div className="">
                <div className="d-flex flex-row">
                <div className=" mx-4 iconWrapper d-flex align-items-center justify-content-center"><i className="fa fa-facebook"></i></div>
                <div className=" mx-4 iconWrapper d-flex align-items-center justify-content-center"><i className="fa fa-instagram"></i></div>
                </div>           
            </div>
            <div className=" d-flex flex-column">
              <a  href="https://veryeasyagency.com/contact" target="_blank" className="text-white">contact</a>
              <a href="" className="text-white">politique de confidentialité</a>
              <a href="" className="text-white">politique des joueurs</a>
              <a href="" className="text-white">conditions générales des ventes</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;