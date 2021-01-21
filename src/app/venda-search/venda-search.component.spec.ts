import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaSearchComponent } from './venda-search.component';

describe('VendaSearchComponent', () => {
  let component: VendaSearchComponent;
  let fixture: ComponentFixture<VendaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendaSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
