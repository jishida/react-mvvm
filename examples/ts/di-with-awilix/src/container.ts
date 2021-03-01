import { configureContext } from '@jishida/react-awilix';
import { asClass, asFunction, asValue, createContainer } from 'awilix';
import { v4 as uuid } from 'uuid';
import { ApiService } from './services';
import { RootViewModel, AnimalViewModel, BreedViewModel } from './viewmodels';

// eslint-disable-next-line import/prefer-default-export
export function configure() {
  configureContext(() => {
    const container = createContainer();
    container.register('container', asValue(container));
    container.register('root', asClass(RootViewModel).singleton());
    container.register('animal', asClass(AnimalViewModel).scoped());
    container.register('breed', asClass(BreedViewModel).scoped());
    container.register(
      'key',
      asFunction(() => uuid())
    );
    container.register('api', asClass(ApiService).singleton());
    return container;
  });
}
