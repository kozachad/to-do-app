import { RouterModule, Routes, provideRouter } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivityFormComponent } from './pages/activity-form/activity-form.component';
import { ActivitiesListComponent } from './pages/activities-list/activities-list.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';



export const routes: Routes = [
    {
        path:'',
        component: HomeComponent,
    },
    {
        path:'login',
        component: LoginComponent,
    },
    {
        path:'register',
        component: RegisterComponent,
    },
      { path: '', redirectTo: '/activities', pathMatch: 'full' },
  { path: 'activities', component: ActivitiesListComponent },
  { path: 'activities/new', component: ActivityFormComponent },
  { path: 'activities/edit/:id', component: ActivityFormComponent }
    

];

export const appRoutes = [
    provideRouter(routes),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ];

