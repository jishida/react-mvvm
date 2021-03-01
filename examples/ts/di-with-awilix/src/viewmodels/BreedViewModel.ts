import { observable, proxy } from '@jishida/react-mvvm';
import { AwilixContainer } from 'awilix';
import { BreedData } from '../services';

export default class BreedViewModel {
  container: AwilixContainer;

  key: string;

  name: string;

  origin: string;

  weight: string;

  visible = observable(false);

  state = proxy<BreedViewModel>(this, 'state');

  constructor(cradle: {
    container: AwilixContainer;
    key: string;
    breedData: BreedData;
  }) {
    this.container = cradle.container;
    this.key = cradle.key;
    this.name = cradle.breedData.name;
    this.origin = cradle.breedData.origin;
    this.weight = cradle.breedData.weight;
  }

  toggle = () => {
    this.state.visible = !this.state.visible;
  };

  dispose() {
    this.container.dispose();
  }
}
