import React, { useEffect } from 'react';
import { useCradle } from '@jishida/react-awilix';
import { Bind } from '@jishida/react-mvvm';
import { BreedViewModel } from '../viewmodels';

export default function BreedView() {
  const { breed } = useCradle<{ breed: BreedViewModel }>();
  useEffect(
    () => () => {
      breed.dispose();
    },
    []
  );
  const { name, origin, weight, visible, toggle } = breed;
  return (
    <div className='breed-view'>
      <div className='breed-header'>
        <div className='breed-header-name'>{name}</div>
        <Bind $type='button' onClick={toggle}>
          {visible.to((v) => (v ? 'Hide' : 'Show'))}
        </Bind>
      </div>
      <Bind
        $type='table'
        className='breed-table'
        hidden={visible.to((v) => !v)}
      >
        <tbody>
          <tr>
            <th>Origin</th>
            <td>{origin}</td>
          </tr>
          <tr>
            <th>Weight</th>
            <td>{weight} kg</td>
          </tr>
        </tbody>
      </Bind>
    </div>
  );
}
