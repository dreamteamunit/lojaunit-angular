import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPagamentoSearchComponent } from './forma-pagamento-search.component';

describe('FormaPagamentoSearchComponent', () => {
  let component: FormaPagamentoSearchComponent;
  let fixture: ComponentFixture<FormaPagamentoSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaPagamentoSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormaPagamentoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
