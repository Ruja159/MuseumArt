import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private service: GetMethodService, private comunicationService: ComunicationService) {}

  ngOnInit(): void {
    this.newItems = JSON.parse(localStorage.getItem('allCollections') || '{}');
  }

  previewItems() {
    this.registrationForm.setValue({
      name: this.newItems.name,
      url: this.newItems.url,
      description: this.newItems.description,
    });
  }

  registrationForm = this.fb.group({
    name: ['', [Validators.required]],
    url: ['', Validators.required],
    description: ['', Validators.required],
  });

  updateItems(id) {
    this.service.updateItem(id, this.registrationForm.value);
    const objToStr = JSON.stringify(this.registrationForm.value);
    localStorage.setItem('newCollection', objToStr);

    this.comunicationService.sendToggleModeFalse('false')
    this.comunicationService.sendCollection(JSON.parse(localStorage.getItem('newCollection') || '{}'))
  }
}
