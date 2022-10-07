import { ColumnType, IDatabaseSchema } from "../db/db.interface";
import DBModel from '../db/db.model'
import DBQuery from '../db/db.query'
import DBStorage from "./storage";

const dbModel = new DBModel()
const dbQuery = new DBQuery()


dbModel.create("User", {
    id: {
      type: ColumnType.STRING,
      length: 32,
      required: true,
    },
    firstName: {
      type: ColumnType.BIGINT,
      length: 40,
      required: true,
      unique: true,
      default: 421414,
    },
    lastName: {
      type: ColumnType.BIGINT,
      default: true,
      required: true,
      unique: true,
    },
    price: {
      type: ColumnType.BIGINT,
      default: 0,
    },
  });

dbModel.define()

const dbModel2 = new DBModel()

dbModel2.create("Address", {
    city: {
      type: ColumnType.STRING,
      length: 32,
      required: true,
    },
    street: {
      type: ColumnType.STRING,
      length: 40,
      required: true,
      unique: true,
    },
    house: {
      type: ColumnType.STRING,
      default: true,
      required: true,
      unique: true,
    },
  });

dbModel2.define()

interface IUser {
  id: string
  firstName: string
  lastName: string;
  price: number
}

interface IAddress {
  city: string,
  street: string
  house: string
}

interface IBusket {
  name: string
  items: string
  price: string
}

const db = dbQuery
    .init('Address')
    .select<IAddress>('house', 'street')
    .where<IAddress>({city: 'dasdad'})
    .innerJoin<IAddress, IUser>('User', {FK1: 'city', FK2: 'lastName'})
    .innerJoin<IUser, IBusket>('User', {FK1: 'firstName', FK2: 'name'})
    .groupBy<IAddress>('city')
    .orderBy<IAddress>({city: 'ASC'})
    .build()
  
console.log(db)