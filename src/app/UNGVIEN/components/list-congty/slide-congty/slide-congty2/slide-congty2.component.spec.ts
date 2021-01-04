import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideCongty2Component } from './slide-congty2.component';

describe('SlideCongty2Component', () => {
  let component: SlideCongty2Component;
  let fixture: ComponentFixture<SlideCongty2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideCongty2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideCongty2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
