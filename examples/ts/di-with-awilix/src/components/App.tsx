import React, { ChangeEvent } from 'react';
import { ContainerProvider, useCradle } from '@jishida/react-awilix';
import { Bind } from '@jishida/react-mvvm';
import { RootViewModel } from '../viewmodels';
import BreedView from './BreedView';

export default function App() {
  const {
    root: {
      breeds,
      selectedAnimalName,
      selectItems,
      controlState,
      loadAnimals,
      loadBreeds,
    },
  } = useCradle<{ root: RootViewModel }>();
  return (
    <div>
      <div>
        <Bind
          $type='select'
          onClick={loadAnimals}
          disabled={controlState.to((v) => v === 'loading')}
          value={selectedAnimalName}
          onChange={selectedAnimalName.bindValue(
            (e: ChangeEvent<HTMLSelectElement>) => e.target.value
          )}
        >
          {selectItems}
        </Bind>
        <Bind
          $type='button'
          disabled={controlState.to((v) => v !== 'loaded')}
          onClick={loadBreeds}
        >
          load
        </Bind>
      </div>
      <Bind $type='div'>
        {breeds.to((v) =>
          v.map(({ container, key }) => (
            <ContainerProvider key={key} container={container}>
              <BreedView />
            </ContainerProvider>
          ))
        )}
      </Bind>
    </div>
  );
}
