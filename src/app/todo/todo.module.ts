import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoListPageComponent } from './pages/todo-list-page/todo-list-page.component';
import { TodoUpsertDialogComponent } from './components/todo-upsert-dialog/todo-upsert-dialog.component';
import { MatSidenavModule, MatListModule, MatIconModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatSelectModule, MatDatepickerModule, MatToolbarModule, MatProgressSpinnerModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TodoListPageComponent, TodoUpsertDialogComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDatepickerModule
  ],
  entryComponents: [
    TodoUpsertDialogComponent
  ]
})
export class TodoModule { }
