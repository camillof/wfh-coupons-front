
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RedirectGoogleComponent } from './redirect-google/redirect-google.component';



const routes: Routes = [
    {
        path: '',
        component: RedirectGoogleComponent,        
    }   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RedirectGoogleRoutingModule {
}
