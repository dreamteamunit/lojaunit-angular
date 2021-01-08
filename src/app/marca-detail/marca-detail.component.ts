import { Component, OnInit, Input } from '@angular/core';
import { Marca } from '../marca';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MarcaService } from '../marca.service';

@Component({
  selector: 'app-marca-detail',
  templateUrl: './marca-detail.component.html',
  styleUrls: ['./marca-detail.component.css'],
})
export class MarcaDetailComponent implements OnInit {
  @Input() marca: Marca;

  constructor(
    private route: ActivatedRoute,
    private marcaService: MarcaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMarca();
  }
  getMarca(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.marcaService
      .getMarcaById(id)
      .subscribe((marca) => (this.marca = marca));
  }
  goBack(): void {
    this.location.back();
  }
}
