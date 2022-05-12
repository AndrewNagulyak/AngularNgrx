import { TestBed } from '@angular/core/testing';

import { FormMaskService } from './form-mask.service';

describe('FormMaskService', () => {
  let service: FormMaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormMaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
