import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/user/header/header.component';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { QuestionEffects } from './state/Effects/question.effects';
import { questionReducer } from './state/Reducers/question.reducer';
import { EffectsModule } from '@ngrx/effects';
import { loggedInUserReducer } from './state/Reducers/login.reducer';
import { LoggedInUserEffects } from './state/Effects/login.effects';
import { registerUserReducer } from './state/Reducers/register.reducer';
import { RegisterUserEffects } from './state/Effects/register.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { usersReducer } from './state/Reducers/users.reducer';
import { UserEffects } from './state/Effects/user.effects';



@NgModule({
    declarations: [
        AppComponent

    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        HeaderComponent,
        StoreModule.forRoot({ question: questionReducer, loggedInUser: loggedInUserReducer, registerUser: registerUserReducer, users: usersReducer }, {}),
        EffectsModule.forRoot([QuestionEffects, LoggedInUserEffects, RegisterUserEffects, UserEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),

    ]
})
export class AppModule { }
