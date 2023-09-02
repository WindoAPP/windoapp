import { useState, useEffect } from 'react';
import styles from './signUp.module.scss'
import Loader from '../Loader/loader';
import showNotifications from '../showNotifications/showNotifications';
import { createPayment, createUser, getUser, pricingTableGet, sendContactForm, subscribe } from '../../services/service';
import { useRouter } from 'next/router';
import { env_data } from '../../config/config';
import ContentCard from '../contentCard/contentCard';

const t_c=[
    {
        heading:"ARTICLE 1 - APPLICATION ET OPPOSABILITÉ",
        des:"1.Les présentes Conditions Générales régissent les relations contractuelles entre la société VERY EASY AGENCY, statut auto-entrepreneur, enregistré au Registre du Commerce et des Sociétés de Paris sous le numéro 85220995600030, représenté par M. Planté Rodrigue, exerçant l' activité de vente à distance sur catalogue général, et ci-après désignée « WINDO », d'une part, et toute personne physique ou morale ayant contracté le présent contrat, ci-après désignée « LE CLIENT », d'autre part. 2. L’accès au services WINDO par le CLIENT implique l’acceptation expresse, préalable, pleine et entière des présente conditions générales. En créant son compte directement en ligne, le CLIENT directement en ligne et en approuvant la case « j’accepte les conditions générales de ventes » ou en signant le Bon de commande. Le CLIENT reconnaît qu’il est tenu par l’ensemble des présentes conditions générales d’accès au service WINDO. "
    },
    {
        heading:"ARTICLE 2 - PRESTATIONS" ,
        des:"Pou rassurer la promotion du CLIENT , WINDO propose un ensemble de services de marketing digital que le CLIENT sélectionne à la carte. Parmi ces services :  -Une animation sous forme de jeu visant à collecter les coordonnées (email ou numéro de portable) des clients du CLIENT en vue de leur envoyer des communications régulières dans une optique de ﬁdélisation.  - Une animation visant à transformer les clients du CLIENT en abonnés sur les réseaux sociaux (Facebook, Instagram, Snapchat etc.)  - Une animation visant à obtenir des avis positifs sur les sites de référence (Google, Trip Advisor etc.) aﬁn d’améliorer le référencement du CLIENT sur internet.  Le CLIENT devra communiquer à  WiINDO toutes les informations nécessaires à la mise en place de ces services. Le CLIENT est responsable de la disponibilité des éléments qu’il fournit pour le lancement du jeu et sa mise en avant.  Le CLIENT aura accès au contenu relatif à sa communication sur son Tableau de bord (accès sécurisé via un identiﬁant email et un mot de passe). Cet identiﬁant et ce mot de passe sont strictement personnels et conﬁdentiels et ne devront pas être communiqués, ni partagés avec des tiers. Le CLIENT assume l’entière responsabilité de l’utilisation, par lui-même et par toutes personnes à qui il a permis d’accéder aux données, des codes d’accès qui lui ont été fournis ou qu’il a pu créer.  Les modalités de l’animation restent modiﬁables par le CLIENT à tout moment (cadeaux offerts, action  demandée au client ﬁnal etc.). "
    },
    {
        heading:"ARTICLE 3 - PRESTATIONS OPTIONNELLES ",
        des:"En tant que client de Windo, l'application web de Very Easy Agency, nous sommes heureux de vous offrir la possibilité de commander un support physique pour présenter votre QR Code de manière élégante et professionnelle. Chez Very Easy Agency, nous croyons en l'importance de connecter le monde numérique avec le monde physique, offrant ainsi une expérience marketing plus riche et interactive. "
    },
    {
        heading:"ARTICLE 5 - RESPONSABILITÉ DU PRESTATAIRE ",
        des:"Toot Sweet SAS fait ses meilleurs efforts pour assurer la disponibilité de ses services. Toutefois, le CLIENT est informé que le service est soumis à une simple obligation de moyen.  WINDO ne peut être tenue responsable de dommages directs ou indirects, pertes ou frais, résultant de l’utilisation des services, ou de l’impossibilité de les utiliser, ou d’un mauvais fonctionnement, d’une interruption pour cause de manutention, de défaillance technique du serveur ou lié à une interruption de l’accès à Internet ou pour toute autre cause, d’un virus, ou encore d’un problème de ligne ou de système. Une suspension de facturation équivalente à la durée de suspension du service est prévue en cas d’interruption signiﬁcative du service.  La responsabilité de WINDO ne peut en aucun cas être recherchée, à quelque titre que ce soit, pour tout préjudice ou dommage direct ou indirect, perte ou frais, subi ou encouru par le CLIENT du fait de l’utilisation ou de l’impossibilité d’utilisation de l’accès au service, pour quelque cause que ce soit, tels que notamment mais sans que cela soit limitatif, perte d’information, perte de Clientèle, manque à gagner, perte d’image de marque ou autre trouble commercial. De convention expresse, la responsabilité de WINDO ne pourra en tout état de cause excéder le montant des sommes facturées au CLIENT par WINDO EI au titre des services fournis l’année civile encours."
    },
    {
        heading:"ARTICLE 6 - RESPONSABILITÉ DU CLIENT ",
        des:"Le CLIENT déclare être propriétaire des informations fournies à WINDO pour la création et l’actualisation de ses campagnes de communication (supports graphiques, textes, photos etc.).  L’exactitude de l’ensemble des informations fournies par le CLIENT relève de sa responsabilité et fait appel à sa bonne foi .Le CLIENT déclare que les informations communiquées sont exactes et complètes et en assume la responsabilité. WINDO n’a aucune responsabilité quant au contenu des informations fournies par le CLIENT. "
    },{
        heading:"ARTICLE 7 - MODALITÉS DE REGLEMENT ET DEFAUT DE PAIEMENT ",
        des:"Les règlements correspondant à l’accès aux services de WINDO sont payables mensuellement par autorisation de prélèvement ou en une fois par chèque à la commande.  Le CLIENT s’engage à ce que le compte bancaire utilisé pour le paiement soit sufﬁsamment approvisionné pour permettre le paiement.  Dès lors que le CLIENT a donné plusieurs moyens de paiement à WINDO, et si l’un des moyens de paiement ne fonctionne pas,WINDO pourra réaliser une tentative de paiement sur les autres moyens transmis à WINDO.  Toute somme non payée à l’échéance donnera lieu au paiement de pénalités de retard ﬁxées à 3 (trois) fois le taux d’intérêt légal par jour de retard. Ces pénalités de retard seront dues dès le lendemain de la date d’échéance et seront exigibles sans qu’un rappel ne soit nécessaire, l’envoi d’une lettre recommandée n’étant pas requis pour déclencher le droit pour WINDO de les percevoir.  Une indemnité forfaitaire de quarante euros(40€) sera également due à WINDO pour frais de recouvrement, à l’occasion de tout retard de paiement ou impayé. Cette indemnité est due pour chaque facture payée en retard et non sur l’ensemble des factures concernées.  Toute fois, cette indemnité ne s’appliquera pas si leCLIENT est en cours de procédure de sauvegarde, de redressement ou de liquidation judiciaire. Si les frais de recouvrement réellement engagés sont supérieurs à ce montant forfaitaire, notamment en cas de recours à un cabinet de recouvrement externe, une indemnisation complémentaire pourra être demandée par WINDO auCLIENT.L’indemnité sera due en totalité même en cas de paiement partiel de la facture à l’échéance, quelle que soit la durée du retard. Ce montant forfaitaire s’ajoute aux pénalités de retard mais n’est pas inclus dans la base de calcul des pénalités.  En cas de défaut de paiement de toute ou partie d’une facture à l’échéance ﬁxée, WINDO aura la faculté d’exiger le règlement immédiat de l’intégralité de la somme due à quelque titre que ce soit, même si elles ne sont pas encore échues et quel que soit le mode de règlement prévu.  Non obstant ce qui précède, en cas de liquidation judiciaire ou de cession, le Client s’engage à en informer WINDO dans les plus brefs délais. Dans cette hypothèse, WINDO constatera la résiliation du Contrat avec le Client sur la base des justiﬁcations apportées par le Client et annulera toutes les sommes restantes dues au titre du Contrat par le Client pour la durée restante sur l’abonnement.  "
    },{
        heading:"ARTICLE 8 - DURÉE DU CONTRAT - RESILIATION ",
        des:"Conformément aux dispositions légales en vigueur, LE CLIENT bénéﬁcie d'un droit de rétractation, lui permettant de se rétracter du présent contrat sans donner de motif, dans un délai de 30 (trente) jours à compter de la date de souscription au contrat. Le présent Contrat prend effet à compter de la date indiquée par le client et présente un caractère déﬁnitif et irrévocable liant WINDO au CLIENT.  Au terme de la période d’engagement initialement prévue, l’abonnement au Service WINDO sera reconduit tacitement par périodes successives identiques à la durée de la première souscription sauf dénonciation adressée par le CLIENT et sans période de préavis par email à l’adresse: contact@veryeasyagency.com.  Le Contrat ne peut être dénoncé ou résilié avant son terme et/ou de manière unilatérale par le CLIENT, pour quelque cause, fondement ou grief que ce soit. En toute hypothèse, le CLIENT ne peut interrompre l’exécution du Contrat, même ponctuellement, pour des motifs liés à la fermeture temporaire de son établissement (vacances du mois d’août, fermeture annuelle etc.), étant précisé que les périodes de fermeture sont déjà prises en compte par WINDO au moment de la souscription de la commande.  "
    },{
        heading:"ARTICLE 9 - DONNÉES PERSONNELLES ",
        des:"• Données relatives aux Utilisateurs ﬁnaux WINDO agit en qualité de responsable de traitement dans le cadre des services fournis au CLIENT dans la mesure où WINDO détermine de manière autonome les ﬁnalités et les moyens des traitements de données personnelles relatifs aux Utilisateurs ﬁnaux. WINDO s’engage à se conformer aux exigences de la règlementation applicable en matière de protection des données à caractère personnel, notamment le Règlement européen n° 2016-679 du 27 avril 2016 (« RGPD ») et la loi n°78-17 du 6 janvier 1978 relative à l’informatique, aux ﬁchiers et aux libertés.  • Données relatives auCLIENT WINDO peut également être amené à traiter, en qualité de responsable de traitement, des données personnelles relatives aux employés ou mandataires sociaux du CLIENT limitées principalement aux noms et coordonnées professionnelles pour la gestion de la relation commerciale (gestion de la relation contractuelle, gestion de la facturation...). Les données sont archivées pendant 5ans à compter de la ﬁn de la relation commerciale ou, en tout état de cause, pendant une durée n’excédant pas les délais de prescription légale applicables.  •Destinataires et droits des personnes concernées Les Données personnelles traitées par WINDO ne sont cédées, transférées ou rendues accessibles à aucun tiers sous réserve des sous-traitants éventuels de WINDO, situés dans l’EEE et de toute restructuration et/ou toute opération de réorganisation de WINDO ou lorsqu’une telle communication est requise par la loi, une disposition réglementaire ou une décision judiciaire, ou nécessaire pour assurer la protection et la défense de ses droits. Les personnes concernées disposent d’un droit d’accès et de rectiﬁcation de leurs Données, ainsi que de celui d’en demander l’effacement, de s’opposer à leur traitement et d’en obtenir la limitation ou la portabilité. Ces droits peuvent être exercés seulement par courrier électronique à l’adresse : contact@veryeasyagency.com. • Enﬁn, pour toute réclamation, le CLIENT dispose du droit de saisir la Commission Nationale de l’Informatique et des Libertés (CNIL). "
    },{
        heading:"ARTICLE 10 - LITIGES - JURIDICTION COMPÉTENTE ",
        des:"Toutes contestations qui découlent du présent contrat ou qui s'y rapportent seront tranchées déﬁnitivement suivant le règlement de Conciliation et d'Arbitrage de la Chambre de Commerce Internationale sans aucun recours aux tribunaux ordinaires par un ou plusieurs arbitres nommés conformément à ce règlement et dont la sentence a un caractère obligatoire. Le tribunal arbitral sera juge de sa propre compétence et de la validité de la convention d'arbitrage. "
    }
]

const SignUp = () => {
    const [formData, setFormData] = useState({ email: '', password: '', c_password: '', userName: '', phoneNumber: '', shopName: '', shopId: '', termsCheck: false });
    const [loading, setLoading] = useState(false);
    const [priceId, setPriceId] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState({});

    const router = useRouter();
    const { query } = router;

    useEffect(() => {

        if (query) {
            if (query.payment == 'success') {

                showNotifications(false, "Payment Successfull !");

                const paymentData = { user: query.uid, amount_total: query.total, currency: query.currency, success: true,accStatus:"trial" }

                createPayment(paymentData).then(() => {
                    var emailData={
                        name: formData.userName, email: formData.email, subject: "paiement réussi", message: "nous avons reçu votre paiement. Merci de nous avoir rejoint"
                    }
                    sendEmail(emailData);

                    router.push("login");

                }).catch(err => {
                    console.log(err);
                });
            } else if (query.payment == "failed") {
                const paymentData = { user: query.uid, amount_total: query.total, currency: query.currency, success: false,accStatus:"created" }

                createPayment(paymentData).then(() => {
                    var emailData={
                        name: formData.userName, email: formData.email, subject: "échec du paiement", message: "nous n'avons pas reçu votre paiement. essayer à nouveau"
                    }
                    sendEmail(emailData);
                    router.push("login");
                }).catch(err => {
                    console.log(err);
                });
            }
        }
        setPriceId(env_data.trialProduct);
    }, [query]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchUser = (id) => {
        getUser(id).then(res => {
            if (res) {
                setUser(res.user);
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);

        });
    }

    const registerFromSubmit = (e) => {
        e.preventDefault();
        var isValid = validateForm();

        if (isValid) {
            setLoading(true);
            createUser(formData).then(res => {
                if (res) {
                    
                    subscribe({ priceId: priceId, userId: res.user._id, total: "39.9", currency: "EUR" }).then(res => {

                        if (res) {
                            setLoading(false);
                            redirectToExternalURL(res.url);
                        }
                    }).catch(err => {
                        console.log(err);
                        setLoading(false);
                    })
                }
            }).catch(err => {
                console.log(err);
                setLoading(false);
            })


        } else {
            return
        }

    }

    const redirectToExternalURL = (url) => {
        window.location.href = url;
    };

    const validateForm = () => {

        if (formData.userName == "") {
            showNotifications(true, "User Name required")
            return false;
        }
        if (formData.password == "") {
            showNotifications(true, "Password required")
            return false;
        }
        if (formData.email == "") {
            showNotifications(true, "email required")
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            showNotifications(true, "Invalid email address")
            return false;
        }
        if (formData.c_password == "") {
            showNotifications(true, "Confirm Password required")
            return false;
        }
        if (formData.shopName == "") {
            showNotifications(true, "Shop Name required")
            return false;
        }
        if (formData.shopId == "") {
            showNotifications(true, "Shop ID required")
            return false;
        }
        if (formData.phoneNumber == "") {
            showNotifications(true, "Mobile Number")
            return false;
        }
        if (formData.password !== formData.c_password) {
            showNotifications(true, "Password mismathed")
            return false;
        }
        if (!formData.termsCheck) {
            showNotifications(true, "You must agree to terms and conditions")
            return false;
        }

        return true;
    };


    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const sendEmail = async (mailData) => {
        try {
          await sendContactForm(mailData);

        } catch (error) {
          console.log(error);
        }
      };


    return (
        <div className={styles.loginWrapper}>
            <form>
                <div className={`d-flex flex-column p-4  ${styles.loginBox}`}>
                    <img className='w-50 align-self-center mb-3' src='logo.png'></img>
                    <span className='align-self-center mb-3'>Inscrivez-vous pour continuer Windo</span>
                    <div className="d-flex flex-column">
                        <label><strong>Nom d'utilisateur</strong></label>
                        <input type="text" name="userName" placeholder="Nom d'utilisateur" className="form-control regi-input" onChange={handleChange} value={formData.userName}></input>
                    </div>
                    <div className="d-flex flex-column">
                        <label><strong>Email</strong></label>
                        <input required type="email" name="email" placeholder="Email" className="form-control regi-input" onChange={handleChange} value={formData.email}></input>
                    </div>
                    <div className="d-flex flex-column">
                        <label><strong>Password</strong></label>
                        <input required type="password" name="password" placeholder="Password" className="form-control regi-input" onChange={handleChange} value={formData.password}></input>
                    </div>
                    <div className="d-flex flex-column">
                        <label><strong>Confirmez le mot de passe</strong></label>
                        <input type="password" name="c_password" placeholder="Confirmez le mot de passe" className="form-control regi-input" onChange={handleChange} value={formData.c_password}></input>
                    </div>
                    <div className="d-flex flex-column">
                        <label><strong>Nom de la boutique</strong></label>
                        <input type="text" name="shopName" placeholder="Nom de la boutique" className="form-control regi-input" onChange={handleChange} value={formData.shopName}></input>
                    </div>
                    <div className="d-flex flex-column">
                        <label><strong>Numéro de portable</strong></label>
                        <input type="text" name="phoneNumber" placeholder="Numéro de portable" className="form-control regi-input" onChange={handleChange} value={formData.phoneNumber}></input>
                    </div>
                    <div className="d-flex flex-column">
                        <div className='d-flex flex-column mb-1'>
                            <label><strong>Boutique ID</strong></label>
                            <label ><a target="_blank" href='https://veryeasyagency.com/id-google/'>Cliquez ici</a> pour obtenir votre boutique ID </label>
                        </div>

                        <input type="text" name="shopId" placeholder="Boutique ID" className="form-control regi-input " onChange={handleChange} value={formData.shopId}></input>
                    </div>
                    <div className="form-check my-3">
                        <input type="checkbox" className="form-check-input" name="termsCheck" value={formData.termsCheck} onChange={handleChange}></input>
                        <label className="form-check-label" >J'accepte les termes et conditions <span className='text-primary cursor-pointer' onClick={openModal}>Cliquez ici</span></label>
                    </div>
                    <button className={`commonBtnWindo mt-4 ${styles.loginBTN}`} onClick={registerFromSubmit}>S'inscrire et payer</button>
                    <span className='align-self-center'>Vous avez déjà un compte? <a href="/login">Se connecter</a></span>
                </div>
                 <ContentCard isOpen={isModalOpen} onClose={closeModal} title={"CONDITIONS GÉNÉRALES"} data={t_c}/>
            </form>       
            <div className={styles.RightImageWrapper}>
                <img src='loginImage.jpg' className={styles.RightImage}></img>
            </div>
            {loading && <Loader />}
        </div>
    );
};

export default SignUp;