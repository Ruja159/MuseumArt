import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponentComponent } from './edit-component/edit-component.component';
import { InfoComponentComponent } from './info-component/info-component.component';
import { ListComponentComponent } from './list-component/list-component.component';

const routes: Routes = [
{
  path: 'edit' , component: EditComponentComponent
},
{
  path: 'info' , component:InfoComponentComponent
},
{
  path: 'list' , component: ListComponentComponent
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
