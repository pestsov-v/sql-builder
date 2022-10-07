import DBStorage from "../src/storage";
import { IDatabaseSchema, TDatabaseStorage } from "./db.interface";
import DatabaseStorage from "./db.storage";

class DatabaseQuery {
  private _query: string;
  private _tableName: string;
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
    return this;
  }

  findAll(options: string[]) {
    this._query = this._query + " from " + this._tableName;
    return this;
  }

  where(options: any) {
    this._query + " where ";
    return this;
  }

  build() {
    return this._query;
  }
}

export default DatabaseQuery;
