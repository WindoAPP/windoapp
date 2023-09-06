
import { useState } from 'react';
import styles from './scan.module.scss';
import React from 'react';
import WheelComponent from '../wheel/spinWheel';
import { useEffect } from 'react';
import { createCustomer, createNotification, getUser, updateCustomer } from '../../services/service';
import { useRouter } from 'next/router';
import Loader from '../Loader/loader';
import showNotifications from '../showNotifications/showNotifications';
import { useRef } from 'react';
import BalnktCard from '../blankCard/blankCard';
import ContentCard from '../contentCard/contentCard';
import Confetti from 'react-confetti'

const Scan = () => {
    const modalData1 = [
        {
            heading: `Article 1 - Collecte et Utilisation des Données Personnelles `,
            des: `1.1 Nous collectons les données personnelles suivantes lorsque vous utilisez
            l'application "Windo" :
            • Votre nom complet
            • Votre adresse e-mail
            • Votre numéro de téléphone
            • Les informations liées à votre participation au jeu de roue
            • Votre avis sur la fiche Google de notre magasin dans les résultats de
            recherche Google
            1.2 Ces données sont exclusivement réservées aux utilisateurs de
            l'application "Windo" et sont collectées dans le but de fournir une expérience
            de jeu personnalisée et améliorée.`
        },
        {
            heading: `Article 2 - Utilisation des Données Personnelles`,
            des: `2.1 Nous utilisons les données personnelles que nous collectons pour les
            finalités suivantes :
            • Gérer et administrer votre participation au jeu de roue
            • Vous contacter par e-mail, téléphone ou SMS pour vous informer des
            offres spéciales, promotions et nouvelles de notre société, avec votre
            consentement
            • Améliorer l'expérience utilisateur de l'application
            • Répondre à vos demandes et préoccupations
            2.2 En utilisant l'application "Windo", vous consentez à ce que vos données
            personnelles soient utilisées pour vous envoyer des offres promotionnelles de
            notre société.`
        },
        {
            heading: `Article 3 - Consentement`,
            des: `3.1 En utilisant notre application, vous consentez à ce que nous collections,
            utilisions et stockions vos données personnelles conformément à cette
            politique de confidentialité. Vous consentez également à ce que votre avis sur
            la fiche Google de notre magasin soit collecté et utilisé comme condition
            préalable à votre participation au jeu.`
        },
        {
            heading: `Article 4 - Responsabilité du Prestataire`,
            des: `4.1 Le prestataire qui a créé l'application "Windo" n'est plus responsable et
            se décharge de toutes accusations ou mal utilisations résultant de l'utilisation
            de l'application. Toute responsabilité liée à l'application, y compris la collecte
            et l'utilisation des données personnelles des utilisateurs, incombe à l'entité
            qui exploite l'application.`
        },
        {
            heading: `Article 5 - Résiliation de l'Engagement de l'Utilisateur`,
            des: `5.1 Si un utilisateur ne respecte pas les termes et conditions énoncés dans
            cette politique de confidentialité ou s'engage dans une utilisation abusive de
            l'application, nous nous réservons le droit d'interrompre son engagement et
            de mettre fin à son utilisation de l'application "Windo" à tout moment et sans
            préavis.`
        },
        {
            heading: `Article 6 - Sécurité des Données`,
            des: `6.1 Nous prenons des mesures techniques et organisationnelles pour garantir
            la sécurité de vos données personnelles et protéger vos informations contre
            tout accès non autorisé, perte, altération ou divulgation. Notre hébergeur
            LWS France assure un serveur sécurisé pour le stockage de vos données.`
        },
        {
            heading: `Article 7 - Partage des Données Personnelles`,
            des: `7.1 Nous ne partageons pas vos données personnelles avec des tiers sans
            votre consentement explicite, sauf dans les cas suivants :
            • Lorsque cela est nécessaire pour remplir nos obligations envers vous (par
            exemple, pour vous envoyer des offres de la société)
            • Lorsque nous sommes tenus de le faire par la loi
            `
        },
        {
            heading: `Article 8 - Vos Droits`,
            des: `8.1 Conformément aux lois applicables, vous avez le droit d'accéder à vos
            données personnelles, de les rectifier, de les effacer ou de limiter leur
            traitement. Vous pouvez également vous opposer au traitement de vos
            données à des fins de marketing direct. Pour exercer ces droits ou pour toute
            question concernant vos données personnelles, veuillez nous contacter à
            contact@veryeasyagency.com.`
        },
        {
            heading: `Article 9 - Modifications de la Politique de Confidentialité`,
            des: `Nous pouvons mettre à jour cette politique de confidentialité périodiquement
            pour refléter les changements dans nos pratiques de collecte et de traitement
            des données. Nous vous encourageons à consulter cette page régulièrement
            pour être informé des modifications éventuelles.
            Merci d'utiliser l'application web "Windo". Si vous avez des questions
            concernant cette politique de confidentialité, veuillez nous contacter à
            contact@veryeasyagency.com.`
        }
    ]

    const modalData2=[
        {
            heading:"1. Conditions générales d’utilisation du site et des services proposés.",
            des:`Le Site constitue une œuvre de l’esprit protégée par les dispositions du
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
            heading:"2. Description des services fournis" ,
            des:`Le site internet www.veryeasyagency.com a pour objet de fournir une
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
            heading:"3. Limitations contractuelles sur les données techniques.",
            des:`Le site Internet ne pourra être tenu responsable de dommages matériels
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
            heading:"4. Propriété intellectuelle et contrefaçons.",
            des:`www.veryeasyagency.com est propriétaire des droits de propriété
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
            heading:"5. Limitations de responsabilité.",
            des:`www.windo-app.com agit en tant qu’éditeur du site. www.windoapp.com est responsable de la qualité et de la véracité du Contenu qu’il
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
        },{
            heading:"6. Gestion des données personnelles.",
            des:`Le Client est informé des réglementations concernant la communication
            marketing, la loi du 21 Juin 2014 pour la confiance dans l’Economie
            Numérique, la Loi Informatique et Liberté du 06 Août 2004 ainsi que du
            Règlement Général sur la Protection des Données (RGPD : n° 2016-679).`
        },{
            heading:"6.1 Responsables de la collecte des données personnelles",
            des:`Pour les Données Personnelles collectées dans le cadre de la création du
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
        },{
            heading:"6.2 Finalité des données collectées",
            des:`www.windo-app.com est susceptible de traiter tout ou partie des données :
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
        },{
            heading:"6.3 Droit d’accès, de rectification et d’opposition",
            des:`Conformément à la réglementation européenne en vigueur, les Utilisateurs
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
          heading:`6.4 Non-communication des données personnelles`,
          des:`www.veryeasyagency.com s’interdit de traiter, héberger ou transférer les
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
          heading:`6.5 Types de données collectées`,
          des:`Concernant les utilisateurs d’un Site www. www.windo-app.com nous
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
          heading:`7. Notification d’incident`,
          des:`Quels que soient les efforts fournis, aucune méthode de transmission sur
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
          heading:`7.1Sécurité`,
          des:`Pour assurer la sécurité et la confidentialité des Données Personnelles et
          des Données Personnelles de Santé, www.windo-app.com utilise des
          réseaux protégés par des dispositifs standards tels que par pare-feu, la
          pseudonymisation, l’encryption et mot de passe.
          Lors du traitement des Données Personnelles, www.windoapp.com comprend toutes les mesures raisonnables visant à les protéger
          contre toute perte, utilisation détournée, accès non autorisé, divulgation,
          altération ou destruction.`
        },
        {
          heading:`8. Liens hypertextes « cookies » et balises (“tags”) internet`,
          des:`Le site www.veryeasyagency.com contient un certain nombre de liens
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
          heading:`9. « COOKIES »`,
          des:`Un « cookie » est un petit fichier d’information envoyé sur le navigateur de
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
          heading:`Article 9.1 BALISES (“TAGS”) INTERNET`,
          des:`www.windo-app.com peut employer occasionnellement des balises Internet
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
          heading:`10. Droit applicable et attribution de juridiction.`,
          des:`Tout litige en relation avec l’utilisation du site www.windo-app.com est
          soumis au droit Européen.
          En dehors des cas où la loi ne le permet pas, il est fait attribution exclusive
          de juridiction aux tribunaux compétents d’Europe.`
        },
    ]

    const router = useRouter();
    const [user, setUser] = useState({});
    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(true);
    const [segments, setSegments] = useState([]);
    const [segmentColors, setSegmentColors] = useState([]);
    const [formData, setFormData] = useState({ email: '', phoneNumber: '', name: '', user: '', facebook: '', instagram: '', termsCheck: false, spins: [] });
    const [step, setStep] = useState(0);
    const [cardToggle, setCardToggle] = useState(true);
    const [isFinalStep, setIsFinalStep] = useState(false);
    const [price, setPrice] = useState();
    const [screenHeight, setScreenHeight] = useState();
    const [spinCount, setSpinCount] = useState(0);
    const [wheelItemsArr, setWheelItemsArr] = useState([]);
    const [isWin, setIsWin] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [contentCardData, setContentCardData] = useState([]);
    const [contentCardTitle, setContentCardTitle] = useState("");


    const { id } = router.query;


    useEffect(() => {
        setScreenHeight(window.innerHeight);
        const savedValue = localStorage.getItem('spin_count');
        if (savedValue) {
            setSpinCount(savedValue);
        }
        if (id) {
            getUser(id).then(res => {
                if (res) {
                    setLoading(false)
                    setUser(res.user);

                    var segmentsTemp = res.user.wheelItems.map(obj => { return obj.item });
                    var segmentsColorTemp = res.user.wheelItems.map(obj => { return obj.color });

                    setSegments(segmentsTemp);
                    setSegmentColors(segmentsColorTemp);
                    setWheelItemsArr(res.user.wheelItems);
                }

            }).catch(err => {
                console.log(err);
                setLoading(false);
            });
        }
    }, [id]);




    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const registerFromSubmit = (e) => {
        e.preventDefault();
        var isValid = validateForm();

        if (isValid) {
            setLoading(true);
            formData.user = user._id;
            createCustomer(formData).then(res => {
                if (res) {
                    setLoading(false);
                    setIsModalOpen(false);
                    setCustomer(res.gust);
                }
            }).catch(err => {
                console.log(err);
                setLoading(false);
            })
        } else {
            return
        }
    }

    const validateForm = () => {

        if (formData.email == "") {
            showNotifications(true, "email required")
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            showNotifications(true, "Invalid email address")
            return false;
        }
        if (formData.name == "") {
            showNotifications(true, "Name required")
            return false;
        }
        if (formData.phoneNumber == "") {
            showNotifications(true, "Mobile Number required")
            return false;
        }
        if (formData.phoneNumber == "") {
            showNotifications(true, "Mobile Number")
            return false;
        }
        if (!formData.termsCheck) {
            showNotifications(true, "Please check terms and conditions")
            return false;
        }

        return true;
    };

    // Open a new window when the button is clicked
    const openNewWindow = () => {
        var url;
        if (spinCount == 0 ) {
            if((!user.shopId || user.shopId=="")){
                url =user.facebook;
            }else{
                url = `https://search.google.com/local/writereview?placeid=${user.shopId}`; // Replace with your desired URL
            }
            
        } else if (spinCount == 1) {
            url = user.facebook
        } else if (spinCount == 2) {
            url = user.instagram
        } else {
            url = user.tiktok
        }

        const width = "80%";
        const height = "auto";
        const windowFeatures = `width=${width},height=${height}`;

        const newWindow = window.open(url, '_blank', windowFeatures);

        newWindow.addEventListener('beforeunload', handleWindowClose);
        setStep(1);
        localStorage.setItem('spin_count', spinCount + 1);

        // Retrieve the value from local storage


    };

    const handleWindowClose = () => {
        // Perform any actions when the newly opened window is closed
        console.log('Newly opened window closed');
    };

    const onFinished = (winner) => {
        setTimeout(() => {


            var index = segments.indexOf(winner);
            var selectedItm = wheelItemsArr[index];


            var custimerData = customer;

            if (custimerData) {
                if (selectedItm.isWinningItem) {
                    setIsWin(true);
                    setStep(3);
                    setPrice(winner);
                } else {
                    setStep(3);
                    setIsWin(false);
                }
            }

            if (customer.spins) {
                custimerData.spins.push({
                    isWin: selectedItm.isWinningItem,
                    price: winner,
                    created_at: new Date()
                })
            } else {
                custimerData['spins'] = [];
                custimerData.spins.push({
                    isWin: selectedItm.isWinningItem,
                    price: winner,
                    created_at: new Date()
                })
            }
            updateCustomerFn(custimerData);
            var notificationData = {
                backColor: !selectedItm.isWinningItem ? "alert-secondary" : "alert-success",
                user: user._id,
                body: !selectedItm.isWinningItem ? "perdu le jeu tourner la roue" : "a gagné le prix en jouant à faire tourner la roue",
                icon: !selectedItm.isWinningItem ? "fa-certificate" : "fa-trophy",
                customer: customer._id

            }
            createNotifi(notificationData);
            setIsFinalStep(true)
        }, 3000)


    };

    const updateCustomerFn = (data) => {
        updateCustomer(data).then(res => {
            if (res) {
                setCustomer(data);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    const createNotifi = (data) => {
        createNotification(data).then(res => {
            if (res) {
                console.log("notfifi created!", res);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    const childRef = useRef(null);

    const handleCallChildFunction = () => {
        if (childRef.current) {
            childRef.current.spin(); // Call the child function using the ref
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        openNewWindow();
        setCardToggle(false);
        setIsModalOpen(true);

    };

    const closeModal1 = () => {
        setIsModalOpen1(false);
    };

    const openModal1 = () => {
        setIsModalOpen1(true);
        setContentCardData(modalData1);
        setContentCardTitle(`Politique de Confidentialité de l'Application Web Windo`);
    }

    const openModal2 = ()=>{
        setIsModalOpen1(true);
        setContentCardData(modalData2);
        setContentCardTitle(`Politique de Confidentialité`);
    }

    const wheelCardContent = () => (
        <div className={`d-flex flex-column align-items-center justify-content-center ${styles.wheelCardContentWrapper}`}>
            <h1 className='mb-4'>Laissez nous un avis ou abonnez-vous</h1>
            <div className=' d-flex flex-column align-items-start mb-4'>
                <div className={`d-flex flex-row align-items-center justify-content-center ${styles.cardListItem}`}>
                    <div className='d-flex flex-row align-items-center justify-content-center m-1'>1</div>
                    <p>Laissez nous un avis</p>
                </div>
                <div className={`d-flex flex-row align-items-center justify-content-center ${styles.cardListItem}`}>
                    <div className='d-flex flex-row align-items-center justify-content-center m-1'>2</div>
                    <p>Confirmer votre avis</p>
                </div>
                <div className={`d-flex flex-row align-items-center justify-content-center ${styles.cardListItem}`}>
                    <div className='d-flex flex-row align-items-center justify-content-center m-1'>3</div>
                    <p>Revenez tourner la roue!</p>
                </div>
            </div>
            <button className='commonBtnWindo w-50' onClick={closeModal}>Let's go !</button>
            <div className={`d-flex ${styles.imageArr}`}>
                <img className={styles.google} src='/google.png'></img>
                <img className={styles.insta} src='/insta.png'></img>
                <img className={styles.tiktok} src='/tiktok.png'></img>
                <img className={styles.fb} src='/fb.png'></img>
            </div>
        </div>
    )

    const collectUserDataCardContent = () => (
        <div>
            <h3 className='text-dark mb-4'>Veuillez remplir ce formulaire</h3>
            <form>
                <div className="form-group my-2">
                    <input type="text" className="form-control" name="name" placeholder="Entrez votre nom" value={formData.name} onChange={handleChange}></input>
                </div>
                <div className="form-group my-2">
                    <input type="email" className="form-control" name="email" placeholder="Entrer votre Email" value={formData.email} onChange={handleChange}></input>
                </div>
                <div className="form-group my-2">
                    <input type="tel" className="form-control" name="phoneNumber" placeholder="Entrez votre numéro de mobile" value={formData.phoneNumber} onChange={handleChange}></input>
                </div>
                <div className="form-check my-3">
                    <input type="checkbox" className="form-check-input" name="termsCheck" value={formData.termsCheck} onChange={handleChange}></input>
                    <label className="form-check-label text-start" for="termsCheck">J'accepte les termes et conditions <span className='text-primary cursor-pointer' onClick={openModal1}>Cliquez ici</span></label>
                </div>
                <button onClick={registerFromSubmit} className="commonBtnWindo w-75">Soumettre</button>
            </form>
        </div>
    )


    const FinalStepPageContent = () => (
        <>
            {isWin ?
                <div className={styles.finalStepWrapper}>
                    <h1>Bravo!</h1>
                    <h1> Vous avez gagné</h1>
                    <h2>{price}</h2>
                    <p>Présentez cette page à l'accueil pour recevoir votre cadeau.</p>
                    <Confetti />
                </div>
                : <div className={styles.finalStepWrapperLost}>
                    <h1>Désolé... 😢</h1>
                    <p>Vous avez perdu scannez pour une nouvelle chance !</p>
                    <Confetti  gravity={0.06}
                        numberOfPieces={60} drawShape={ctx => {
                        ctx.beginPath()
                        const sadEmojiSize = 30; 
                        const sadEmoji = "😢";
                        ctx.font = `${sadEmojiSize}px Arial`;
                        ctx.textBaseline = "middle";
                        ctx.textAlign = "center";
                        ctx.fillText(sadEmoji, 1, 1);
                        ctx.stroke()
                        ctx.closePath()
                    }} />
                </div>
            }
        </>
    )

    return (

        <div className={` d-flex justify-content-center ${styles.backgroundContainer}`} >
            {!loading ?
                <div>
                    <div className={`d-flex ${styles.wheelWrapperc}`} >
                        <div className={`d-flex flex-column p-3 ${styles.spinTopWrapper}`}>
                            <img style={{borderColor:user.dashboardConfig.primaryColor}} src={user.profileImage ? user.profileImage : "/shop.png"} className={`my-4 ${styles.spinLogo}`}></img>
                            <p style={{color:user.dashboardConfig.sloganColor}} className='align-self-center text-center '>{user.shopSlogan && user.shopSlogan} </p>
                            <button style={{backgroundColor:user.dashboardConfig.spinBtnColor}} onClick={handleCallChildFunction} type="button" className="btn btn-success btn-lg align-self-end shadow">{user.dashboardConfig.spinBtnText}</button>
                        </div>

                        <div className={styles.wheelWrapper}>
                            <WheelComponent
                                segments={segments}
                                segColors={segmentColors}
                                winningSegment="red"
                                onFinished={(winner) => onFinished(winner)}
                                primaryColor={user.dashboardConfig.primaryColor}
                                primaryColoraround="#0E4502"
                                contrastColor={user.dashboardConfig.secondaryColor}
                                buttonText=""
                                isOnlyOnce={false}
                                size={screenHeight > 782 ? 250 : 200}
                                width={200}
                                height={2000}
                                upDuration={50}
                                downDuration={2000}
                                ref={childRef}
                                fontSize={user.dashboardConfig.wheelItemTextSize}
                            />
                        </div>
                        <BalnktCard isOpen={isModalOpen} onClose={closeModal} data={cardToggle ? wheelCardContent : collectUserDataCardContent} />
                        <ContentCard isOpen={isModalOpen1} onClose={closeModal1} title={contentCardTitle} data={contentCardData} />
                        {isFinalStep && <BalnktCard isOpen={true} onClose={closeModal} data={FinalStepPageContent} />}
                    </div>
                </div> :
                <Loader />
            }
            <footer className={`text-light d-flex flex-row w-100 align-items-center justify-content-between px-3 py-1 ${styles.footer}`}>
                <div className='d-flex flex-row'>
                    <a href='/'>Découvrir</a>
                    <img className='mx-2' src='logo.png'></img>
                </div>
                <div className='d-flex flex-column'>
                    <p href='' onClick={openModal2}>Politique</p>
                    <a href='https://veryeasyagency.com/contact/' target='_blank'>Contact</a>
                </div>
            </footer>
        </div>
    );
};

export default Scan;