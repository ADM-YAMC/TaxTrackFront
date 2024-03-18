import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ContentComponent } from './component/content/content.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaxpayersComponent } from './component/taxpayers/taxpayers.component';
import { AddTaxpayersComponent } from './component/taxpayers/component/add-taxpayers/add-taxpayers.component';
import { ViewTaxpayersComponent } from './component/taxpayers/component/view-taxpayers/view-taxpayers.component';
import { TypeTaxpayersComponent } from './component/configuration/type-taxpayers/type-taxpayers.component';
import { AddTypeTaxpayersComponent } from './component/configuration/type-taxpayers/component/add-type-taxpayers/add-type-taxpayers.component';
import { ViewTypeTaxpayersComponent } from './component/configuration/type-taxpayers/component/view-type-taxpayers/view-type-taxpayers.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FilterPipe } from './pipes/filter.pipe';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { LoadInterceptorService } from './services/load-interceptor.service';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContentComponent,
    PaginatorComponent,
    TaxpayersComponent,
    AddTaxpayersComponent,
    ViewTaxpayersComponent,
    TypeTaxpayersComponent,
    AddTypeTaxpayersComponent,
    ViewTypeTaxpayersComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    NgxMaskDirective,
    NgxMaskPipe,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
  ],
  providers: [
    provideNgxMask(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
