import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
import {NgxDocViewerModule} from 'ngx-doc-viewer';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DocumentViewerComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxDocViewerModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
