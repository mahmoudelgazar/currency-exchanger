import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangerRoutingModule } from './exchanger-routing.module';
import { ExchangerHomeComponent } from './components/exchanger-home/exchanger-home.component';
import { ExchangerDetailsComponent } from './components/exchanger-details/exchanger-details.component';
import { ExchangerFormComponent } from './components/exchanger-form/exchanger-form.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    ExchangerHomeComponent,
    ExchangerDetailsComponent,
    ExchangerFormComponent
  ],
  imports: [
    ExchangerRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule
  ]
})
export class ExchangerModule { }
