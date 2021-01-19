import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPagamentoDetailComponent } from './forma-pagamento-detail.component';

describe('FormaPagamentoDetailComponent', () => {
  let component: FormaPagamentoDetailComponent;
  let fixture: ComponentFixture<FormaPagamentoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaPagamentoDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormaPagamentoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
