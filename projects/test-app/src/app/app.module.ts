import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SvgGridComponent } from 'src/components/svg-grid/svg-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgGridComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
