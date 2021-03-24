import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { mixinColor } from '@angular/material/core';
import { ComunicationService } from '../comunication.service';
import { GetMethodService } from '../get-method.service';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css'],
})
export class EditComponentComponent implements OnInit {
  newItems;
  newForm;
  newCollections;

  constructor(private fb: FormBuilder, private service: GetMethodService, private comunicationService: ComunicationService) {}

  ngOnInit(): void {
    this.newItems = JSON.parse(localStorage.getItem('allCollections') || '{}');
  }

  previewItems() {

    const newColelction = JSON.parse(localStorage.getItem('newCollection') || '{}');


      if(newColelction.id == this.newItems.id){
        this.registrationForm.setValue({
          id: this.newItems.id,
          name: newColelction.name,
          url: newColelction.url,
          description: newColelction.description,
          type: this.newItems.type
        })
      }
      else {
        this.registrationForm.setValue({
             id: this.newItems.id,
          name: this.newItems.name,
          url: this.newItems.url,
          description: this.newItems.description,
          type: this.newItems.type
        });
        
      }
  }

  registrationForm = this.fb.group({
    id: [] ,
    name: ['', [Validators.required]],
    url: ['', Validators.required],
    description: ['', Validators.required],
    type: ['']
  });

  updateItems(id) {
    this.service.updateItem(id, this.registrationForm.value);
    const objToStr = JSON.stringify(this.registrationForm.value);
    localStorage.setItem('newCollection', objToStr);

    this.comunicationService.sendToggleModeFalse('false')
    this.comunicationService.sendCollection(JSON.parse(localStorage.getItem('newCollection') || '{}'))

    // this.service.getAllCollections().subscribe((data) => {
    //    this.comunicationService.sendNewCollection(data)
    // })
  }
  
}
