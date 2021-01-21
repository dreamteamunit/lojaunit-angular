import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaDetailComponent } from './venda-detail.component';

describe('VendaDetailComponent', () => {
  let component: VendaDetailComponent;
  let fixture: ComponentFixture<VendaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendaDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
