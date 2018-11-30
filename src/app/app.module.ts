import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ShowdownPipe } from './core/pipes/showdown.pipe';
import { ReadComponent } from './components/read/read.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowdownPipe,
    ReadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '**', component: ReadComponent }
    ])
  ],
  providers: [
    { provide: 'ACCOUNT', useValue: 'SSWConsulting' },
    { provide: 'REPO', useValue: 'rules' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
