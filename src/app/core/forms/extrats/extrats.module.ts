import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtractFormControlPipe } from './extract-form-control.pipe';
import { ExtractFormGroupPipe } from './extract-form-group.pipe';
import { ExtractTouchedDirective } from './extract-touched.directive';



@NgModule({
  declarations: [
    ExtractFormControlPipe,
    ExtractFormGroupPipe,
    ExtractTouchedDirective
  ],
  exports: [
    ExtractFormControlPipe,
    ExtractFormGroupPipe,
    ExtractTouchedDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ExtratsModule { }
