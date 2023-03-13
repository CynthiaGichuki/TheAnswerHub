import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/user/header/header.component';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { QuestionEffects } from './state/Effects/question.effects';
import { AuthEffects } from './state/Effects/auth.effects';

@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [QuestionEffects, AuthEffects],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        HeaderComponent,
        StoreModule.forRoot({}, {}),

    ]
})
export class AppModule { }
