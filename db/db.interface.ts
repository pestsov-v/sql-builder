export type TQuery = string;

export interface IModel {
  readonly model: IDatabaseModel;
}

export interface IDatabaseModel {
  create(tableName: string, params: IDatabaseSchema): this;
  define(): void;
}

export interface IDatabaseStorage {
  readonly models: Map<string, TDatabaseStorage>;
  setModel(modelName: string, model: TDatabaseStorage): void;
  getModel(modelName: string): TDatabaseStorage;
}

export const enum ColumnType {
  STRING = "varchar",
  SMALLIN = "int4",
  BIGINT = "int8",
  BOOLEAN = "bool",
}

export interface IDatabaseSchema {
  [column: string]: {
    type: ColumnType;
    length?: number;
    nullable?: boolean;
    default?: string | number | boolean;
    unique?: boolean;
    required?: boolean;
    min?: number;
    max?: number;
  };
}

export type TDatabaseStorage = {schema: IDatabaseSchema} & {query: string}
export type TColumnName = {[key: string]: any}
export type TOrderByParam = 'ASC' | 'DESC'


export interface IDatabaseQuery {
  init(tableName: string): this
  select<T extends TColumnName>(...options: Array<keyof T>): this
  where<T extends TColumnName>(...options: Array<Partial<{[key in keyof T]: any}>>): this
  groupBy<T extends TColumnName>(...options: Array<keyof T>): this
  orderBy<T extends TColumnName>(...options: Array<Partial<{[key in keyof T]: TOrderByParam}>>): this
  innerJoin<TB1 extends TColumnName, TB2 extends TColumnName>(tableName: string, columns: {FK1: keyof TB1, FK2: keyof TB2}): this
  build(): string 
}