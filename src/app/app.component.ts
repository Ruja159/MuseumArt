import { Component, OnInit } from '@angular/core';
import { ComunicationService } from './comunication.service';
import { GetMethodService } from './get-method.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MuseumArtDemo';
  editMode = false;
  test= false;

  constructor(
    private comunicationService: ComunicationService, 
  ) {}
  
  ngOnInit() {
    this.comunicationService.sendToggleMode$.subscribe((mode) => {
      this.editMode = true;
    });

  }
}
