import { IDatabaseModel } from "./db.interface";

export class DatabaseBaseModel {
  protected _model!: IDatabaseModel;

  public get model() {
    return this._model;
  }
}
