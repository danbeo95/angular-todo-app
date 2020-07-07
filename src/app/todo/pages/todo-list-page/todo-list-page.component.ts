import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TodoUpsertDialogComponent } from '../../components/todo-upsert-dialog/todo-upsert-dialog.component';

@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListPageComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onClickAdd() {
    const ref = this.dialog.open(TodoUpsertDialogComponent, {
      width: '500px'
    });
  }
}
