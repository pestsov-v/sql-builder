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