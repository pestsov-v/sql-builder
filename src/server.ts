import { ColumnType } from "../db/db.interface";
import DBModel from '../db/db.model'
import DBQuery from '../db/db.query'

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


const s = dbQuery.init('User').findAll(['id', 'firstName']).where({id: 'asasas', firstName: 'asasas'}).groupBy(['id', 'firstName']).orderBy({id: "ASC", firstName: 'DESC'}).build()
console.log(s)