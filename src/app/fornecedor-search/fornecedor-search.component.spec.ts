import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorSearchComponent } from './fornecedor-search.component';

describe('FornecedorSearchComponent', () => {
  let component: FornecedorSearchComponent;
  let fixture: ComponentFixture<FornecedorSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FornecedorSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
