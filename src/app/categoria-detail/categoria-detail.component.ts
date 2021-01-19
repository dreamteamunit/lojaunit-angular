import { Component, OnInit, Input } from '@angular/core';
import { Categoria } from '../categoria';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-detail',
  templateUrl: './categoria-detail.component.html',
  styleUrls: ['./categoria-detail.component.css'],
})
export class CategoriaDetailComponent implements OnInit {
  @Input() categoria: Categoria;

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCategoria();
  }
  getCategoria(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.categoriaService
      .getCategoriaById(id)
      .subscribe((categoria) => (this.categoria = categoria));
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.categoriaService.updateCategoria(this.categoria).subscribe(() => this.goBack());
  } 
}