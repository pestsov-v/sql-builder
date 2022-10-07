import { TColumnName } from './db.interface'
import DBQuery from './db.query'
import DBStorage from '../src/storage'

const dbQuery = new DBQuery()


class DatabaseRunner<T extends TColumnName> {
    private readonly _databaseQuery: DBQuery
    private _query: string

    constructor() {
        this._databaseQuery = new DBQuery()
        this._query = ''
    }

    findAll(tableName: string, ...options: Array<keyof T>): string {
        const params = DBStorage.getModel(tableName).schema

        console.log(params)


        this._query =  this._databaseQuery
        .init(tableName)
        .select<T>(...options)
        .build()


        return this._query
    }
}

export default DatabaseRunner

  