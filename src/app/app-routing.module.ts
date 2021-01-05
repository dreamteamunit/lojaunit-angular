import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component'

const routes: Routes = [
  {
    path: 'clientes',
    component: ClientesComponent,
  },
  {
    path: 'fornecedor',
    component: FornecedorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
