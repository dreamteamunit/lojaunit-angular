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
    path: 'marca',
    component: MarcaComponent,
  },
  {
    path: 'categoria',
    component: CategoriaComponent,
  },
  {
    path: 'formaPagamento',
    component: FormaPagamentoComponent,
  },
  {
    path: 'produto',
    component: ProdutoComponent,
  },
  { path: 'marca/detail/:id', component: MarcaDetailComponent },
  { path: '', component: QuemsomosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
