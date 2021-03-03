import React, { ChangeEvent, useMemo } from 'react';
import { ContainerProvider, useCradle } from '@jishida/react-awilix';
import { Bind } from '@jishida/react-mvvm';
import { RootViewModel } from '../viewmodels';
import BreedView from './BreedView';

export default function App() {
  const {
    root: { animals, breeds, selectedAnimalName, controlState, loadAnimals },
  } = useCradle<{ root: RootViewModel }>();

  useMemo(loadAnimals, []);

  return (
    <div className='app-root'>
      <div className='animal-selector'>
        <div className='animal-selector-select'>
          <label>
            <div className='animal-selector-label'>Select an animal</div>
            <Bind
              $type='select'
              disabled={controlState.to((v) => v === 'loading')}
              value={selectedAnimalName}
              onChange={selectedAnimalName.bindValue(
                (e: ChangeEvent<HTMLSelectElement>) => e.target.value
              )}
            >
              {animals.to((v) =>
                v.length
                  ? v.map(({ key, name }) => <option key={key}>{name}</option>)
                  : null
              )}
            </Bind>
          </label>
        </div>
        <Bind
          $type='div'
          className='animal-selector-button'
          hidden={controlState.to((v) => v !== 'unloaded')}
        >
          <button type='button' onClick={loadAnimals}>
            Reload
          </button>
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
