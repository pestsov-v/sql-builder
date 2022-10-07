import { TConnectionOptions } from "./db.interface"
import {Client} from 'pg'


class DatabaseConnector {
    private _CONNECT!: Client
    private _host!: string
    private _port!: number
    private _user!: string
    private _password!: string
    private _database!: string
    
    init(options: TConnectionOptions) {
        this._host = options.host || 'localhost'
        this._port = options.port || 5432
        this._user = options.user || 'root'
        this._password = options.password || 'root'
        this._database = options.database || 'default'
    }

    async connect() {
        this._CONNECT = new Client({
            user: this._user,
            database: this._database,
            host: this._host,
            password: this._password,
            port: this._port,
        })
        await this._CONNECT.connect()
    }

    async stop() {
        this._CONNECT.end()
    }
}

export default DatabaseConnector