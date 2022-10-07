import DBStorage from "../src/storage";
import { IDatabaseSchema, TDatabaseStorage } from "./db.interface";
import DatabaseStorage from "./db.storage";

type TColumns = string[]
type TCondition = {
  [key: string]: any
}

class DatabaseQuery {
  private _query: string;
  private _tableName: string;
  private _tableParams!: any;
  private _keys!: string[]
  private _model!: TDatabaseStorage;
  private dbStorage: DatabaseStorage

  constructor() {
    this._query = "select ";
    this._tableName = "";
    this.dbStorage = DBStorage
  } 

  init(tableName: string): this {
    this._tableName = tableName;
    this._model = this.dbStorage.getModel(tableName);
    if (!this._model) {
      throw new Error("Entity with this tableName: " + tableName + "does not exists");
    }
    this._tableParams = this._model.schema
    this._keys = Object.keys(this._model.schema)

    return this;
  }

  findAll(options: TColumns) {
    let column = ''
    const matchedFields = this._keys.filter(e => options.indexOf(e) > -1).join(', ')
    column = column + matchedFields

    this._query = this._query + column + " from " + this._tableName;
    return this;
  }

  where(options: TCondition) {
    let condidition = ''
    for (const key in options) {
      const value = options[key]
      condidition = condidition + ' ' + key + '=' + value + ','
    } 

    this._query = this._query + " where" + condidition;
    this._query = this._query.slice(0, -1);
    return this;
  }

  build() {
    return this._query;
  }
}

export default DatabaseQuery;

