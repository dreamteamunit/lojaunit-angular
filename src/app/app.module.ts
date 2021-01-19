import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { MarcaComponent } from './marca/marca.component'
import { CategoriaComponent } from './categoria/categoria.component'
import { FormaPagamentoComponent } from './formaPagamento/formaPagamento.component'
import { ProdutoComponent } from './produto/produto.component';
import { HttpClientModule } from '@angular/common/http';
import { MessagesComponent } from './messages/messages.component';
import { MarcaDetailComponent } from './marca-detail/marca-detail.component';
import { MarcaSearchComponent } from './marca-search/marca-search.component';
import { QuemsomosComponent } from './quemsomos/quemsomos.component';
import { AdminComponent } from './admin/admin.component';
import { FaqComponent } from './faq/faq.component';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { ClienteSearchComponent } from './cliente-search/cliente-search.component';
import { FornecedorDetailComponent } from './fornecedor-detail/fornecedor-detail.component';
import { FornecedorSearchComponent } from './fornecedor-search/fornecedor-search.component';
import { CategoriaDetailComponent } from './categoria-detail/categoria-detail.component';
import { CategoriaSearchComponent } from './categoria-search/categoria-search.component';

@NgModule({
  declarations: [AppComponent, ClientesComponent, MessagesComponent, FornecedorComponent, MarcaComponent, CategoriaComponent, FormaPagamentoComponent,ProdutoComponent, MarcaDetailComponent, MarcaSearchComponent, QuemsomosComponent, AdminComponent, FaqComponent, ClienteDetailComponent, ClienteSearchComponent, FornecedorDetailComponent, FornecedorSearchComponent, CategoriaDetailComponent, CategoriaSearchComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
