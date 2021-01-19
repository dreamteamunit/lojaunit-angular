import { Component, OnInit, Input } from '@angular/core';
import { Faq } from '../faq';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FaqService } from '../faq.service';

@Component({
  selector: 'app-faq-detail',
  templateUrl: './faq-detail.component.html',
  styleUrls: ['./faq-detail.component.css'],
})
export class FaqDetailComponent implements OnInit {
  @Input() faq: Faq;

  constructor(
    private route: ActivatedRoute,
    private faqService: FaqService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getFaq();
  }
  getFaq(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.faqService
      .getFaqById(id)
      .subscribe((faq) => (this.faq = faq));
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.faqService.updateFaq(this.faq).subscribe(() => this.goBack());
  } 
}