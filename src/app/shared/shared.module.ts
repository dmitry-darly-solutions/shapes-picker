import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

import { MaterialHelperModule } from './material-helper.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialHelperModule,
    ColorPickerModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialHelperModule,
    ColorPickerModule,
  ]
})
export class SharedModule {
}
