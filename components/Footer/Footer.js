import { useState } from "react";
import ContentCard from "../contentCard/contentCard";
import styles from './footer.module.scss';

const Footer = () => {

  const pp = [
    {
      heading: "1. Conditions générales d’utilisation du site et des services proposés.",
      des: `Le Site constitue une œuvre de l’esprit protégée par les dispositions du
        Code de la Propriété Intellectuelle et des Réglementations Internationales
        applicables.
        Le Client ne peut en aucune manière réutiliser, céder ou exploiter pour son
        propre compte tout ou partie des éléments ou travaux du Site.
        L’utilisation du site www.windo-app.com implique l’acceptation pleine et
        entière des conditions générales d’utilisation ci-après décrites. Ces
        conditions d’utilisation sont susceptibles d’être modifiées ou complétées à
        tout moment, les utilisateurs du site www.windo-app.com sont donc invités
        à les consulter de manière régulière.
        Ce site internet est normalement accessible à tout moment aux utilisateurs.
        Une interruption pour raison de maintenance technique peut être toutefois
        décidée par www.veryeasyagency.com, qui s’efforcera alors de
        communiquer préalablement aux utilisateurs les dates et heures de
        l’intervention.
        Le site web www.windo-app.com est mis à jour régulièrement par
        www.veryeasyagency.com responsable. De la même façon, les mentions
        légales peuvent être modifiées à tout moment : elles s’imposent néanmoins
        à l’utilisateur qui est invité à s’y référer le plus souvent possible afin d’en
        prendre connaissance.`
    },
    {
      heading: "2. Description des services fournis",
      des: `Le site internet www.veryeasyagency.com a pour objet de fournir une
        information concernant l’ensemble des activités de la société à la demande
        du visiteur à l’adresse mail suivante: contact@veryeasyagency.com
        Toutefois, il ne pourra être tenu responsable des oublis, des inexactitudes et
        des carences dans la mise à jour, qu’elles soient de son fait ou du fait des
        tiers partenaires qui lui fournissent ces informations.
        Toutes les informations indiquées sur le site www.windo-app.com sont
        données à titre indicatif, et sont susceptibles d’évoluer. Par ailleurs, les
        renseignements figurant sur le site www.veryeasyagency.com ne sont pas
        exhaustifs. Ils sont donnés sous réserve de modifications ayant été
        apportées depuis leur mise en ligne.`
    },
    {
      heading: "3. Limitations contractuelles sur les données techniques.",
      des: `Le site Internet ne pourra être tenu responsable de dommages matériels
        liés à l’utilisation du site. De plus, l’utilisateur du site s’engage à accéder au
        site en utilisant un matériel récent, ne contenant pas de virus et avec un
        navigateur de dernière génération mis-à-jour
        Le site www.windo-app.com est hébergé chez un prestataire sur le territoire
        de l’Union Européenne conformément aux dispositions du Règlement
        Général sur la Protection des Données (RGPD : n° 2016-679)
        L’objectif est d’apporter une prestation qui assure le meilleur taux
        d’accessibilité. L’hébergeur assure la continuité de son service 24 Heures sur
        24, tous les jours de l’année. Il se réserve néanmoins la possibilité
        d’interrompre le service d’hébergement pour les durées les plus courtes
        possibles notamment à des fins de maintenance, d’amélioration de ses
        infrastructures, de défaillance de ses infrastructures ou si les Prestations et
        Services génèrent un trafic réputé anormal.
        www.veryeasyagency.com et l’hébergeur ne pourront être tenus
        responsables en cas de dysfonctionnement du réseau Internet, des lignes
        téléphoniques ou du matériel informatique et de téléphonie lié notamment
        à l’encombrement du réseau empêchant l’accès au serveur.`
    },
    {
      heading: "4. Propriété intellectuelle et contrefaçons.",
      des: `www.veryeasyagency.com est propriétaire des droits de propriété
        intellectuelle et détient les droits d’usage sur tous les éléments accessibles
        sur le site internet, notamment les textes, images, graphismes, logos, vidéos,
        icônes et sons.
        Toute reproduction, représentation, modification, publication, adaptation de
        tout ou partie des éléments du site, quel que soit le moyen ou le procédé
        utilisé, est interdite, sauf autorisation écrite préalable de :
        www.veryeasyagency.com.
        Toute exploitation non autorisée du site ou de l’un quelconque des
        éléments qu’il contient sera considérée comme constitutive d’une
        contrefaçon et poursuivie conformément aux dispositions des articles
        L.335-2 et suivants du Code de Propriété Intellectuelle.`
    },
    {
      heading: "5. Limitations de responsabilité.",
      des: `www.windo-app.com agit en tant qu’éditeur du site. www.windoapp.com est responsable de la qualité et de la véracité du Contenu qu’il
        publie.
        www.veryeasyagency.com ne pourra être tenu responsable des dommages
        directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site
        internet www.veryeasyagency.com, et résultant soit de l’utilisation d’un
        matériel ne répondant pas aux spécifications indiquées, soit de l’apparition
        d’un bug ou d’une incompatibilité.
        www.veryeasyagency.com ne pourra également être tenu responsable des
        dommages indirects (tels par exemple qu’une perte de marché ou perte
        d’une chance) consécutifs à l’utilisation du site www.veryeasyagency.com.
        Des espaces interactifs (possibilité de poser des questions dans l’espace
        contact) sont à la disposition des utilisateurs. www.windo-app.com se
        réserve le droit de supprimer, sans mise en demeure préalable, tout
        contenu déposé dans cet espace qui contreviendrait à la législation
        applicable en Ecosse, en particulier aux dispositions relatives à la protection
        des données. Le cas échéant, www.windo-app.com se réserve également la
        possibilité de mettre en cause la responsabilité civile et/ou pénale de
        l’utilisateur, notamment en cas de message à caractère raciste, injurieux,
        diffamant, ou pornograp`
    }, {
      heading: "6. Gestion des données personnelles.",
      des: `Le Client est informé des réglementations concernant la communication
        marketing, la loi du 21 Juin 2014 pour la confiance dans l’Economie
        Numérique, la Loi Informatique et Liberté du 06 Août 2004 ainsi que du
        Règlement Général sur la Protection des Données (RGPD : n° 2016-679).`
    }, {
      heading: "6.1 Responsables de la collecte des données personnelles",
      des: `Pour les Données Personnelles collectées dans le cadre de la création du
        compte personnel de l’Utilisateur et de sa navigation sur le Site, le
        responsable du traitement des Données Personnelles est : WINDO
        www.windo-app.com est représenté par Rodrigue Planté, son représentant
        légal
        En tant que responsable du traitement des données qu’il collecte,
        www.windo-app.com s’engage à respecter le cadre des dispositions légales en vigueur. Il lui appartient notamment au Client d’établir les finalités de ses
        traitements de données, de fournir à ses prospects et clients, à partir de la
        collecte de leurs consentements, une information complète sur le traitement
        de leurs données personnelles et de maintenir un registre des traitements
        conforme à la réalité.
        Chaque fois que www.windo-app.com traite des Données Personnelles,
        www.veryeasyagency.com prend toutes les mesures raisonnables pour
        s’assurer de l’exactitude et de la pertinence des Données Personnelles au
        regard des finalités pour lesquelles www.windo-app.com les traite.`
    }, {
      heading: "6.2 Finalité des données collectées",
      des: `www.windo-app.com est susceptible de traiter tout ou partie des données :
        • Pour permettre la navigation sur le Site et la gestion et la traçabilité des
        prestations et services commandés par l’utilisateur : données de
        connexion et d’utilisation du Site, facturation, historique des
        commandes, etc.
        • Pour prévenir et lutter contre la fraude informatique (spamming,
        hacking…) : matériel informatique utilisé pour la navigation, l’adresse IP,
        le mot de passe (hacké)
        • Pour améliorer la navigation sur le Site : données de connexion et
        d’utilisation
        • Pour mener des enquêtes de satisfaction facultatives sur www.windoapp.com : adresse email
        • Pour mener des campagnes de communication (sms, mail) : numéro de
        téléphone, adresse email
        www.windo-app.com ne commercialise pas vos données personnelles qui
        sont donc uniquement utilisées par nécessité ou à des fins statistiques et
        d’analyses.`
    }, {
      heading: "6.3 Droit d’accès, de rectification et d’opposition",
      des: `Conformément à la réglementation européenne en vigueur, les Utilisateurs
        de www.veryeasyagency.com disposent des droits suivants : • Droit d’accès (article 15 RGPD) et de rectification (article 16 RGPD), de
        mise à jour, de complétude des données des Utilisateurs droit de
        verrouillage ou d’effacement des données des Utilisateurs à caractère
        personnel (article 17 du RGPD), lorsqu’elles sont inexactes,
        incomplètes, équivoques, périmées, ou dont la collecte, l’utilisation, la
        communication ou la conservation est interdite
        • Droit de retirer à tout moment un consentement (article 13-2c RGPD)
        • droit à la limitation du traitement des données des Utilisateurs (article
        18 RGPD)
        • Droit d’opposition au traitement des données des Utilisateurs (article 21
        RGPD)
        • Droit à la portabilité des données que les Utilisateurs auront fournies,
        lorsque ces données font l’objet de traitements automatisés fondés sur
        leur consentement ou sur un contrat (article 20 RGPD)
        • droit de définir le sort des données des Utilisateurs après leur mort et
        de choisir à qui www.kim-communication.com devra communiquer (ou
        non) ses données à un tiers qu’ils aura préalablement désigné
        Dès que www.kim-communication.com a connaissance du décès d’un
        Utilisateur et à défaut d’instructions de sa part, www.windo-app.com
        s’engage à détruire ses données, sauf si leur conservation s’avère nécessaire
        à des fins probatoires ou pour répondre à une obligation légale.
        Si l’Utilisateur souhaite savoir comment www.windo-app.com utilise ses
        Données Personnelles, demander à les rectifier ou s’oppose à leur
        traitement, l’Utilisateur peut contacter www.veryeasyagency.com par écrit à
        l’adresse suivante :
        Very easy agency – Rodrigue Planté
        159 Rue Fernand Collardeau, 97410 Saint-Pierre , Réunion , France.
        Dans ce cas, l’Utilisateur doit indiquer les Données Personnelles qu’il
        souhaiterait que www.windo-app.com corrige, mette à jour ou supprime, en
        s’identifiant précisément avec une copie d’une pièce d’identité (carte
        d’identité ou passeport).
        Les demandes de suppression de Données Personnelles seront soumises
        aux obligations qui sont imposées à www.windo-app.com par la loi,
        notamment en matière de conservation ou d’archivage des documents.
        Enfin, les Utilisateurs de www.windo-app.com peuvent déposer une réclamation auprès des autorités de contrôle, et notamment de la CNIL
        (https://www.cnil.fr/fr/plaintes).`
    }
    ,
    {
      heading: `6.4 Non-communication des données personnelles`,
      des: `www.veryeasyagency.com s’interdit de traiter, héberger ou transférer les
      Informations collectées sur ses Clients vers un pays situé en dehors de
      l’Union européenne ou reconnu comme « non adéquat » par la Commission
      européenne sans en informer préalablement le client. Pour autant,
      www.veryeasyagency.com reste libre du choix de ses sous-traitants
      techniques et commerciaux à la condition qu’il présentent les garanties
      suffisantes au regard des exigences du Règlement Général sur la Protection
      des Données (RGPD : n° 2016-679).
      www.windo-app.com s’engage à prendre toutes les précautions nécessaires
      afin de préserver la sécurité des Informations et notamment qu’elles ne
      soient pas communiquées à des personnes non autorisées. Cependant, si
      un incident impactant l’intégrité ou la confidentialité des Informations du
      Client est portée à la connaissance de www.veryeasyagency.com, celle-ci
      devra dans les meilleurs délais informer le Client et lui communiquer les
      mesures de corrections prises. Par ailleurs www.windo-app.com ne collecte
      aucune « données sensibles ».
      Les Données Personnelles de l’Utilisateur peuvent être traitées par des
      filiales de www.veryeasyagency.com et des sous-traitants (prestataires de
      services), exclusivement afin de réaliser les finalités de la présente politique.
      Dans la limite de leurs attributions respectives et pour les finalités rappelées
      ci-dessus, les principales personnes susceptibles d’avoir accès aux données
      des Utilisateurs de www.windo-app.com sont principalement les agents de
      notre service client.`
    },
    {
      heading: `6.5 Types de données collectées`,
      des: `Concernant les utilisateurs d’un Site www. www.windo-app.com nous
      collectons les données suivantes qui sont indispensables au
      fonctionnement du service , et qui seront conservées pendant une période
      maximale de 60 mois mois après la fin de la relation contractuelle:
      Nom, Prénom, numéro de téléphone, e-mail, informations sur vos projets
      numériques, budget disponible pour vos projets numériques, différents
      fichiers (.pdf, images, etc.) liés à vos projets numériques.
      www.veryeasyagency.com collecte en outre des informations qui
      permettent d’améliorer l’expérience utilisateur et de proposer des conseils contextualisés :
      Nous utilisons des cookies, notamment ceux de Google Analytics, Google
      AdWords, Facebook, à des fins de statistiques et de tracking, publicités
      remarketing…
      Ces données sont conservées pour une période maximale de 60 mois mois
      après la fin de la relation contractuelle`
    },
    {
      heading: `7. Notification d’incident`,
      des: `Quels que soient les efforts fournis, aucune méthode de transmission sur
      Internet et aucune méthode de stockage électronique n’est complètement
      sûre. Nous ne pouvons en conséquence pas garantir une sécurité absolue.
      Si nous prenions connaissance d’une brèche de la sécurité, nous avertirions
      les utilisateurs concernés afin qu’ils puissent prendre les mesures
      appropriées. Nos procédures de notification d’incident tiennent compte de
      nos obligations légales, qu’elles se situent au niveau national ou européen.
      Nous nous engageons à informer pleinement nos clients de toutes les
      questions relevant de la sécurité de leur compte et à leur fournir toutes les
      informations nécessaires pour les aider à respecter leurs propres
      obligations réglementaires en matière de reporting.
      Aucune information personnelle de l’utilisateur du
      site www.veryeasyagency.com n’est publiée à l’insu de l’utilisateur,
      échangée, transférée, cédée ou vendue sur un support quelconque à des
      tiers. Seule l’hypothèse du rachat de www.windo-app.com et de ses droits
      permettrait la transmission des dites informations à l’éventuel acquéreur qui
      serait à son tour tenu de la même obligation de conservation et de
      modification des données vis à vis de l’utilisateur du site www.windoapp.com.`
    },
    {
      heading: `7.1Sécurité`,
      des: `Pour assurer la sécurité et la confidentialité des Données Personnelles et
      des Données Personnelles de Santé, www.windo-app.com utilise des
      réseaux protégés par des dispositifs standards tels que par pare-feu, la
      pseudonymisation, l’encryption et mot de passe.
      Lors du traitement des Données Personnelles, www.windoapp.com comprend toutes les mesures raisonnables visant à les protéger
      contre toute perte, utilisation détournée, accès non autorisé, divulgation,
      altération ou destruction.`
    },
    {
      heading: `8. Liens hypertextes « cookies » et balises (“tags”) internet`,
      des: `Le site www.veryeasyagency.com contient un certain nombre de liens
      hypertextes vers d’autres sites, mis en place avec l’autorisation de
      www.windo-app.com. Cependant, www.windo-app.com n’a pas la
      possibilité de vérifier le contenu des sites ainsi visités, et n’assumera en
      conséquence aucune responsabilité de ce fait.
      Sauf si vous décidez de désactiver les cookies, vous acceptez que le site
      puisse les utiliser. Vous pouvez à tout moment désactiver ces cookies et ce
      gratuitement à partir des possibilités de désactivation qui vous sont offertes
      et rappelées ci-après, sachant que cela peut réduire ou empêcher
      l’accessibilité à tout ou partie des Services proposés par le site.
      `
    },
    {
      heading: `9. « COOKIES »`,
      des: `Un « cookie » est un petit fichier d’information envoyé sur le navigateur de
      l’Utilisateur et enregistré au sein du terminal de l’Utilisateur (ex : ordinateur,
      smartphone), (ci-après « Cookies »). Ce fichier comprend des informations
      telles que le nom de domaine de l’Utilisateur, le fournisseur d’accès Internet
      de l’Utilisateur, le système d’exploitation de l’Utilisateur, ainsi que la date et
      l’heure d’accès. Les Cookies ne risquent en aucun cas d’endommager le
      terminal de l’Utilisateur.
      www.windo-app.com est susceptible de traiter les informations de
      l’Utilisateur concernant sa visite du Site, telles que les pages consultées, les
      recherches effectuées. Ces informations permettent
      à www.veryeasyagency.com d’améliorer le contenu du Site, de la navigation
      de l’Utilisateur.
      Les Cookies facilitant la navigation et/ou la fourniture des services proposés
      par le Site, l’Utilisateur peut configurer son navigateur pour qu’il lui
      permette de décider s’il souhaite ou non les accepter de manière à ce que
      des Cookies soient enregistrés dans le terminal ou, au contraire, qu’ils soient
      rejetés, soit systématiquement, soit selon leur émetteur. L’Utilisateur peut
      également configurer son logiciel de navigation de manière à ce que
      l’acceptation ou le refus des Cookies lui soient proposés ponctuellement,
      avant qu’un Cookie soit susceptible d’être enregistré dans son terminal.
      www.windo-app.com informe l’Utilisateur que, dans ce cas, il se peut que les fonctionnalités de son logiciel de navigation ne soient pas toutes
      disponibles.
      Si l’Utilisateur refuse l’enregistrement de Cookies dans son terminal ou son
      navigateur, ou si l’Utilisateur supprime ceux qui y sont enregistrés,
      l’Utilisateur est informé que sa navigation et son expérience sur le Site
      peuvent être limitées. Cela pourrait également être le cas lorsque
      www.windo-app.com ou l’un de ses prestataires ne peut pas reconnaître, à
      des fins de compatibilité technique, le type de navigateur utilisé par le
      terminal, les paramètres de langue et d’affichage ou le pays depuis lequel le
      terminal semble connecté à Internet.
      Le cas échéant, www.windo-app.com décline toute responsabilité pour les
      conséquences liées au fonctionnement dégradé du Site et des services
      éventuellement proposés par www.windo-app.com, résultant (i) du refus de
      Cookies par l’Utilisateur (ii) de l’impossibilité pour www.windo-app.com
      d’enregistrer ou de consulter les Cookies nécessaires à leur fonctionnement
      du fait du choix de l’Utilisateur. Pour la gestion des Cookies et des choix de
      l’Utilisateur, la configuration de chaque navigateur est différente. Elle est
      décrite dans le menu d’aide du navigateur, qui permettra de savoir de
      quelle manière l’Utilisateur peut modifier ses souhaits en matière de
      Cookies.
      À tout moment, l’Utilisateur peut faire le choix d’exprimer et de modifier ses
      souhaits en matière de Cookies. www.windo-app.com pourra en outre faire
      appel aux services de prestataires externes pour l’aider à recueillir et traiter
      les informations décrites dans cette section.
      Enfin, en cliquant sur les icônes dédiées aux réseaux sociaux Twitter,
      Facebook, Linkedin et Google Plus figurant sur le Site de www.windoapp.com ou dans son application mobile et si l’Utilisateur a accepté le
      dépôt de cookies en poursuivant sa navigation sur le Site Internet
      www.windo-app.com, Facebook, Linkedin et Google Plus peuvent
      également déposer des cookies sur vos terminaux (ordinateur, tablette,
      téléphone portable).
      Ces types de cookies ne sont déposés sur vos terminaux qu’à condition que
      vous y consentiez, en continuant votre navigation sur le Site Internet ou l’application mobile de www.windo-app.com. À tout moment, l’Utilisateur
      peut néanmoins revenir sur son consentement à ce que www.windoapp.com dépose ce type de cookies.`
    },
    {
      heading: `Article 9.1 BALISES (“TAGS”) INTERNET`,
      des: `www.windo-app.com peut employer occasionnellement des balises Internet
      (également appelées « tags », ou balises d’action, GIF à un pixel, GIF
      transparents, GIF invisibles et GIF un à un) et les déployer par l’intermédiaire
      d’un partenaire spécialiste d’analyses Web susceptible de se trouver (et
      donc de stocker les informations correspondantes, y compris l’adresse IP de
      l’Utilisateur) dans un pays étranger.
      Ces balises sont placées à la fois dans les publicités en ligne permettant aux
      internautes d’accéder au Site, et sur les différentes pages de celui-ci.
      Cette technologie permet à www.windo-app.com d’évaluer les réponses
      des visiteurs face au Site et l’efficacité de ses actions (par exemple, le
      nombre de fois où une page est ouverte et les informations consultées),
      ainsi que l’utilisation de ce Site par l’Utilisateur.
      Le prestataire externe pourra éventuellement recueillir des informations sur
      les visiteurs du Site et d’autres sites Internet grâce à ces balises, constituer
      des rapports sur l’activité du Site à l’attention de www.windo-app.com, et
      fournir d’autres services relatifs à l’utilisation de celui-ci et d’Internet.`
    },
    {
      heading: `10. Droit applicable et attribution de juridiction.`,
      des: `Tout litige en relation avec l’utilisation du site www.windo-app.com est
      soumis au droit Européen.
      En dehors des cas où la loi ne le permet pas, il est fait attribution exclusive
      de juridiction aux tribunaux compétents d’Europe.`
    },
  ]

  const des = [
    {
      heading: ``,
      des: `Conformément aux dispositions de la loi pour la Confiance dans l'Économie
    Numérique (LCEN) et de la loi Informatique et Libertés, nous vous présentons
    les mentions légales de l'application web "Windo". L'utilisation de cette
    application implique l'acceptation pleine et entière des présentes mentions
    légales.`
    }, {
      heading: `Éditeur de l'Application :`,
      des: `Nom : Very Easy Agency
    Siège social : 159 rue Fernand Collardeau, 97410 Saint-Pierre Réunion
    Représentant légal : Monsieur PLANTÉ Rodrigue
    SIRET : 85220995600030
    Directeur : Monsieur PLANTÉ Rodrigue
    Adresse e-mail : contact@veryeasyagency.com`
    }, {
      heading: `Hébergeur de l'Application : `,
      des: `Nom : LWS France
    Ligne direct : 01 77 62 3003
    Site web : https://www.lws.fr/`
    }, {
      heading: `Protection des Données Personnelles :`,
      des: `L'Entreprise s'engage à protéger vos données personnelles conformément à
    sa politique de confidentialité. Pour en savoir plus sur la collecte, l'utilisation
    et la protection de vos données personnelles, veuillez consulter notre
    politique de confidentialité.`
    }, {
      heading: `Propriété Intellectuelle :`,
      des: `L'ensemble des éléments de l'application web "Windo", notamment les
    textes, les images, les graphismes, les logos, les icônes, ainsi que leur mise
    en forme, sont la propriété exclusive de l'Entreprise à l'exception des
    marques, logos ou contenus appartenant à des partenaires ou auteurs tiers.
    `
    }, {
      heading: `Responsabilité :`,
      des: `L'Entreprise décline toute responsabilité quant aux éventuels
    dysfonctionnements ou dommages liés à l'utilisation de l'application, qu'ils
    soient directs ou indirects. L'application peut contenir des liens vers d'autres
    sites web, pour lesquels l'Entreprise n'assume aucune responsabilité.
    `
    }, {
      heading: `Modification des Mentions Légales :`,
      des: `L'Entreprise se réserve le droit de modifier, à tout moment et sans préavis, les
    présentes mentions légales afin de les adapter aux évolutions de l'application
    et/ou de la législation.`
    }, {
      heading: `Date de Dernière Mise à Jour :`,
      des: ` 07/08/2023
    Merci d'utiliser l'application web "Windo".`
    }, {
      heading: ``,
      des: ``
    },
  ];

  const ventes = [
    {
      heading: `ARTICLE 1 - APPLICATION ET OPPOSABILITÉ`,
      des: `1.Les présentes Conditions Générales régissent les relations contractuelles entre la société VERY EASY
    AGENCY, statut auto-entrepreneur, enregistré au Registre du Commerce et des Sociétés de Paris sous le
    numéro 85220995600030, représenté par M. Planté Rodrigue, exerçant l' activité de vente à distance sur
    catalogue général, et ci-après désignée « WINDO », d'une part, et toute personne physique ou morale
    ayant contracté le présent contrat, ci-après désignée « LE CLIENT », d'autre part.
    2. L’accès au services WINDO par le CLIENT implique l’acceptation expresse, préalable, pleine et entière
    des présente conditions générales. En créant son compte directement en ligne, le CLIENT directement en
    ligne et en approuvant la case « j’accepte les conditions générales de ventes » ou en signant le Bon de
    commande. Le CLIENT reconnaît qu’il est tenu par l’ensemble des présentes conditions générales d’accès
    au service WINDO.`
    }, {
      heading: `ARTICLE 2 - PRESTATIONS `,
      des: `Pou rassurer la promotion du CLIENT , WINDO propose un ensemble de services de marketing digital que
    le CLIENT sélectionne à la carte. Parmi ces services :
    -Une animation sous forme de jeu visant à collecter les coordonnées (email ou numéro de portable) des
    clients du CLIENT en vue de leur envoyer des communications régulières dans une optique de
    fidélisation.
    - Une animation visant à transformer les clients du CLIENT en abonnés sur les réseaux sociaux (Facebook, Instagram, Snapchat etc.)
    - Une animation visant à obtenir des avis positifs sur les sites de référence (Google, Trip Advisor etc.) afind’améliorer le référencement du CLIENT sur internet. Le CLIENT devra communiquer à WiINDO toutes les informations nécessaires à la mise en place de ces
    services. Le CLIENT est responsable de la disponibilité des éléments qu’il fournit pour le lancement du jeu
    et sa mise en avant.
    Le CLIENT aura accès au contenu relatif à sa communication sur son Tableau de bord (accès sécurisé via
    un identifiant email et un mot de passe). Cet identifiant et ce mot de passe sont strictement personnels et
    confidentiels et ne devront pas être communiqués, ni partagés avec des tiers. Le CLIENT assume l’entière
    responsabilité de l’utilisation, par lui-même et par toutes personnes à qui il a permis d’accéder aux
    données, des codes d’accès qui lui ont été fournis ou qu’il a pu créer.
    Les modalités de l’animation restent modifiables par le CLIENT à tout moment (cadeaux offerts, action
    demandée au client final etc.). `
    }, {
      heading: `ARTICLE 3 - PRESTATIONS OPTIONNELLES `,
      des: `En tant que client de Windo, l'application web de Very Easy Agency, nous sommes heureux de vous offrir
    la possibilité de commander un support physique pour présenter votre QR Code de manière élégante et
    professionnelle. Chez Very Easy Agency, nous croyons en l'importance de connecter le monde numérique
    avec le monde physique, offrant ainsi une expérience marketing plus riche et interactive.`
    }, {
      heading: `ARTICLE 5 - RESPONSABILITÉ DU PRESTATAIRE `,
      des: `Toot Sweet SAS fait ses meilleurs efforts pour assurer la disponibilité de ses services. Toutefois, le CLIENT
    est informé que le service est soumis à une simple obligation de moyen.
    WINDO ne peut être tenue responsable de dommages directs ou indirects, pertes ou frais, résultant de
    l’utilisation des services, ou de l’impossibilité de les utiliser, ou d’un mauvais fonctionnement, d’une
    interruption pour cause de manutention, de défaillance technique du serveur ou lié à une interruption de
    l’accès à Internet ou pour toute autre cause, d’un virus, ou encore d’un problème de ligne ou de système.
    Une suspension de facturation équivalente à la durée de suspension du service est prévue en cas
    d’interruption significative du service.
    La responsabilité de WINDO ne peut en aucun cas être recherchée, à quelque titre que ce soit, pour tout
    préjudice ou dommage direct ou indirect, perte ou frais, subi ou encouru par le CLIENT du fait de
    l’utilisation ou de l’impossibilité d’utilisation de l’accès au service, pour quelque cause que ce soit, tels que
    notamment mais sans que cela soit limitatif, perte d’information, perte de Clientèle, manque à gagner,
    perte d’image de marque ou autre trouble commercial. De convention expresse, la responsabilité de
    WINDO ne pourra en tout état de cause excéder le montant des sommes facturées au CLIENT par WINDO
    EI au titre des services fournis l’année civile encours. `
    }, {
      heading: `ARTICLE 6 - RESPONSABILITÉ DU CLIENT`,
      des: `Le CLIENT déclare être propriétaire des informations fournies à WINDO pour la création et l’actualisation
    de ses campagnes de communication (supports graphiques, textes, photos etc.).
    L’exactitude de l’ensemble des informations fournies par le CLIENT relève de sa responsabilité et fait
    appel à sa bonne foi .Le CLIENT déclare que les informations communiquées sont exactes et complètes et
    en assume la responsabilité. WINDO n’a aucune responsabilité quant au contenu des informations
    fournies par le CLIENT. `
    }, {
      heading: `ARTICLE 7 - MODALITÉS DE REGLEMENT ET DEFAUT DE PAIEMENT`,
      des: `Les règlements correspondant à l’accès aux services de WINDO sont payables mensuellement par
    autorisation de prélèvement ou en une fois par chèque à la commande.
    Le CLIENT s’engage à ce que le compte bancaire utilisé pour le paiement soit suffisamment approvisionné
    pour permettre le paiement.
    Dès lors que le CLIENT a donné plusieurs moyens de paiement à WINDO, et si l’un des moyens de
    paiement ne fonctionne pas,WINDO pourra réaliser une tentative de paiement sur les autres moyens
    transmis à WINDO.
    Toute somme non payée à l’échéance donnera lieu au paiement de pénalités de retard fixées à 3 (trois)
    fois le taux d’intérêt légal par jour de retard. Ces pénalités de retard seront dues dès le lendemain de la
    date d’échéance et seront exigibles sans qu’un rappel ne soit nécessaire, l’envoi d’une lettre
    recommandée n’étant pas requis pour déclencher le droit pour WINDO de les percevoir.
    Une indemnité forfaitaire de quarante euros(40€) sera également due à WINDO pour frais de
    recouvrement, à l’occasion de tout retard de paiement ou impayé. Cette indemnité est due pour chaque
    facture payée en retard et non sur l’ensemble des factures concernées.
    Toute fois, cette indemnité ne s’appliquera pas si leCLIENT est en cours de procédure de sauvegarde, de
    redressement ou de liquidation judiciaire. Si les frais de recouvrement réellement engagés sont
    supérieurs à ce montant forfaitaire, notamment en cas de recours à un cabinet de recouvrement externe,
    une indemnisation complémentaire pourra être demandée par WINDO auCLIENT.L’indemnité sera due en
    totalité même en cas de paiement partiel de la facture à l’échéance, quelle que soit la durée du retard. Ce
    montant forfaitaire s’ajoute aux pénalités de retard mais n’est pas inclus dans la base de calcul des
    pénalités.
    En cas de défaut de paiement de toute ou partie d’une facture à l’échéance fixée, WINDO aura la faculté
    d’exiger le règlement immédiat de l’intégralité de la somme due à quelque titre que ce soit, même si elles
    ne sont pas encore échues et quel que soit le mode de règlement prévu.
    Non obstant ce qui précède, en cas de liquidation judiciaire ou de cession, le Client s’engage à en
    informer WINDO dans les plus brefs délais. Dans cette hypothèse, WINDO constatera la résiliation du
    Contrat avec le Client sur la base des justifications apportées par le Client et annulera toutes les sommes
    restantes dues au titre du Contrat par le Client pour la durée restante sur l’abonnement.`
    }, {
      heading: `ARTICLE 8 - DURÉE DU CONTRAT - RESILIATION `,
      des: `Conformément aux dispositions légales en vigueur, LE CLIENT bénéficie d'un droit de rétractation, lui
    permettant de se rétracter du présent contrat sans donner de motif, dans un délai de 30 (trente)
    jours à compter de la date de souscription au contrat.
    Le présent Contrat prend effet à compter de la date indiquée par le client et présente un caractère
    définitif et irrévocable liant WINDO au CLIENT.
    Au terme de la période d’engagement initialement prévue, l’abonnement au Service WINDO sera
    reconduit tacitement par périodes successives identiques à la durée de la première souscription sauf
    dénonciation adressée par le CLIENT et sans période de préavis par email à l’adresse:
    contact@veryeasyagency.com.
    Le Contrat ne peut être dénoncé ou résilié avant son terme et/ou de manière unilatérale par le CLIENT,
    pour quelque cause, fondement ou grief que ce soit. En toute hypothèse, le CLIENT ne peut interrompre l’exécution du Contrat, même ponctuellement, pour des motifs liés à la fermeture temporaire de son
    établissement (vacances du mois d’août, fermeture annuelle etc.), étant précisé que les périodes de
    fermeture sont déjà prises en compte par WINDO au moment de la souscription de la commande. `
    }, {
      heading: `ARTICLE 9 - DONNÉES PERSONNELLES `,
      des: `• Données relatives aux Utilisateurs finaux
    WINDO agit en qualité de responsable de traitement dans le cadre des services fournis au CLIENT dans la
    mesure où WINDO détermine de manière autonome les finalités et les moyens des traitements de
    données personnelles
    relatifs aux Utilisateurs finaux. WINDO s’engage à se conformer aux exigences de la règlementation
    applicable en matière de protection des données à caractère personnel, notamment le Règlement
    européen n° 2016-679 du 27 avril
    2016 (« RGPD ») et la loi n°78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés.
    • Données relatives auCLIENT
    WINDO peut également être amené à traiter, en qualité de responsable de traitement, des données
    personnelles relatives aux employés ou mandataires sociaux du CLIENT limitées principalement aux noms
    et coordonnées professionnelles pour la gestion de la relation commerciale (gestion de la relation
    contractuelle, gestion de la facturation...). Les données sont archivées pendant 5ans à compter de la fin de
    la relation commerciale ou, en tout état de cause, pendant une durée n’excédant pas les délais de
    prescription légale applicables.
    • Destinataires et droits des personnes concernées
    Les Données personnelles traitées par WINDO ne sont cédées, transférées ou rendues accessibles à
    aucun tiers sous réserve des sous-traitants éventuels de WINDO, situés dans l’EEE et de toute
    restructuration et/ou toute opération de réorganisation de WINDO ou lorsqu’une telle communication
    est requise par la loi, une disposition réglementaire ou une décision judiciaire, ou nécessaire pour
    assurer la protection et la défense de ses droits. Les personnes concernées disposent d’un droit d’accès
    et de rectification de leurs Données, ainsi que de celui d’en demander l’effacement, de s’opposer à leur
    traitement et d’en obtenir la limitation ou la portabilité. Ces droits peuvent être exercés seulement par
    courrier électronique à l’adresse : contact@veryeasyagency.com.
    • Enfin, pour toute réclamation, le CLIENT dispose du droit de saisir la Commission Nationale de
    l’Informatique et des Libertés (CNIL). `
    }, {
      heading: `ARTICLE 10 - LITIGES - JURIDICTION COMPÉTENTE `,
      des: `Toutes contestations qui découlent du présent contrat ou qui s'y rapportent seront tranchées
    définitivement suivant le règlement de Conciliation et d'Arbitrage de la Chambre de Commerce
    Internationale sans aucun recours aux tribunaux ordinaires par un ou plusieurs arbitres nommés
    conformément à ce règlement et dont la sentence a un caractère obligatoire. Le tribunal arbitral sera juge
    de sa propre compétence et de la validité de la convention d'arbitrage.
    `
    }
  ]



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState([]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (type) => {
    if (type == "p") {
      setModalTitle('Politique de Confidentialité');
      setModalData(pp);
    } else if (type == "des") {
      setModalTitle(`Mentions Légales de l'Application Web "Windo"`);
      setModalData(des);
    } else if (type == "ventes") {
      setModalTitle(`CONDITIONS GÉNÉRALES`);
      setModalData(ventes);
    }

    setIsModalOpen(true);
  };

  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="d-flex felxMobile align-items-center justify-content-between">
          <div className="">
            <p className="mb-0">2023 © Windo. Tous droits réservés.</p>
          </div>

          <div className={styles.socialLogoWeb}>
            <div className="d-flex flex-row">
              <a href="https://www.facebook.com/Veryeasyagency" className="text-white" target="_blank">
                <div className=" mx-4 iconWrapper d-flex align-items-center justify-content-center"><i className="fa fa-facebook"></i></div>
              </a>
              <a href="https://www.instagram.com/very.easy_agency/?hl=fr" className="text-white" target="_blank">
                <div className=" mx-4 iconWrapper d-flex align-items-center justify-content-center"><i className="fa fa-instagram"></i></div>
              </a>
            </div>
          </div>
          <div className={` d-flex flex-column ${styles.linksWrapper}`}>
            <a href="https://veryeasyagency.com/contact" target="_blank" className="text-white footer-links">contact</a>
            <a onClick={() => openModal("p")} className="text-white footer-links">politique de confidentialité</a>
            <a onClick={() => openModal("des")} className="text-white footer-links">mentions légales</a>
            <a onClick={() => openModal("ventes")} className="text-white footer-links">conditions générales des ventes</a>
          </div>
          <div className={styles.socialLogoMobile}>
            <div className="d-flex flex-row">
              <a href="https://www.facebook.com/Veryeasyagency" className="text-white" target="_blank">
                <div className=" mx-4 iconWrapper d-flex align-items-center justify-content-center"><i className="fa fa-facebook"></i></div>
              </a>
              <a href="https://www.instagram.com/very.easy_agency/?hl=fr" className="text-white" target="_blank">
                <div className=" mx-2 iconWrapper d-flex align-items-center justify-content-center"><i className="fa fa-instagram"></i></div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <ContentCard isOpen={isModalOpen} onClose={closeModal} title={modalTitle} data={modalData} />
    </footer>
  );
};

export default Footer;