import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialog } from './modals/confirm-dialog/confirm-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EmptyCalendarHeaderComponent } from './components/empty-calendar-header/empty-calendar-header.component';




const SHARED_MODULES = [
  MatToolbarModule,
  MatButtonModule,
  MatTableModule,
  MatInputModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatIconModule,
  MatDialogModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSortModule,
  MatSidenavModule,
  MatListModule,
  MatChipsModule,
  MatCheckboxModule
];

const MODALS = [
  ConfirmDialog,
]

const COMPONENTS = [
  EmptyCalendarHeaderComponent
]

@NgModule({
  imports: [
    ...SHARED_MODULES
  ],
  exports: [
    ...SHARED_MODULES
  ],
  declarations: [
    ...MODALS,
    ...COMPONENTS
    
  ],
  entryComponents: [
    ...MODALS,
    ...COMPONENTS
  ]
})
export class MaterialModule { }
