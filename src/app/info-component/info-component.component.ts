import { Component, OnInit } from '@angular/core';
import { ComunicationService } from '../comunication.service';
import { GetMethodService } from '../get-method.service';

@Component({
  selector: 'app-info-component',
  templateUrl: './info-component.component.html',
  styleUrls: ['./info-component.component.css'],
})
export class InfoComponentComponent implements OnInit {

  editMode = true;
  museumObj: any;
  public collectionId: any;

  constructor(
    private comunicationService: ComunicationService,
    private service: GetMethodService
  ) {}

  ngOnInit() {
    this.comunicationService.componentId$.subscribe((id) => {
      this.collectionId = id;
      this.service.getCollectionById(this.collectionId).subscribe(
        data=> {this.museumObj = data    
         const objToStr = JSON.stringify(data);
      localStorage.setItem('allCollections', objToStr); }   
      )
    });
  }

  toggleEdit() {
    this.comunicationService.sendToggleMode("change mode")
  }
}
