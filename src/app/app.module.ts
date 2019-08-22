import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducers } from './core/store';

export const APPReducerToken = new InjectionToken(
  'APP Registered Reducers',
);

export function getReducers() {
  return reducers;
}

export const ReducerProvider = [
  { provide: APPReducerToken, useFactory: getReducers },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(APPReducerToken, {}),
  ],
  providers: [ReducerProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
