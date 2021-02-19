import { ObjectContainer } from '../../interfaces';

export default class _Container<T> implements ObjectContainer<T> {
  constructor(private _items: Set<T>) {}

  add(item: T) {
    this._items.add(item);
  }

  remove(item: T) {
    this._items.delete(item);
  }
}
