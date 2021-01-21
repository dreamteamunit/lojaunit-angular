import { TestBed } from '@angular/core/testing';

import { ItensVendaService } from './itens-venda.service';

describe('ItensVendaService', () => {
  let service: ItensVendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItensVendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
