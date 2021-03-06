import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';

import { AuthenticationService } from './services/authService/authentication.service';
import { IdFormComponent } from './components/id-form/id-form.component';
import { AuthGuard, LoginGuard, AdminGuard } from './guard/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { NoticeComponent } from './components/notice/notice.component';
import { BlogComponent } from './components/blog/blog.component';
import { EditComponent } from './components/edit/edit.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { GetProfileAdminFormComponent } from './components/get-profile-admin-form/get-profile-admin-form.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  { path: 'signup/:id',
    component: SignupComponent,
    canActivate: [AdminGuard]
  },
  { path: 'idForm',
    component: IdFormComponent,
    canActivate: [AdminGuard]
  },
  { path: 'getProfile',
    component: GetProfileAdminFormComponent,
    canActivate: [AdminGuard]
  },
  { path: 'blog',
    component: BlogComponent,
    canActivate: [AuthGuard]
  },
  { path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AdminGuard]
  },
  { path: 'edit',
    component: EditComponent,
    canActivate: [AuthGuard],
  },
  { path: 'edit/:id',
    component: EditComponent,
    canActivate: [AdminGuard],
  },
  {path: 'attendance',
    component: AttendanceComponent,
    canActivate: [AuthGuard]
  },
  {path: 'attendance/:id',
    component: AttendanceComponent,
    canActivate: [AdminGuard]
  },
  {path: 'notice',
    component: NoticeComponent,
    canActivate: [AuthGuard]

  },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
    HomeComponent,
    IdFormComponent,
    ProfileComponent,
    NoticeComponent,
    BlogComponent,
    EditComponent,
    AttendanceComponent,
    FileSelectDirective,
    GetProfileAdminFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    HttpClientModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    LoginGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
