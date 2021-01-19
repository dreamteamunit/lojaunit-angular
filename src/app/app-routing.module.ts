import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component'
import { MarcaComponent } from './marca/marca.component'
import { FormaPagamentoComponent } from './formaPagamento/formaPagamento.component'
import { ProdutoComponent } from './produto/produto.component'
import { CategoriaComponent } from './categoria/categoria.component'
import { MarcaDetailComponent } from './marca-detail/marca-detail.component'
import { QuemsomosComponent } from './quemsomos/quemsomos.component'
import { FaqComponent } from './faq/faq.component'
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { FornecedorDetailComponent } from './fornecedor-detail/fornecedor-detail.component';
import { CategoriaDetailComponent } from './categoria-detail/categoria-detail.component';
import { FormaPagamentoDetailComponent } from './forma-pagamento-detail/forma-pagamento-detail.component';
import { ProdutoDetailComponent } from './produto-detail/produto-detail.component';
import { FaqDetailComponent } from './faq-detail/faq-detail.component';


const routes: Routes = [
  {
    path: 'clientes',
    component: ClientesComponent,
  },
  {
    path: 'fornecedor',
    component: FornecedorComponent,
  },
  {
    path: 'fornecedor/detail/:id',
    component: FornecedorDetailComponent,
  },
  {
    path: 'marca',
    component: MarcaComponent,
  },
  {
    path: 'categoria',
    component: CategoriaComponent,
  },
  {
    path: 'categoria/detail/:id',
    component: CategoriaDetailComponent,
  },
  {
    path: 'formaPagamento',
    component: FormaPagamentoComponent,
  },
  {
    path: 'formaPagamento/detail/:id',
    component: FormaPagamentoDetailComponent,
  },
  {
    path: 'produto',
    component: ProdutoComponent,
  },
  {
    path: 'produto/detail/:id',
    component: ProdutoDetailComponent,
  },
  {
    path: 'marca/detail/:id',
    component: MarcaDetailComponent,
  },
  {
    path: 'cliente/detail/:id',
    component: ClienteDetailComponent,
  },
  {
    path: '',
    component: QuemsomosComponent,
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
  {
    path: 'faq/detail/:id',
    component: FaqDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
