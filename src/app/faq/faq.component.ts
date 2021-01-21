import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

import { Faq } from '../faq';
import { FaqService } from '../faq.service';
import { MessageService } from '../message.service';

import { Produto } from '../produto';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {
  faqs: Faq[];

  constructor(
    private FaqService: FaqService
  ) {}

  ngOnInit() {
    this.getFaq();
  }

  getFaq(): void {
    this.FaqService
      .getFaq()
      .subscribe((faq) => (this.faqs = faq));
  }

  delete(faq: Faq): void {
    this.faqs = this.faqs.filter((h) => h !== faq);
    this.FaqService.deleteFaq(faq).subscribe();
  }
  add(texto: string,idProduto: Produto): void {
    texto = texto.trim();
    
    let datahora = new Date().toISOString().replace("Z","");
    
    if (!texto && !idProduto) {
      return;
    }

    this.FaqService.addFaq({ datahora, texto, idProduto } as Faq).subscribe((faq) => {
      this.faqs.push(faq);
    });
  }

}
