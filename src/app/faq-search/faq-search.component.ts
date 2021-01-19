import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Faq } from '../faq';
import { FaqService } from '../faq.service';

@Component({
  selector: 'app-faq-search',
  templateUrl: './faq-search.component.html',
  styleUrls: ['./faq-search.component.css'],
})
export class FaqSearchComponent implements OnInit {
  faq: Observable<Faq>;
  @Input() inputFaq: Faq;
  private searchTerms = new Subject<string>();

  constructor(private faqService: FaqService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  getFaq(): void {
    this.faq.subscribe((faq) => {
      //console.log(faq);
      this.inputFaq = faq;
    });
  }

  ngOnInit(): void {
    this.faq = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        return this.faqService.searchFaq(term);
      })
    );
    this.getFaq();
  }
}
