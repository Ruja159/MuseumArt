import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { GetMethodService } from '../get-method.service';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

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

  radioValue= '';
  public valueOfNode = '';

  public tempCollection;

  public collections: any;
  localStorageItems: any;
  allCollections: any;

  treeControl = new NestedTreeControl<Collections>((node) => node.collection);

  dataSource = new MatTreeNestedDataSource<Collections>();


  constructor(private service: GetMethodService) {}

  ngOnInit(): void {
    this.service.getCollections().subscribe((data: any) => {
      this.collections = data;
      console.log(this.collections);
      const objToStr = JSON.stringify(data);
      localStorage.setItem('collections', objToStr);
    });

    this.localStorageItems = JSON.parse(
      localStorage.getItem('collections') || '{}'
    );
  }

  clickEvent( data) {
    // if ((this.radioValue = 'all')) {
    //   this.dataSource.data = this.collections;
    // } else if (t)
    this.radioValue=data;
    switch(data) {
      case 'Painting': 
        this.tempCollection = JSON.parse(JSON.stringify(this.collections)) // make deep clone of array;
        this.tempCollection.forEach(museum => {
          museum.collection.forEach(department => {
            department.collection = department.collection.filter(i => i.type == 'painting');
          })
        });

        this.dataSource.data = this.tempCollection;
        break;
      case 'Potery':
        this.tempCollection = JSON.parse(JSON.stringify(this.collections)); //make deep clone of aray
        this.tempCollection.forEach(museum => {
          museum.collection.forEach(department => {
            department.collection = department.collection.filter(i => i.type == 'potery');
          })
        });

        this.dataSource.data = this.tempCollection;
        break;
      default:
        this.dataSource.data = this.collections;
    }
  }

  onSave(data) {
    console.log(data);
    this.valueOfNode = data;
  }

  hasChild = (_: number, node: Collections) =>
    !!node.collection && node.collection.length > 0;

  // searchTree(element, searchKey: string, type: string) {
  //   if (
  //     element.name.toLowerCase().includes(searchKey, 0) &&
  //     element.type === type
  //   ) {
  //     return element;
  //   } else if (element.collection != null) {
  //     var i;
  //     var result = null;
  //     for (i = 0; result == null && i < element.collection.length; i++) {
  //       result = this.searchTree(element.collection[i], searchKey, type);
  //     }
  //     return result;
  //   }
  //   return null;
  // }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   let toSearch = filterValue.trim().toLowerCase();

  //   console.log(this.searchTree(this.localStorageItems[0], toSearch, 'potery'));
  // }

  onSearchChange(event) {
    const keyword = event.target.value;
    this.tempCollection = JSON.parse(JSON.stringify(this.tempCollection)); //make deep clone of aray
    this.tempCollection.forEach(museum => {
      museum.collection.forEach(department => {
        department.collection = department.collection.filter(i => i.name.toLowerCase().includes(keyword.toLowerCase()));
      })
    });
    this.dataSource.data = this.tempCollection

    console.log(keyword);

  }
}
