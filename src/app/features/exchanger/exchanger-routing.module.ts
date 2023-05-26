import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ExchangerHomeComponent } from './components/exchanger-home/exchanger-home.component';

const routes: Routes = [
  {path: '', component: ExchangerHomeComponent},
  {path: 'details/:from/:to', component: ExchangerHomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangerRoutingModule {
}
