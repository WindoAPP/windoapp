import { useRouter } from 'next/router';
import styles from './Home.module.scss';

const Home = () => {

  const router = useRouter();

  return (
    <div className='d-flex flex-column'>
      <div className={`d-flex mb-5 ${styles.felxMobile}`}>
        <div className='d-flex flex-column '>
          <button className={`mb-2 ${styles.purplrBtn}`}>Et si on jouer un peu 🤭</button>
          <h1 className='mb5'>Boostez Votre Visibilité avec des avis sur Google</h1>
          <p className='text-secondary'>Un QR code magique ouvre la porte à une expérience unique : faites jouer vos clients et obtenez des avis positifs tous les mois.</p>
          <div className={`d-flex flex-column justify-content-center mb-5`}>
            <div className='d-flex flex-row align-items-center my-2'>
              <div className={`d-flex align-items-center justify-content-center ${styles.topMenu}`}>
                 <i className="fa fa-check"></i>
              </div>
              <h5 className='mb-0 mx-2 font-weight-bold'>Augmentez vos avis Google</h5>
            </div>
            <div className='d-flex flex-row align-items-center my-2'>
              <div className={`d-flex align-items-center justify-content-center ${styles.topMenu}`}>
                 <i className="fa fa-check"></i>
              </div>
              <h5 className='mb-0 mx-2 font-weight-bold'>Créez une base de donnée client</h5>
            </div>
            <div className='d-flex flex-row align-items-center my-2'>
              <div className={`d-flex align-items-center justify-content-center ${styles.topMenu}`}>
                 <i className="fa fa-check"></i>
              </div>
              <h5 className='mb-0 mx-2 font-weight-bold'>Fidélisez vos clients</h5>
            </div>
            <div className='d-flex flex-row align-items-center my-2'>
              <div className={`d-flex align-items-center justify-content-center ${styles.topMenu}`}>
                 <i className="fa fa-check"></i>
              </div>
              <h5 className='mb-0 mx-2 font-weight-bold'>Augmentez votre chiffre d'affaires</h5>
            </div>
          </div>
          <button className={`mb-4 ${styles.topBtn}`}>jours d'essai gratuit</button>
        </div>
        <div className='d-flex flex-column align-items-end  overflow-hidden mx-4'>
          <img src='homeimage1.png' className={styles.topImage1}></img>
          <img src='homeimage2.png' className={`shadow  ${styles.topImage2}`}></img>
        </div>
        {/* <div className={`d-flex flex-column ${styles.firstSectionLeftRow}`} >
          <h1 className={styles.firstSectionLargeText}>What IF ALL
            YOUR
            CUSTOMERS WERE
            TALKING ABOUT YOU?</h1>
          <h5>Get between 100 and 400 Google
            reviews per month by giving gifts to your customers!</h5>
          <button className={`btn btn-success shadow  ${styles.reviewBtn}`} onClick={() => router.push("/register")}>
            Vous voulez booster
            les avis Google
          </button>
        </div>
        <div className='d-flex flex-column' >
          <div className={`d-flex flex-row align-items-center ${styles.listTextWrapper}`}>
            <i className='fa fa-star'></i>
            <p>Augmentez vos avis Google</p>
          </div>
          <div className={`d-flex flex-row align-items-center ${styles.listTextWrapper}`}>
            <i className='fa fa-heart'></i>
            <p>Boostez vos followers sur les réseaux sociaux</p>
          </div>
          <div className={`d-flex flex-row align-items-center ${styles.listTextWrapper}`}>
            <i className='fa fa-inbox'></i>
            <p>Créer une base de données clients</p>
          </div>
          <div className={`d-flex flex-row align-items-center ${styles.listTextWrapper}`}>
            <i className='fa fa-user'></i>
            <p>Fidéliser la clientèle</p>
          </div>
          <div className={`d-flex flex-row align-items-center ${styles.listTextWrapper}`}>
            <i className='fa fa-eur'></i>
            <p>Augmentez votre chiffre d'affaires</p>
          </div>

        </div> */}
      </div>
      <div className={`d-flex flex-column align-items-center justify-content-center ${styles.secondSectionWrapper}`}>
        <h1>How it works ?</h1>
        <h2>I PROMISE IT'S NOT COMPLICATED!</h2>
      </div>
      <div className={`d-flex flex-column align-items-start justify-content-center ${styles.thirdSectionWrapper}`}>
        <div className='d-flex flex-column align-items-start'>
          <div className='d-flex flex-row align-items-end'>
            <span>01.</span><h1>Your customers scan the QR Code</h1>
          </div>
          <p>Make stickers or flyers available to your customers at your point of sale or in your delivery bags.</p>
        </div>
        <div className='d-flex flex-column align-items-start'>
          <div className='d-flex flex-row align-items-end'>
            <span>02.</span><h1>Your customers leave you a google review</h1>
          </div>
          <p>MYour customers must leave you a Google review or other marketing actions! TikTok, Instagram, Facebook...</p>
        </div>
        <div className='d-flex flex-column align-items-start'>
          <div className='d-flex flex-row align-items-end'>
            <span>03.</span><h1>Here we go, the wheel is turning!</h1>
          </div>
          <p>Once the Google notice has been submitted, your customer can spin the wheel and Google review in addition to a loyal customer…</p>
          <ul>
            <li>Control the gifts and quantities offered</li>
            <li>Track your results easily</li>
            <li>Secure application, participation limit</li>
          </ul>
        </div>
      </div>
      <div className={`d-flex flex-column align-items-center justify-content-center ${styles.secondSectionWrapper}`}>
        <h1>A price adapted to your needs</h1>
        <p>A price adapted to your needs installation in less than 24 hours.</p>
        <h1>€59.99 / month*</h1>
        <ul>
          <li>Creation of a game page in your image</li>
          <li>Design of flyers and table stickers</li>
          <li>Choice of your shares, gifts and withdrawal conditions</li>
          <li>Dashboard access to track your campaign</li>
          <li>Personalized monthly follow-up every month</li>
          <li>Technical support</li>
        </ul>
        <button className={`btn btn-warning btn-lg ${styles.reviewBtn1}`} onClick={() => router.push("/login")}>
          I Want Windo
        </button>
      </div>
      <div className={`d-flex flex-column align-items-center justify-content-center ${styles.forthSectionWrapper}`}>
        <h1>No more asking for google reviews</h1>
        <ul>
          <li>1 month free for any new subscription</li>
          <li> Short commitment period, no registration fees</li>
        </ul>
        <form>
          <div className="row">
            <div className="col">
              <label>First Name</label>
              <input placeholder="First Name" type="text" className="form-control" name=""></input>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>Last Name</label>
              <input placeholder="First Name" type="text" className="form-control" name=""></input>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>Email</label>
              <input placeholder="Email" type="email" className="form-control" name=""></input>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>Phone</label>
              <input placeholder="Phone" type="text" className="form-control" name=""></input>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>Name of your establishment</label>
              <input placeholder="Name of your establishment" type="text" className="form-control" name=""></input>
            </div>
          </div>

          <div className="row">
            <div className="d-flex flex-row ml-2">
              <input type="checkbox" className="form-check-input"></input>
              <span>I agree to receive information by email</span>
            </div>
          </div>


          <center>
            <div className="row">
              <div className="col">
                <button className="btn btn-warning" >Send</button>
              </div>
            </div>
          </center>




        </form>


      </div>
    </div>
  );
};

export default Home;
