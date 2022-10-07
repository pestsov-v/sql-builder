import DBStorage from "../src/storage";
import { IDatabaseQuery, TColumnName, TDatabaseStorage, TOrderByParam } from "./db.interface";
import DatabaseStorage from "./db.storage";

class DatabaseQuery implements IDatabaseQuery {
  private _query: string;
  private _tableName: string;
  private _keys!: string[]
  private _model!: TDatabaseStorage;
  private dbStorage: DatabaseStorage

  constructor() {
    this._query = "SELECT ";
    this._tableName = "";
    this.dbStorage = DBStorage
  } 

  init(tableName: string): this {
    this._tableName = tableName;
    this._model = this.dbStorage.getModel(tableName);
    if (!this._model) {
      throw new Error("Entity with this tableName: " + tableName + "does not exists");
    }
    this._keys = Object.keys(this._model.schema)

    return this;
  }

  select<T extends TColumnName>(...options: Array<keyof T>): this {
    let column = ''
    const matchedFields = this._keys.filter(e => options.indexOf(e) > -1).join(', ')
    column = column + matchedFields

    this._query = this._query + column + " FROM " + this._tableName;
    return this;
  }

  where<T extends TColumnName>(...options: Array<Partial<{[key in keyof T]: any}>>): this {
    let condidition = ''
    const columns = options[0]

    for (const column in columns) {
      const value = columns[column]
      condidition = condidition + ' ' + column + '=' + value + ','
    } 

    this._query = this._query + " where" + condidition;
    this._query = this._query.slice(0, -1);
    return this;
  }

  groupBy<T extends TColumnName>(...options: Array<keyof T>): this {
    let column = ''
    const matchedFields = this._keys.filter(e => options.indexOf(e) > -1).join(', ')
    column = column + matchedFields

    this._query = this._query + " GROUP BY " + column;
    return this;
  }

  orderBy<T extends TColumnName>(...options: Array<Partial<{[key in keyof T]: TOrderByParam}>>): this {
    let condidition = ''
    const columns = options[0]

    for (const column in columns) {
      const value = columns[column]
      condidition = condidition + ' ' + column + '=' + value + ','
    } 

    this._query = this._query + " ORDER BY" + condidition;
    this._query = this._query.slice(0, -1);
    return this;
  }

  innerJoin<TB1 extends TColumnName, TB2 extends TColumnName>(tableName: string, columns: {FK1: keyof TB1, FK2: keyof TB2}) {
    let condition = ''
    this._query = this._query + condition + ' ' + 'INNER JOIN' + ' ' + tableName + ' ON ' + this._tableName + '.' + columns.FK1.toString() + '=' + tableName + '.' + columns.FK2.toString()
 
    return this

  }

  build(): string {
    return this._query;
  }
}

export default DatabaseQuery;

