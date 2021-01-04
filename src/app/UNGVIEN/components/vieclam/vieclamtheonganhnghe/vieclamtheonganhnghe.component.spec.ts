import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VieclamtheonganhngheComponent } from './vieclamtheonganhnghe.component';

describe('VieclamtheonganhngheComponent', () => {
  let component: VieclamtheonganhngheComponent;
  let fixture: ComponentFixture<VieclamtheonganhngheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VieclamtheonganhngheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VieclamtheonganhngheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
