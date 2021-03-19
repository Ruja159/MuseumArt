import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComunicationService {
  private _idComunicationSource = new Subject<any>();
  private _modeComunicationSource = new Subject<any>();

  componentId$ = this._idComunicationSource.asObservable();

  sendToggleMode$ = this._modeComunicationSource.asObservable();

  constructor() {}

  sendId(id: number) {
    this._idComunicationSource.next(id);
  }

  sendToggleMode(mode : string){
    this._modeComunicationSource.next(mode);
  }
}
