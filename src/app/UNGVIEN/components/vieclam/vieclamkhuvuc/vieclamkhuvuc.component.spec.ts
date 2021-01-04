import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VieclamkhuvucComponent } from './vieclamkhuvuc.component';

describe('VieclamkhuvucComponent', () => {
  let component: VieclamkhuvucComponent;
  let fixture: ComponentFixture<VieclamkhuvucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VieclamkhuvucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VieclamkhuvucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
