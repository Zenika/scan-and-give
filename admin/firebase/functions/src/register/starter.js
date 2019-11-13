const admin = require('firebase-admin')

const charities = [
  {
    name: 'Musique pour Tous',
    description: `Musique pour Tous est une association dont l’objectif est de favoriser, par l’apprentissage de la musique, l’épanouissement et l’intégration sociale de jeunes âgés de 7 à 20 ans qui n’ont pas accès à cet art pour des raisons économiques, sociales ou culturelles. Nous mettons en place des ateliers de musique ludiques, gratuits et collectifs animés bénévolement par des musiciens amateurs locaux et passionnés dans des structures d’accueil travaillant déjà avec des jeunes. Par la pratique régulière et ludique de l’instrument, ces ateliers visent à renforcer l’estime de soi des participants, de stimuler leur créativité et de créer une expérience de vivre-ensemble enrichissante.`,
    image: `https://firebasestorage.googleapis.com/v0/b/scan-and-give.appspot.com/o/PEwh8AAFHAdJjz7CBcyumwnO11R2%2Fcharities%2Ffe886c3c-11c5-4eb5-b7c3-0cfdbd5520b9.png?alt=media&token=40f892b4-9d33-4581-98ec-398e92662e65`,
    notes: ''
  },
  {
    name: 'Talacatak',
    description: `Talacatak se présente comme un laboratoire, une passerelle de recherches, de développements et d’actions menées envers différents projets éducatifs, pédagogiques, artistiques et culturels liant les arts à l’environnement.

    Tout à commencé lors de la rencontre entre Lionel Haïun, fondateur de l’association, et un bidon abandonné sur la voie publique ! Aujourd’hui le projet de Talacatak se caractérise par une action environnementale et des actions artistiques, éducatives et sociales, partagées par des centaines de bénéficiaire.
    
    Talacatak est une association culturelle reconnue d’utilité publique, créée à Paris en 2004. Née de la fabrication artisanale d’instruments de musique en matériaux récupérés, nous nous sommes rapidement tournés vers la transmission de ce savoir-faire et de ses valeurs. D’emblée, la démarche de Talacatak s’est construite autour d’un véritable questionnement pratique et éthique, du processus artistique et des valeurs de l’acte créatif.`,
    image: `https://firebasestorage.googleapis.com/v0/b/scan-and-give.appspot.com/o/PEwh8AAFHAdJjz7CBcyumwnO11R2%2Fcharities%2Ffc877d8b-7daf-4f34-909b-1b5c15b75caf.jpg?alt=media&token=d7f5590a-5676-4f01-8a94-e56a8fe44b8f`,
    notes: ''
  },
  {
    name: 'Wikimédia',
    description: `Imaginez un monde où chacun aurait accès à l’ensemble des connaissances de l’humanité. Wikimédia France aspire à cet idéal et oeuvre pour la diffusion libre et gratuite des savoirs sur Wikipédia.

    Un peu plus de détail...
    
    Wikimédia France rassemble des contenus éducatifs sous licence libre, et les dissémine mondialement sur Wikipédia et ses projets frères. Ses missions sont de soutenir et former toutes personnes souhaitant participer et de diffuser le fruit de ce travail collaboratif.
    
    L’association sollicite avec les musées, les universités et toutes institutions de savoir pour libérer leurs richesses sur Wikipédia. Et puisque la connaissance n’est libre que si l’on sait s’en servir, nous enseignons à petits et grands l’usage de l’information et du savoir « faire ensemble » en France, et dans toute la francophonie.
    
    Par exemple grâce à la générosité du public l'association mobilise institutions et grand public à la création de biographies de femmes, grandes absentes de l'encyclopédie ( 18% de biographes de femmes contre 82% dédiées aux hommes).`,
    image: `https://firebasestorage.googleapis.com/v0/b/scan-and-give.appspot.com/o/PEwh8AAFHAdJjz7CBcyumwnO11R2%2Fcharities%2Faf83d98d-a3b0-4d03-83c3-3085da5aacc8.png?alt=media&token=90dc7eaf-28dd-4dd0-b634-cd7b248dd7c0`,
    notes: ''
  },
  {
    name: 'Les restos du coeur',
    description: `Fondés par Coluche en 1985, les Restos du Cœur est une association loi de 1901, reconnue d’utilité publique, sous le nom officiel de « les Restaurants du Cœur – les Relais du Cœur ». Ils ont pour but « d’aider et d’apporter une assistance bénévole aux personnes démunies, notamment dans le domaine alimentaire par l’accès à des repas gratuits, et par la participation à leur insertion sociale et économique, ainsi qu’à toute action contre la pauvreté sous toutes ses formes ». C’est pour répondre à la diversité des besoins et des différents publics accueillis que les Restos redoublent d’efforts pour poursuivre leurs actions d’aide à la personne tout au long de l’année. L’aide alimentaire permet une aide d’urgence mais représente surtout le point de contact privilégié pour permettre un accompagnement vers l’autonomie.`,
    image: `https://firebasestorage.googleapis.com/v0/b/scan-and-give.appspot.com/o/PEwh8AAFHAdJjz7CBcyumwnO11R2%2Fcharities%2Ff754f289-aa87-4553-97aa-3f129c1dc11d.png?alt=media&token=59018a98-dcc2-4cab-9378-8fd930f1a89a`,
    notes: ''
  }
]

const events = [
  {
    name: 'Example Event',
    image: `https://firebasestorage.googleapis.com/v0/b/scan-and-give.appspot.com/o/PEwh8AAFHAdJjz7CBcyumwnO11R2%2Fevents%2F39c6ec3d-6671-45f8-b3c8-1ad3eeedeea9.png?alt=media&token=b0dd5c20-2a7c-48bf-832f-488421c7c0fb`,
    date: new Date(),
    devise: 'USD',
    multiplier: 1,
    color: '#123456',
    customCss: '',
    donations: [],
    charitiesIndex: [2, 3]
  },
  {
    name: 'Demo: Devfest Nantes 2019',
    image: `https://firebasestorage.googleapis.com/v0/b/scan-and-give.appspot.com/o/PEwh8AAFHAdJjz7CBcyumwnO11R2%2Fevents%2F81bf0774-7222-450a-80f4-8474d3607173.png?alt=media&token=ddf580a9-25e9-457e-9abb-936acf927bf5`,
    date: new admin.firestore.Timestamp(1571616000, 0),
    devise: 'EUR',
    multiplier: 2,
    color: '#6f1437',
    customCss: `@import url('https://fonts.googleapis.com/css?family=New+Rocker&display=swap');

    #header .main-header .title,
    #charity .wrapper .content .title {
      font-family: 'New Rocker';
    }`,
    donations: [
      {
        hash: '17699be04a0c2a37ef9b4aaebc42b75918b020ba',
        charityIndex: 0,
        date: new admin.firestore.Timestamp(1571616000, 1)
      },
      {
        hash: '3b2781dd3a5a9e960e3396204c098da19afc7836',
        charityIndex: 1,
        date: new admin.firestore.Timestamp(1571616000, 2)
      },
      {
        hash: '56c54f0ba5bd07441c422a2083dbc48b6bc00a86',
        charityIndex: 2,
        date: new admin.firestore.Timestamp(1571616000, 3)
      },
      {
        hash: '652279ebe2651571d50b5ac508d7a975420084b4',
        charityIndex: 3,
        date: new admin.firestore.Timestamp(1571616000, 4)
      },
      {
        hash: '757710e3444dbb671155630ab4978f2c8db740bf',
        charityIndex: 0,
        date: new admin.firestore.Timestamp(1571616000, 5)
      },
      {
        hash: '9f9ed5bcecfec634a900aeb1a6ebecfc5fc7c278',
        charityIndex: 1,
        date: new admin.firestore.Timestamp(1571616000, 6)
      },
      {
        hash: 'cbd61b2a32d24648fbee6a068bbc0aa9b73e6531',
        charityIndex: 0,
        date: new admin.firestore.Timestamp(1571616000, 7)
      }
    ],
    charitiesIndex: [0, 1, 2, 3]
  }
]

module.exports = { events, charities }
