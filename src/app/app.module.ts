import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';
import { HeaderComponent } from './includes/header/header.component';
import { FooterComponent } from './includes/footer/footer.component';
import { PopupComponent } from './includes/popup/popup.component';
import { HomeComponent } from './pages/home/home.component';
import { DepartmentService } from './app-service/department.service';
import { AddDeptFormComponent } from './includes/add-dept-form/add-dept-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserFormComponent } from './includes/add-user-form/add-user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PopupComponent,
    HomeComponent,
    AddDeptFormComponent,
    AddUserFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
  ],
  providers: [DepartmentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
