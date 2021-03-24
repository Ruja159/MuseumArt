import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { GetMethodService } from '../get-method.service';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { ComunicationService } from '../comunication.service';

interface Collections {
  id: number;
  name: string;
  type: string;
  collection: any;
}

interface AllCollections {
  id: number;
  name: string;
  url: string;
  type: string;
  description: string;
}
@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css'],
})
export class ListComponentComponent implements OnInit {
  radioValue = '';
  public valueOfNode = '';

  public tempCollection;

  public searchText;

  public collections: any;
  localStorageItems: any;
  allCollections: any;
  newCollection: any;

  treeControl = new NestedTreeControl<Collections>((node) => node.collection);

  dataSource = new MatTreeNestedDataSource<Collections>();

  constructor(
    private service: GetMethodService,
    private comunicationService: ComunicationService
  ) {}

  ngOnInit(): void {
    this.service.getCollections().subscribe((data: any) => {
      this.collections = data;
      const objToStr = JSON.stringify(data);
      localStorage.setItem('collections', objToStr);
      this.clickEvent('All');
    });

    this.localStorageItems = JSON.parse(
      localStorage.getItem('collections') || '{}'
    );

    this.comunicationService.sendNewCollections$.subscribe((data) => {
      this.newCollection = data;
    });
  }

  clickEvent(data) {
    this.radioValue = data;
    switch (data) {
      case 'Painting':
        this.tempCollection = JSON.parse(JSON.stringify(this.collections)); // make deep clone of array;
        this.tempCollection.forEach((museum) => {
          museum.collection.forEach((department) => {
            department.collection = department.collection.filter(
              (i) => i.type == 'painting'
            );
          });
        });

        this.dataSource.data = this.tempCollection;
        break;
      case 'Potery':
        this.tempCollection = JSON.parse(JSON.stringify(this.collections)); //make deep clone of aray
        this.tempCollection.forEach((museum) => {
          museum.collection.forEach((department) => {
            department.collection = department.collection.filter(
              (i) => i.type == 'potery'
            );
          });
        });

        this.dataSource.data = this.tempCollection;
        break;
      default:
        if (this.newCollection) {
          this.dataSource.data = this.newCollection;
          this.tempCollection = this.newCollection;
        } else {
          this.dataSource.data = this.collections;
          this.tempCollection = this.collections;
        }
    }
    this.doSearch();
  }

  onSave(data) {
    this.valueOfNode = data;

    this.comunicationService.sendId(data);
  }

  hasChild = (_: number, node: Collections) =>
    !!node.collection && node.collection.length > 0;

  onSearchChange(event) {
    this.searchText = event.target.value;
    this.doSearch();
  }

  doSearch() {
    if (this.searchText) {
      this.tempCollection = JSON.parse(JSON.stringify(this.tempCollection)); //make deep clone of aray
      this.tempCollection.forEach((museum) => {
        museum.collection.forEach((department) => {
          department.collection = department.collection.filter((i) =>
            i.name.toLowerCase().includes(this.searchText.toLowerCase())
          );
        });
      });
      this.dataSource.data = this.tempCollection;
    }
  }
}
