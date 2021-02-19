import { Observable } from '../interfaces';

export type ObservableTuple = [Observable<any>, ...Observable<any>[]];

export interface Disposable {
  dispose(): void;
}
