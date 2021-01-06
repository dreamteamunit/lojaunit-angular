import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPagamentoComponent } from './formaPagamento.component';

describe('FormaPagamentoComponent', () => {
  let component: FormaPagamentoComponent;
  let fixture: ComponentFixture<FormaPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormaPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
