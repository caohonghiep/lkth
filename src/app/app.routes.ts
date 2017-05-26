import {Route, RouterModule} from '@angular/router';
//import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { IconsComponent } from './pages/icons/icons.component';
import { TableComponent } from './pages/table/table.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { TypographyComponent } from './pages/typography/typography.component';
import { MapsComponent } from './pages/maps/maps.component';
import { UpgradeComponent } from './pages/upgrade/upgrade.component';
import { UsersDiagramComponent } from './pages/users-diagram/users-diagram.component';
import {AddUserComponent} from "./pages/add-user/add-user.component";
import {TreeDiagramComponent} from "./components/tree-diagram/tree-diagram.component";
import {ModuleWithProviders} from "@angular/core";
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./services/auth-guard.service";

interface MyRoute extends Route{
  title?:string,
  icon?:string,
  class?:string
}

export const MY_ROUTES: MyRoute[] =[
  { path: 'login', component: LoginComponent, title: 'Login',  icon: '' },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard], title: 'Trang Chủ',  icon: 'home' },
  { path: 'user-profile', component: UserProfileComponent, canActivate:[AuthGuard], title: 'Thông Tin Cá Nhân',  icon:'person' },
  { path: 'tree', component: UsersDiagramComponent, canActivate:[AuthGuard], title: 'Sơ Đồ Hội Viên',  icon:'fa-sitemap' },
  { path: 'add-user', component: AddUserComponent, canActivate:[AuthGuard], title: 'Thêm Hội Viên',  icon:'person_add' },
  { path: 'table', component: TableComponent, canActivate:[AuthGuard], title: 'Table List',  icon:'content_paste' },
  { path: 'icons', component: IconsComponent, canActivate:[AuthGuard], title: 'Icons',  icon:'bubble_chart' },
  { path: 'notifications', component: NotificationsComponent, canActivate:[AuthGuard], title: 'Notifications',  icon:'notifications' },
  { path: 'typography', component: TypographyComponent, canActivate:[AuthGuard], title: 'Typography',  icon:'library_books' },
  { path: 'maps', component: MapsComponent, canActivate:[AuthGuard], title: 'Maps',  icon:'location_on' },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
]

export const APP_ROUTES: ModuleWithProviders = RouterModule.forRoot(MY_ROUTES,{ useHash: true });

export const PAGE_COMPONENTS:Array<any> = [
  DashboardComponent,
  UserProfileComponent,
  TableComponent,
  IconsComponent,
  NotificationsComponent,
  TypographyComponent,
  MapsComponent,
  UpgradeComponent,
  UsersDiagramComponent,
  AddUserComponent,
  TreeDiagramComponent
]
