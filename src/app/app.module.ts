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
import { FormaPagamentoDetailComponent } from './forma-pagamento-detail/forma-pagamento-detail.component';
import { FormaPagamentoSearchComponent } from './forma-pagamento-search/forma-pagamento-search.component';
import { ProdutoDetailComponent } from './produto-detail/produto-detail.component';
import { ProdutoSearchComponent } from './produto-search/produto-search.component';
import { FaqDetailComponent } from './faq-detail/faq-detail.component';
import { FaqSearchComponent } from './faq-search/faq-search.component';
import { VendaDetailComponent } from './venda-detail/venda-detail.component';
import { VendaSearchComponent } from './venda-search/venda-search.component';
import { VendaComponent } from './venda/venda.component';
import { ItensVendaDetailComponent } from './itens-venda-detail/itens-venda-detail.component';
import { ItensVendaSearchComponent } from './itens-venda-search/itens-venda-search.component';
import { ItensVendaComponent } from './itens-venda/itens-venda.component';

@NgModule({
  declarations: [AppComponent, ClientesComponent, MessagesComponent, FornecedorComponent, MarcaComponent, CategoriaComponent, FormaPagamentoComponent,ProdutoComponent, MarcaDetailComponent, MarcaSearchComponent, QuemsomosComponent, AdminComponent, FaqComponent, ClienteDetailComponent, ClienteSearchComponent, FornecedorDetailComponent, FornecedorSearchComponent, CategoriaDetailComponent, CategoriaSearchComponent, FormaPagamentoDetailComponent, FormaPagamentoSearchComponent, ProdutoDetailComponent, ProdutoSearchComponent, FaqDetailComponent, FaqSearchComponent, VendaDetailComponent, VendaSearchComponent, VendaComponent, ItensVendaDetailComponent, ItensVendaSearchComponent, ItensVendaComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
