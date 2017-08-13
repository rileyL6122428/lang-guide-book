export class Translation {

  static fromPOJO(pojo: Object) {
    let translation: Translation = new Translation();

    translation._id = pojo['id'];
    translation._name = pojo["name"];
    translation._ownerName = pojo["ownerName"];

    return translation;
  }

  private _id: number;
  private _name: string;
  private _ownerName: string;

  get id(): number {
    return this.id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get ownerName(): string {
    return this._ownerName;
  }

}
