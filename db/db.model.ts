import "reflect-metadata";
import DBStorage from "../src/storage";
import { IDatabaseSchema, IDatabaseModel, IDatabaseStorage, TQuery, TDatabaseStorage } from "./db.interface";
import DatabaseStorage from "./db.storage";

class DatabaseModel implements IDatabaseModel {
  private query: TQuery;
  private tableName: string;
  private tableParams: any
  private dbStorage: IDatabaseStorage

  constructor() {
    this.query = "";
    this.tableName = "";
    this.dbStorage = DBStorage
  }

  public create(tableName: string, params: IDatabaseSchema) {
    this.tableName = tableName;
    this.tableParams = params
    this.query = "create table " + this.tableName + " (";

    let paramString = "";
    for (const param in params) {
      const fields = params[param];

      if (fields["type"]) paramString = param + " " + fields["type"] + " ";
      if (fields["length"]) paramString = paramString + "(" + fields["length"] + ") ";
      if (fields["unique"]) paramString = paramString + "unique ";
      if (fields["default"]) paramString = paramString + "DEFAULT " + fields["default"] + " ";
      if (fields["required"]) paramString = paramString + "NOT NULL";

      this.query = this.query + paramString + ", ";
    }

    this.query = this.query.slice(0, -2);
    this.query = this.query + ")";

    return this;
  }

  public define(): void {
    this.dbStorage.setModel(this.tableName, {query: this.query, schema: this.tableParams })
  }
}

export default DatabaseModel;
