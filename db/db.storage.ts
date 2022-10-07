import { IDatabaseStorage, TDatabaseStorage } from "./db.interface";

class DatabaseStorage implements IDatabaseStorage {
  private modelStorage: Map<string, TDatabaseStorage>;

  constructor() {
    this.modelStorage = new Map();
  }

  public get models(): Map<string, TDatabaseStorage> {
    return this.modelStorage;
  }

  public setModel(modelName: string, model: TDatabaseStorage): void {
    this.modelStorage.set(modelName, model);
  }

  public getModel(modelName: string): TDatabaseStorage {
    const model = this.modelStorage.get(modelName);
    if (!model) {
      throw new Error("Model not found");
    }
    return model;
  }
}

export default DatabaseStorage;
