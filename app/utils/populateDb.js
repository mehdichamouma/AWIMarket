import config from "../../config"
import {
  initDb,
  clearDb,
  createUser,
  createSellingCompany,
  createProduct,
  createCommand,
  createJournal,
  createEntry,
  createObjective,
  createNotification
} from "../persistence/db"



let users = [
  {
    id: "1",
    name: "mehdi CHAMOUMA",
    email: "mehdi@gmail.com",
    password: "azerty",
    address: "montpellier",
    phone :"0658469285",
    birthday: new Date(1993,11,16),
    is_admin:true,
    profilePicture: "2deb71fd-ef15-4b52-a0e2-8988e19331f8.jpg",
    facebookId: "aFakeFbUserIdForMehdi"
  },
  {
    id: "2",
    name: "nassim VACHOR",
    email: "nassim@gmail.com",
    password: "azerty",
    address: "montpellier",
    phone :"0658469285",
    birthday: new Date(1992,11,16),
   is_admin:false,
   profilePicture: "4119ea64-31c5-46ec-8743-c9ca9575637d.jpg"
  },
  {
    id: "3",
    name: "arnaud ZARAGOZA",
    email: "arnaud@gmail.com",
    password: "azerty",
    address: "montpellier",
     phone :"0658469285",
     birthday: new Date(1994,11,16),
    is_admin:false,
    profilePicture: "e58a83ba-ab37-4a0e-9aee-9ff89b557a60.jpg"
  },
]

let sellingCompany = [
  {
    userId: "1",
    id: "1",
    nameSc: "company 1",
    siret: "abc",
    image: "585b23a9-f185-4ab1-95c6-6ec94fe71462.jpg"
  },
  {
    userId: "2",
    id: "2",
    nameSc: "company 2",
    siret: "pma",
    image: "585b23a9-f185-4ab1-95c6-6ec94fe71462.jpg"
  }
]
let products = [
  {
    idSc: "1",
    id: "1",
    Name: "screwdriver",
    desc: "Phillips cruciforme",
    price: 40,
    quantity: 20,
    image: "080a3a58-c3a9-46f3-9481-dc61704027dd.jpg",
  },
  {
    idSc: "1",
    id: "2",
    Name: "Hammer",
    desc: "Hammer made in USA",
    price: 30,
    quantity: 30,
    image: "eac7e993-b95a-40de-b8df-034605f4e450.jpg"
  },
  {
    idSc: "1",
    id: "3",
    Name: "electric screwdriver",
    desc: "electric screwdriver, to be faster in your work",
    price: 70,
    quantity: 40,
    image: "dd01b223-f2bc-46c9-a851-1530a26d4cf2.jpg"
  },
  {
    idSc: "2",
    id: "4",
    Name: "screw",
    desc: "Kit of 42 screws",
    price: 10,
    quantity: 65,
    image: "b43fed26-02f8-4f39-9f51-592a92711a7d.jpg",
  },
  {
    idSc: "2",
    id: "5",
    Name: "chair",
    desc: "wooden chair",
    price: 20,
    quantity: 50,
    image: "43c5b87f-b4b2-45ca-92ac-1644ca6732b7.jpg",
  },
]

let commands = [
  {
    idUser: "3",
    id: "1",
    products: [
      {id: "4", quantity: 2 , price: 20},
      {id: "1", quantity: 5 , price: 30},
    ],
  },
  {
    idUser: "3",
    id: "2",
    products: [
      {id: "4", quantity: 2 , price: 20},
    ],
  },
  {
    idUser: "2",
    id: "3",
    products: [
      {id: "1", quantity: 2 , price: 20},
      {id: "2", quantity: 5 , price: 30},
    ],
  }
]
let journals = [
  {
    userId: "1",
    id: "1",
    title: 'Projet AIOP',
    creationDate: new Date(2016,11,16),
  },
  {
    userId: "1",
    id: "4",
    title: 'Polytech',
    creationDate: new Date(),
  },
  {
    userId: "1",
    id: "5",
    title: 'PIFE',
    creationDate: new Date(),
  },
  {
    userId: "2",
    id:"2",

    userId: "2",
    id:"2",
    title: 'Stage IG5',
    creationDate: new Date(2016,11,15),
  },
  {
    userId: "3",
    id: "3",
    title: 'Java',
    creationDate: new Date(2016,11,14),
  }
]
let entries = [
  {
    journalId: "1",
    id: "1",
    description: 'bientôt les soutenances',
    ressourceType: 'text',
    ressourceUrl: '',
    creationDate: new Date(2016,11,14),
  },
  {
    journalId: "1",
    id: "2",
    description: 'finir le DAT pour ce soir',
    ressourceType: 'text',
    ressourceUrl: '',
    creationDate: new Date(2016,11,15),
  },
  {
    journalId: "2",
    id: "3",
    description: 'je dois trouver un stage',
    ressourceType: 'text',
    ressourceUrl: '',
    creationDate: new Date(2016,11,15),
  }
]
let objectives = [
  {
    journalId: "1",
    id: "1",
    description: 'avoir une bonne note en AIOP',
  },
  {
    journalId: "2",
    id: "2",
    description: 'Stage avec pre-embauche',
  },
  {
    journalId: "3",
    id: "3",
    description: 'integrer java community',
  }
]
let notifications = [
  {
    userId: "1",
    id: "1",
    content: 'commande validee',
    type: 'for user',
    creationDate: new Date(2016,11,16),
    readingDate: null,
  },
  {
    userId: "1",
    id: "2",
    content: 'commande validee',
    type: 'for user',
    creationDate: new Date(2016,12,16),
    readingDate:null,
  },
  {
    userId: "2",
    id: "3",
    content: 'payement effectue',
    type: 'for user',
    creationDate: new Date(2016,11,16),
    readingDate: null,
  }
]

let log = (shouldLog, ...args) => {
  shouldLog && console.log(...args)
}
export default (dbUrl, verbose = false) => {
  log(verbose, "clear database");
  initDb(dbUrl)
  return clearDb().then(() => {
    log(verbose, "database cleared");
    return Promise.all(users.map(u => createUser(u.id, u.name, u.email, u.password, u.address, u.phone, u.birthday, u.is_admin, u.profilePicture, u.facebookId)))
  })
  .then(() => {
    log(verbose, "users created");
    log(verbose, "create selling companies");
    return Promise.all(sellingCompany.map(sc => createSellingCompany(sc.userId, sc.id, sc.nameSc, sc.siret, sc.image)))
  })
  .then(() => {
    log(verbose, "create products");
    return Promise.all(products.map(p => createProduct(p.idSc, p.id, p.Name, p.desc, p.price, p.quantity, p.image)))
    log(verbose, "products created");
  })
  .then(() => {
    log(verbose, "create commands");
    //return Promise.resolve()
    return Promise.all(commands.map(c => createCommand(c.idUser, c.id, c.products)))
    log(verbose, "commands created");
  })
  .then(() => {
    log(verbose, "create journals");
    //return Promise.resolve()
    return Promise.all(journals.map(c => createJournal(c.userId, c.id, c.title, c.creationDate)))
    log(verbose, "journals created");
  })
  .then(() => {
    log(verbose, "create entries");
    //return Promise.resolve()
    return Promise.all(entries.map(c => createEntry(c.journalId, c.id, c.description, c.ressourceType, c.ressourceUrl, c.creationDate)))
    log(verbose, "entries created");
  })
  .then(() => {
    log(verbose, "create objectives");
    //return Promise.resolve()
    return Promise.all(objectives.map(c => createObjective(c.journalId, c.id, c.description)))
    log(verbose, "objectives created");
  })
  .then(() => {
    log(verbose, "create notifications");
    //return Promise.resolve()
    return Promise.all(notifications.map(c => createNotification(c.userId, c.id, c.content, c.type, c.creationDate, c.readingDate)))
    log(verbose, "notifications created");
  })
  .then(() => {
    log(verbose, "all it's right");
    return Promise.resolve()
  })
  .then(() => {
    log(verbose, "database populated");
  })
}
