import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CapitalizePipe} from './pipe/capitalize.pipe';
import {FormatTimePipe} from './pipe/format-time.pipe';
import {WaitingTimePipe} from './pipe/waiting-time.pipe';
import {SearchHighlightPipe} from './pipe/search-highlight.pipe';
import {PopPipe} from './pipe/pop.pipe';
import {ImageToUrlPipe} from './pipe/image-to-url.pipe';
import {TruncatePipe} from './pipe/truncate.pipe';

import {ElapsedSincePipe} from './pipe/elapsed-since.pipe';
import {WhenTimePipe} from './pipe/when-time.pipe';

import {EndTimePipe} from './pipe/end-time.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {InlineSVGModule} from 'ng-inline-svg';
import {AmountPipe} from './pipe/amount.pipe';
import {FormatDatePipe} from './pipe/format-date.pipe';
import {HiddenPhonePipe} from './pipe/hidden-phone.pipe';
import {ModernDatePipe} from './pipe/modern-date.pipe';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';

const declarations = [
  CapitalizePipe,
  FormatTimePipe,
  WaitingTimePipe,
  SearchHighlightPipe,
  PopPipe,
  ImageToUrlPipe,
  AmountPipe,
  EndTimePipe,
  TruncatePipe,
  ElapsedSincePipe,
  WhenTimePipe,
  FormatDatePipe,
  HiddenPhonePipe,
  ModernDatePipe,
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module,
    InlineSVGModule,
    MatMenuModule,
    MatCheckboxModule,
  ],
  entryComponents: [
  ]
})
export class SharedModule {
}
