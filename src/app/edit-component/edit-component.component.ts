import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent implements OnInit {

 items: any
  

  constructor() { }

  ngOnInit(): void {
  }

  previewItems(){

    this.items = JSON.parse(
      localStorage.getItem('allCollections') || '{}'
    );
  }

}
