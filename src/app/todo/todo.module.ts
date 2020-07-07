import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoListPageComponent } from './pages/todo-list-page/todo-list-page.component';
import { TodoUpsertDialogComponent } from './components/todo-upsert-dialog/todo-upsert-dialog.component';
import { MatSidenavModule, MatListModule, MatIconModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatSelectModule, MatDatepickerModule } from '@angular/material';


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
    MatDatepickerModule
  ],
  entryComponents: [
    TodoUpsertDialogComponent
  ]
})
export class TodoModule { }
