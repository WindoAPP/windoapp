import { useRouter } from 'next/router';
import styles from './Home.module.scss';
import { useState } from 'react';
import Loader from '../Loader/loader';
import showNotification from '../showNotifications/showNotifications';
import { sendContactUsForm } from '../../services/service';

const Home = () => {

  const router = useRouter();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '',companyName: '', termsCheck: false});
  const [loading,setLoading]=useState(false);

  const reDirectToUrl=(url)=>{
    window.open(url, '_blank');

  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

  const registerFromSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    sendContactUsForm(formData).then(res => {
      if (res) {
          setLoading(false);
          showNotification(false,"Merci de nous avoir contactés")
      }
    }).catch(err => {
      console.log(err);
      setLoading(false);
    })

  }


  return (
    <div className='d-flex flex-column'>
      <div className={`d-flex mb-5 ${styles.felxMobile} ${styles.topsection1}`}>
        <div className='d-flex flex-column '>
          <button className={`mb-2 ${styles.purplrBtn}`}>Et si on jouait un peu <img draggable="false" role="img" className="emoji" alt="🤭" src="https://s.w.org/images/core/emoji/14.0.0/svg/1f92d.svg"></img></button>
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
          <button onClick={()=>router.push("/register")} className={`mb-4 ${styles.topBtn}`}>15 jours d'essai gratuit</button>
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

      <div id="howitworks" className={`d-flex flex-column align-items-center justify-content-center mb-5 ${styles.thirdSectionWrapper}`}>
        <button className={`mb-2 ${styles.purplrBtn}`}>C'est fun et encourageant</button>
        <h1 className={styles.topThird}>C'est Very Easy <img draggable="false" role="img" className="emoji" alt="😌" src="https://s.w.org/images/core/emoji/14.0.0/svg/1f60c.svg"></img></h1>
        <div className={`${styles.stepper} d-flex flex-column mt-5 ml-2`}>
          <div className="d-flex mb-1">
            <img src="/step4.png" className={`shadow-sm ${styles.stepImg}`}></img>
            <div className={`d-flex flex-column pr-4 align-items-center ${styles.lineWrapper}`}>
              <div className={`${styles.stepBtn} rounded-circle py-2 px-3 bg-white shadow text-dark mb-1`}>1</div>
              <div className={`${styles.line} h-100`}></div>
            </div>
            <div className={`d-flex flex-column justify-content-center ${styles.stepperTextWrapper}`}>
              <h3 className="text-dark">Vos clients scannent le QR Code</h3>
              <p className={`${styles.lead} text-muted pb-3`}>Utilisez des supports physiques tels que des stickers, des chevalets de table, ou même en ajoutant le QR Code sur vos cartes.</p>
            </div>
          </div>
          <div className="d-flex mb-1">
            <div className={`d-flex flex-column justify-content-center ${styles.stepperTextWrapper}`}>
              <h3 className="text-dark">Vos clients vous laissent un avis google</h3>
              <p className={`${styles.lead} text-muted pb-3`}>Chaque interaction offre une opportunité différente : encouragez vos clients à laisser un avis sur Google ou à s'abonner à vos réseaux sociaux comme Instagram ou Facebook.</p>
            </div>
            <div className={`d-flex flex-column pr-4 align-items-center ${styles.lineWrapper}`}>
              <div className={`${styles.stepBtn} rounded-circle py-2 px-3 bg-white shadow text-dark mb-1`}>2</div>
              <div className={`${styles.line} h-100`}></div>
            </div>
            <img src="/step1.png" className={`${styles.stepImg}`}></img>
          </div>
          <div className="d-flex mb-1">
            <img src="/step3.png" className={`${styles.stepImg}`}></img>
            <div className={`d-flex flex-column pr-4 align-items-center ${styles.lineWrapper}`}>
              <div className={`${styles.stepBtn} rounded-circle py-2 px-3 bg-white shadow text-dark mb-1`}>3</div>
              <div className={`${styles.line} h-100`}></div>
            </div>
            <div className={`d-flex flex-column justify-content-center ${styles.stepperTextWrapper}`}>
              <h3 className="text-dark">L'aventure commence, la roue est en mouvement !</h3>
              <p className={`${styles.lead} text-muted pb-3`}>Un avis sur Google devient ainsi une double opportunité : renforce la fidélité de vos clients tout en les récompensant avec des cadeaux attractifs.</p>
            </div>
          </div>
          <div className="d-flex mb-1">
            <div className={`d-flex flex-column justify-content-center ${styles.stepperTextWrapper}`}>
              <h3 className="text-dark">Personnalisation Totale : Votre Jeu, Votre Style !</h3>
              <p className={`${styles.lead} text-muted pb-3`}>Vous pouvez personnaliser la roue à votre image, choisir les cadeaux et les couleurs, téléchargez le QR code en 1 clic et suivez vos performances en toute simplicité.</p>
            </div>
            <div className={`d-flex flex-column pr-4 align-items-center ${styles.lineWrapper}`}>
              <div className={`${styles.stepBtn} rounded-circle py-2 px-3 bg-white shadow text-dark mb-1`}>4</div>
              <div className={`${styles.line} h-100 d-none`} ></div>
            </div>
            <img src="/step2.png" className={`${styles.stepImg}`}></img>
          </div>
        </div>
        <div className={`${styles.stepperMobile}  d-flex flex-column mt-5 ml-2`}>
          <div className="d-flex mb-1">
            <div className="d-flex flex-column pr-4 align-items-center mx-2">
              <div className={`${styles.stepBtn} rounded-circle py-2 px-3 bg-white shadow text-dark mb-1`}>1</div>
              <div className={`${styles.line} h-100`}></div>
            </div>
            <div>
              <img src="/step4.png" className={`shadow-sm ${styles.stepImgMobile}`}></img>
              <h3 className="text-dark mt-3">Vos clients scannent le QR Code</h3>
              <p className={`${styles.lead} text-muted pb-3`}>Utilisez des supports physiques tels que des stickers, des chevalets de table, ou même en ajoutant le QR Code sur vos cartes.</p>
            </div>
          </div>
          <div className="d-flex mb-1">
            <div className="d-flex flex-column pr-4 align-items-center mx-2">
              <div className={`${styles.stepBtn} rounded-circle py-2 px-3 bg-white shadow text-dark mb-1`}>2</div>
              <div className={`${styles.line} h-100`}></div>
            </div>
            <div>
              <img src="/step1.png" className={styles.stepImgMobile}></img>
              <h3 className="text-dark mt-3">Vos clients vous laissent un avis google</h3>
              <p className={`${styles.lead} text-muted pb-3`}>Chaque interaction offre une opportunité différente : encouragez vos clients à laisser un avis sur Google ou à s'abonner à vos réseaux sociaux comme Instagram ou Facebook.</p>
             
            </div>
          </div>
          <div className="d-flex mb-1">
            <div className="d-flex flex-column pr-4 align-items-center mx-2">
              <div className={`${styles.stepBtn} rounded-circle py-2 px-3 bg-white shadow text-dark mb-1`}>3</div>
              <div className={`${styles.line} h-100`}></div>
            </div>
            <div>
              <img src="/step3.png" className={`${styles.stepImgMobile}`}></img>
              <h3 className="text-dark mt-3">L'aventure commence, la roue est en mouvement !</h3>
              <p className={`${styles.lead} text-muted pb-3`}>Un avis sur Google devient ainsi une double opportunité : renforce la fidélité de vos clients tout en les récompensant avec des cadeaux attractifs.</p>
              
            </div>
          </div>
          <div className="d-flex mb-1">
            <div className="d-flex flex-column pr-4 align-items-center mx-2">
              <div className={`${styles.stepBtn} rounded-circle py-2 px-3 bg-white shadow text-dark mb-1`}>4</div>
              <div className={`${styles.line} h-100d-none`}></div>
            </div>
            <div>
              <img src="/step2.png" className={`${styles.stepImgMobile}`}></img>
              <h3 className="text-dark mt-3">Personnalisation Totale : Votre Jeu, Votre Style !</h3>
              <p className={`${styles.lead} text-muted pb-3`}>Vous pouvez personnaliser la roue à votre image, choisir les cadeaux et les couleurs, téléchargez le QR code en 1 clic et suivez vos performances en toute simplicité.</p>
              
            </div>
          </div>
        </div>
      </div>
      <div id="prix" className={`d-flex flex-column  align-items-center justify-content-center align-self-center p-4 my-3 ${styles.qrCodeImageWrapper}`}>
      <h1 >Testez le jeu !</h1>
      <h2 className='my-4'>Tentez de gagner: <br></br>-1 mois gratuit en accès illimité à Windo et <br></br> -1 design à l'image de votre entreprise pour introduire votre jeu.<br></br> 10 Gagnants</h2>
        <img src='/qrimage.jpg' alt='qrimae'></img>
      </div>
      <div id="prix" className={`d-flex flex-column card align-items-center justify-content-center align-self-center p-5 my-5 ${styles.secondSectionWrapper}`}>
        <h1>Un tarif unique pour tous.</h1>
        <h2>€39,90 / mois*</h2>
        <div className={`d-flex flex-column my-4 ${styles.priceSectionWrp}`}>
          {/* <span><i className="fa fa-check mx-2" aria-hidden="true"></i>  Création d'une page de jeu à votre image</span> */}
          <span><i className="fa fa-check mx-2" aria-hidden="true"></i>  Choix de vos actions, cadeaux et conditions de retrait</span>
          <span><i className="fa fa-check mx-2" aria-hidden="true"></i>  Accès au tableau de bord pour suivre votre campagne</span>
          <span><i className="fa fa-check mx-2" aria-hidden="true"></i>  Suivi mensuel personnalisé tous les mois</span>
          <span><i className="fa fa-check mx-2" aria-hidden="true"></i>  Support technique</span>
        </div>
        <button className={`commonBtnWindo ${styles.reviewBtn1}`} onClick={()=>router.push("/register")}>
        JE VEUX WINDO
        </button>
      </div>
      <div className={`d-flex ${styles.felxMobile} align-items-center justify-content-center mb-5 mt-5 ${styles.secondSectionWrapper1}`}>
        <div className={`d-flex flex-column ${styles.secondSectionInnerWrapper}`}>
          <h1>Commandez vos supports en 1 clic !</h1>
          <h4 className='mt-3'>Une fois que vous avez obtenu votre QR Code, commandez votre support physique en quelques clics via l'imprimerie de Very Easy. Simplifiez le processus et concrétisez votre projet en un rien de temps !</h4>
          <button onClick={()=>reDirectToUrl("https://veryeasyagency.com/categorie-produit/imprimerie")} type="button" className={`btn btn-light  mt-4 ${styles.abonnezBtn}`}>Commander un support</button>
        </div>
        <img className={styles.image} src='/homepageimage6.png'></img>
      </div>
      <div className={`d-flex flex-column align-items-center justify-content-center ${styles.forthSectionWrapper}`}>
        <h1> Besoin d'aide pour l'installation ?</h1>

        <form onSubmit={registerFromSubmit} className='my-4'>
          <div className="row">
            <div className="col">

              <input placeholder="Prénom" type="text" className="form-control rounded-pill" required name="firstName" onChange={handleChange} value={formData.firstName}></input>
            </div>
          </div>

          <div className="row">
            <div className="col">

              <input placeholder="Nom" type="text" className="form-control rounded-pill" required name="lastName" onChange={handleChange} value={formData.lastName}></input>
            </div>
          </div>

          <div className="row">
            <div className="col">

              <input placeholder="Email" type="email" className="form-control rounded-pill" required name="email" onChange={handleChange} value={formData.email}></input>
            </div>
          </div>

          <div className="row">
            <div className="col">

              <input placeholder="Téléphone" type="text" className="form-control rounded-pill" required name="phoneNumber" onChange={handleChange} value={formData.phoneNumber}></input>
            </div>
          </div>

          <div className="row">
            <div className="col">

              <input placeholder="Nom de votre établissement" type="text" className="form-control rounded-pill" required name="companyName" onChange={handleChange} value={formData.companyName}></input>
            </div>
          </div>

          <div className="row">
            <div className="d-flex flex-row ml-2">
              <input type="checkbox" className="form-check-input" required name="termsCheck" onChange={handleChange} value={formData.termsCheck}></input>
              <span>J'accepte de recevoir des informations par email</span>
            </div>
          </div>


          <center>
            <div className="row">
              <div className="col">
                <button className="btn btn-warning font-weight-bold" >ENVOYER</button>
              </div>
            </div>
          </center>
        </form>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default Home;
