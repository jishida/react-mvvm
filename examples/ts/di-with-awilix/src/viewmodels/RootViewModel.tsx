import React from 'react';
import { observable, ref, proxy, computed } from '@jishida/react-mvvm';
import { asValue, AwilixContainer } from 'awilix';
import { ApiService, BreedData } from '../services';
import AnimalViewModel from './AnimalViewModel';
import BreedViewModel from './BreedViewModel';

export default class RootViewModel {
  container: AwilixContainer<{
    animal: AnimalViewModel;
    breed: BreedViewModel;
  }>;

  api: ApiService;

  animals = observable<AnimalViewModel[]>([]);

  controlState = observable<'unloaded' | 'loading' | 'loaded'>('unloaded');

  selectItems = computed(
    (animals, state) => {
      if (animals.length) {
        return animals.map(({ key, name }) => (
          <option key={key}>{name}</option>
        ));
      }
      return state === 'loading' ? null : <option>Select an animal</option>;
    },
    [this.animals, this.controlState]
  );

  breeds = observable<BreedViewModel[]>([]);

  selectedAnimalName = observable('');

  state = proxy<RootViewModel>(this, 'state');

  constructor(cradle: { container: AwilixContainer; api: ApiService }) {
    this.container = cradle.container;
    this.api = cradle.api;
  }

  private createAnimal(name: string) {
    const scope = this.container.createScope();
    scope.register('container', asValue(scope));
    scope.register('animalName', asValue(name));
    return scope.cradle.animal;
  }

  private createBreed(data: BreedData) {
    const scope = this.container.createScope();
    scope.register('container', asValue(scope));
    scope.register('breedData', asValue(data));
    return scope.cradle.breed;
  }

  loadAnimals = async () => {
    if (this.state.controlState === 'unloaded') {
      this.state.controlState = 'loading';
      try {
        const animalNames = await this.api.getAnimals();
        this.state.animals = animalNames.map((name) => this.createAnimal(name));
        if (!animalNames.length) {
          throw new Error();
        }
        this.state.controlState = 'loaded';
        this.state.selectedAnimalName = animalNames[0];
      } catch {
        this.state.controlState = 'unloaded';
      }
    }
  };

  loadBreeds = async () => {
    if (this.state.selectedAnimalName) {
      try {
        this.state.controlState = 'loading';
        const breeds = await this.api.getBreeds(this.state.selectedAnimalName);
        this.state.breeds = breeds.map((data) => this.createBreed(data));
      } catch {
      } finally {
        this.state.controlState = 'loaded';
      }
    }
  };
}
