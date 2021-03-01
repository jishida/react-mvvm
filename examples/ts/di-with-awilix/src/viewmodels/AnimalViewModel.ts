export default class AnimalViewModel {
  key: string;

  name: string;

  constructor(cradle: { key: string; animalName: string }) {
    this.key = cradle.key;
    this.name = cradle.animalName;
  }
}
