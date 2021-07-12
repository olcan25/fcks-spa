import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { DatePipe } from '@angular/common';
import { TopnavComponent } from './layout/topnav/topnav.component';
import { AsidenavComponent } from './layout/asidenav/asidenav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AlertifyService } from './core/services/alert-service/alertify.service';
import { SweetalertService } from './core/services/alert-service/sweetalert.service';
import { NgBootstrapModalService } from './core/services/modal-services/ng-bootstrap-modal.service';
import { HomeComponent } from './layout/home/home.component';
import { ContactComponent } from './layout/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    AsidenavComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  exports: [SharedModule],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    DatePipe,
    AlertifyService,
    SweetalertService,
    NgBootstrapModalService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
