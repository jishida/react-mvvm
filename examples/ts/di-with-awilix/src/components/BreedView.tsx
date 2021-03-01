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
    <div>
      <Bind $type='button' onClick={toggle}>
        {visible.to((v) => (v ? 'hide' : 'show'))}
      </Bind>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{name}</td>
          </tr>
          <Bind $type='tr' hidden={visible.to((v) => !v)}>
            <td>Origin</td>
            <td>{origin}</td>
          </Bind>
          <Bind $type='tr' hidden={visible.to((v) => !v)}>
            <td>Weight</td>
            <td>{weight} kg</td>
          </Bind>
        </tbody>
      </table>
    </div>
  );
}
