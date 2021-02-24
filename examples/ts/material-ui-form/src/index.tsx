import React from 'react';
import ReactDOM from 'react-dom';
import { Button, TextField, Typography } from '@material-ui/core';
import {
  Bind,
  computed,
  observable,
  parsable,
  proxy,
  validator,
} from '@jishida/react-mvvm';

function parseNonEmpty(str: string) {
  const s = str.trim();
  if (!s) {
    throw new Error('cannot be blank');
  }
  return s;
}

class PersonViewModel {
  firstName = parsable<string, string, HTMLInputElement>('', parseNonEmpty, {
    ref: true,
  });

  lastName = parsable<string, string, HTMLInputElement>('', parseNonEmpty, {
    ref: true,
  });

  fullName = computed((firstName, lastName) => `${firstName} ${lastName}`, [
    this.firstName,
    this.lastName,
  ]);

  refs = proxy<PersonViewModel>(this, 'ref');

  state = proxy<PersonViewModel>(this, 'state');

  results = proxy<PersonViewModel>(this, 'result');

  errors = proxy<PersonViewModel>(this, 'error');

  constructor(readonly key: number) {}
}

class FormViewModel {
  people = observable<PersonViewModel[]>([]);

  display = observable('');

  validator = validator({ strategy: 'watch' });

  state = proxy<FormViewModel>(this, 'state');

  constructor() {
    this.addPerson();
  }

  addPerson = () => {
    const person = new PersonViewModel(this.state.people.length + 1);
    this.validator.register(person);
    this.state.people.push(person);
    this.people.notify();
  };

  removePerson = () => {
    const person = this.state.people.pop();
    if (person) {
      this.validator.unregister(person);
      this.people.notify();
    }
  };

  submit = () => {
    if (this.validator.validate()) {
      const results = this.state.people.map((person) => person.results);
      this.state.display = JSON.stringify(results, undefined, 2);
    } else {
      this.state.display = 'Error';
      this.state.people.some((person) =>
        Object.entries(person.errors).some(([key, err]) => {
          if (err) {
            (person.refs as any)[key].focus();
            return true;
          }
          return false;
        })
      );
    }
  };
}

const store = new FormViewModel();

const PersonView = React.memo(
  ({ person: { key, firstName, lastName } }: { person: PersonViewModel }) => (
    <fieldset>
      <Typography component='legend'>{`Person ${key}`}</Typography>
      <div className='form-item'>
        <Bind
          $type={TextField}
          label='First Name'
          inputRef={firstName.ref}
          value={firstName}
          onChange={firstName.bindValue((e) => e.target.value)}
          error={firstName.hasError}
          helperText={firstName.errorMessage}
        />
      </div>
      <div className='form-item'>
        <Bind
          $type={TextField}
          label='Last Name'
          inputRef={lastName.ref}
          value={lastName}
          onChange={lastName.bindValue((e) => e.target.value)}
          error={lastName.hasError}
          helperText={lastName.errorMessage}
        />
      </div>
    </fieldset>
  )
);

function FormView() {
  const { people, display, addPerson, removePerson, submit } = store;
  return (
    <div className='content'>
      <div className='display'>
        <fieldset>
          <Typography component='legend'>Submit Parameters (JSON)</Typography>
          <Bind
            $type={Typography}
            className='display-text'
            color={display.to((s) => (s === 'Error' ? 'error' : 'inherit'))}
          >
            {display}
          </Bind>
        </fieldset>
      </div>
      <div className='form-container'>
        <div className='form-button'>
          <Button variant='contained' color='primary' onClick={submit}>
            Submit
          </Button>
          <Button variant='contained' color='secondary' onClick={addPerson}>
            Add
          </Button>
          <Button variant='contained' color='secondary' onClick={removePerson}>
            Remove
          </Button>
        </div>
        <Bind $type='div'>
          {people.to((p) =>
            p.map((person) => <PersonView key={person.key} person={person} />)
          )}
        </Bind>
      </div>
    </div>
  );
}

ReactDOM.render(<FormView />, document.getElementById('root'));
