import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { TopicComponent } from './components/topic/topic';
import { AddTopicComponent } from './components/add-topic/add-topic';
import { EditTopicComponent } from './components/edit-topic/edit-topic';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  {
    path: 'topics',
    component: TopicComponent,
    canActivate: [authGuard]
  },

  {
    path: 'add-topic',
    component: AddTopicComponent,
    canActivate: [authGuard]
  },

{
  path: 'edit-topic/:id',
  component: EditTopicComponent,
  canActivate: [authGuard]
},

  {
    path: '**',
    redirectTo: 'login'
  }

];