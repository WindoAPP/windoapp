const Footer = () => {
    return (
      <footer className="bg-dark text-light py-4">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="mb-0">© All rights reserved to Windo | 2023 News</p>
            </div>
            <div className="col">
              <p className="mb-0">News</p>
            </div>
            <div className="col">
                <div className="d-flex flex-row">
                <div className=" mx-2 iconWrapper d-flex align-items-center justify-content-center"><i className="fa fa-facebook"></i></div>
                <div className=" mx-2 iconWrapper d-flex align-items-center justify-content-center"><i className="fa fa-instagram"></i></div>
                </div>           
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;