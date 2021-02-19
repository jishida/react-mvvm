import React from 'react';
import { Hooks } from '../hooks';

interface ModuleStore {
  _hooks: Hooks;
}

const moduleStore: ModuleStore = {
  _hooks: React,
};

export function _getHooks() {
  return moduleStore._hooks;
}

export function _setHooks(hooks: Hooks) {
  moduleStore._hooks = hooks;
}
