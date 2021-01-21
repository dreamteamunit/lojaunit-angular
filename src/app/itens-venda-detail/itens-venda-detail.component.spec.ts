import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensVendaDetailComponent } from './itens-venda-detail.component';

describe('ItensVendaDetailComponent', () => {
  let component: ItensVendaDetailComponent;
  let fixture: ComponentFixture<ItensVendaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItensVendaDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItensVendaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
