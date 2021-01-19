import { Component, OnInit } from '@angular/core';

import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
import { MarcaService } from '../marca.service';
import { FornecedorService } from '../fornecedor.service';
import { CategoriaService } from '../categoria.service';
import { MessageService } from '../message.service';

import { Categoria } from '../categoria';
import { Fornecedor } from '../fornecedor';
import { Marca } from '../marca';
import { switchMap} from 'rxjs/operators'

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
})
export class ProdutoComponent implements OnInit {
  produtos: Produto[];

  constructor(
    private ProdutoService: ProdutoService,
    private MarcaService: MarcaService,
    private CategoriaService: CategoriaService,
    private FornecedorService: FornecedorService
  ) {}

  ngOnInit() {
    this.getProduto();
    //console.log(this.produtos)
  }

  getProduto(): void {
    this.ProdutoService.getProduto().subscribe(
      (produto) => (this.produtos = produto)
    );
  }

  delete(produto: Produto): void {
    this.produtos = this.produtos.filter((h) => h !== produto);
    this.ProdutoService.deleteProduto(produto).subscribe();
  }
  async getForn(idFornecedor): Promise<Fornecedor> {
    let resp = await this.FornecedorService.getFornecedorById(
      idFornecedor
    ).toPromise();
    return resp;
  }

  async getMarc(idMarca): Promise<Marca> {
    let resp = await this.MarcaService.getMarcaById(idMarca).toPromise();
    return resp;
  }
  async getCategoria(idCategoria): Promise<Categoria> {
    let resp = await this.CategoriaService.getCategoriaById(idCategoria).toPromise();
    return resp;
  }

  add(
    nome: string,
    descricao: string,
    precoUnitario: number,
    unidade: string,
    idCategoria: number,
    idFornecedor: number,
    idMarca: number
  ): void {
    nome = nome.trim();
    descricao = descricao.trim();
    unidade = unidade.trim();

    let fornecedor;
    let marca;
    let categoria;

    this.getForn(idFornecedor).then((data) => {
      fornecedor = data;
    });

    this.getMarc(idMarca).then((data) => {
      marca = data;
    });

    this.getCategoria(idCategoria).then((data) => {
      categoria = data;
    });
    
    if (!nome && !categoria && !marca && !fornecedor) {
      return;
    }
    this.ProdutoService.addProduto({
      nome,
      descricao,
      precoUnitario,
      unidade,
      idCategoria,
      idFornecedor,
      idMarca,
    } as Produto).subscribe((produto) => {
      this.produtos.push(produto);
    });
  }
}