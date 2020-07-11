import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-upsert-dialog',
  templateUrl: './todo-upsert-dialog.component.html',
  styleUrls: ['./todo-upsert-dialog.component.scss']
})
export class TodoUpsertDialogComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean;
  currentDate = new Date();
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialogRef<TodoUpsertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Todo,
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      piority: this.fb.control('', [Validators.required]),
      startAt:this.fb.control('',[Validators.required])
    });
    if (this.data) {
      this.form.patchValue({
        ...this.data,
        startAt:this.data.startAt.toDate()
      });
    }
  }

  onClickSave() {
    if (!this.data) {
      this.doAddNewTodo();
    } else {
      this.doUpdateTodo();
    }
  }
  doAddNewTodo() {
    const todo = this.form.value as Todo;
    this.todoService.addTodo({ ...todo, status: 'progress', searchKeywords: todo.name.split('') }).then(() => {
      this.isLoading = false;
      this.dialog.close();
    }, e => {
      this.isLoading = false;
    })
  }
  doUpdateTodo() {
    const todo = this.form.value as Todo;
    this.todoService.uodateTodo(this.data.id, todo).then(() => {
      this.isLoading = false;
      this.dialog.close();
    }, e => {
      this.isLoading = false;
    })
  }
  onClickClose() {
    this.dialog.close();
  }
}
