import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ErrorHandlerService } from './core/services/error-handler.service';
import { JwtModule } from '@auth0/angular-jwt';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

export function TokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [AppComponent, routingComponents],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    ModalModule,
    BrowserAnimationsModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: TokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true,
    },
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
