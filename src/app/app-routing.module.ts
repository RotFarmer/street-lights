import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'about', component: AboutPageComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' }, // redirect to `first-component`
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
