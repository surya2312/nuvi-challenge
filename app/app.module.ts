import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { NuvihomeComponent }  from './components/nuvihome.component';
import { InputTextModule,DataTableModule,ButtonModule,DialogModule, GrowlModule} from 'primeng/primeng';
import { ChartsModule } from 'ng2-charts/ng2-charts';


@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule,InputTextModule,DataTableModule,ButtonModule,DialogModule, GrowlModule, ChartsModule ],
  declarations: [ AppComponent, NuvihomeComponent],
  bootstrap:    [ AppComponent ]
})
export class NuviApp { }
