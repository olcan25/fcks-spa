import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './layout/contact/contact.component';
import { HomeComponent } from './layout/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'contact', component: ContactComponent },
  {
    path: 'categories',
    loadChildren: () =>
      import('./content/category/category.module').then(
        (m) => m.CategoryModule
      ),
  },
  {
    path: 'companies',
    loadChildren: () =>
      import('./content/company/company.module').then((m) => m.CompanyModule),
  },
  {
    path: 'banks',
    loadChildren: () =>
      import('./content/bank/bank.module').then((m) => m.BankModule),
  },
  {
    path: 'unitofmeasures',
    loadChildren: () =>
      import('./content/unitofmeasure/unitofmeasure.module').then(
        (m) => m.UnitofmeasureModule
      ),
  },
  {
    path: 'partners',
    loadChildren: () =>
      import('./content/partner/partner.module').then((m) => m.PartnerModule),
  },
  {
    path: 'warehouses',
    loadChildren: () =>
      import('./content/warehouse/warehouse.module').then(
        (m) => m.WarehouseModule
      ),
  },
  {
    path: 'companies/bankaccounts',
    loadChildren: () =>
      import('./content/company-bank-account/company-bank-account.module').then(
        (m) => m.CompanyBankAccountModule
      ),
  },
  {
    path: 'partners/bankaccounts',
    loadChildren: () =>
      import('./content/partner-bank-account/partner-bank-account.module').then(
        (m) => m.PartnerBankAccountModule
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./content/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'purchaseorders',
    loadChildren: () =>
      import('./content/purchase-order/purchase-order.module').then(
        (m) => m.PurchaseOrderModule
      ),
  },
  {
    path: 'wholesaleorders',
    loadChildren: () =>
      import('./content/whole-sale-order/whole-sale-order.module').then(
        (m) => m.WholeSaleOrderModule
      ),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./content/report/report.module').then((m) => m.ReportModule),
  },
  {
    path: 'payments',
    loadChildren: () =>
      import('./content/payment/payment.module').then((m) => m.PaymentModule),
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('./content/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'ledgeraccounts',
    loadChildren: () =>
      import('./content/ledger-account/ledger-account.module').then(
        (m) => m.LedgerAccountModule
      ),
  },
  { path: 'tallyins', loadChildren: () => import('./content/tally-in/tally-in.module').then(m => m.TallyInModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
