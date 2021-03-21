import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComunicationService {
  private _idComunicationSource = new Subject<any>();
  private _modeComunicationSource = new Subject<any>();
  private _modeToogleFalse = new Subject<any>();
  private _collections = new Subject<any>();


  componentId$ = this._idComunicationSource.asObservable();

  sendToggleMode$ = this._modeComunicationSource.asObservable();

  sendToogleModeFalse$ = this._modeToogleFalse.asObservable();

  sendCollection$ = this._collections.asObservable();

  constructor() {}

  sendId(id: number) {
    this._idComunicationSource.next(id);
  }

  sendToggleMode(mode : string){
    this._modeComunicationSource.next(mode);
  }

  sendToggleModeFalse(mode : string){
    this._modeToogleFalse.next(mode);
  }

  sendCollection(data: any) {
    this._collections.next(data);
  }
}
