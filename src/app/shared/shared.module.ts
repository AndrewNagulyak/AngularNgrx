import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CapitalizePipe} from './pipe/capitalize.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const declarations = [
  CapitalizePipe
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
  ]
})
export class SharedModule {
}
