import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensVendaSearchComponent } from './itens-venda-search.component';

describe('ItensVendaSearchComponent', () => {
  let component: ItensVendaSearchComponent;
  let fixture: ComponentFixture<ItensVendaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItensVendaSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItensVendaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
