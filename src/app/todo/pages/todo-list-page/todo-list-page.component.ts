import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TodoUpsertDialogComponent } from '../../components/todo-upsert-dialog/todo-upsert-dialog.component';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListPageComponent implements OnInit {
  form: FormGroup;
  canShowFooter: boolean;
  totalSelected: number;
  todos: Array<Todo> = [];
  isLoading: boolean;
  isSearching: boolean;
  searchForm = new FormControl();
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.initForm();
    this.onFormChange();
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      this.addTodosToForm(todos);
    });
    this.onSearch();
  }
  onSearch() {
    this.searchForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(val => {
        this.isSearching = true;
        return this.todoService.searchTodo(val);
      })
    ).subscribe(todos => {
      this.isSearching = false;
      this.todos = todos;
    })
  }
  onClickAdd() {
    const ref = this.dialog.open(TodoUpsertDialogComponent, {
      width: '500px',
      disableClose: true
    });
  }
  initForm() {
    this.form = this.fb.group({
      todos: this.fb.array([])
    });
  }
  get todosFormArray(): FormArray {
    return this.form.get('todos') as FormArray;
  }

  addTodosToForm(todos) {
    todos.forEach(todo => {
      this.todosFormArray.push(this.fb.control(false));
    })
  }
  onFormChange() {
    this.todosFormArray.valueChanges.subscribe((val: Array<boolean>) => {
      this.canShowFooter = val.some(item => item);
      this.totalSelected = val.filter(item => item).length;
    })
  }
  onClickDoneAll() {
    this.isLoading = true;
    const updateTodos = this.todos.filter((todo, i) => {
      return this.todosFormArray.value[i]
    }).map(todo => {
      return { ...todo, status: 'done' } as Todo;
    });
    this.todoService.updateTodos(updateTodos).then(res => {
      this.todosFormArray.reset();
      this.isLoading = false;
    }, e => {
      this.isLoading = false;
    })
  }
  onClickDetail(todo: Todo) {
    const ref = this.dialog.open(TodoUpsertDialogComponent, {
      width: '500px',
      hasBackdrop: true,
      data: todo,
      disableClose: true
    });
  }
  onClickRemove(todoId: string) {
    this.todoService.deleteTodo(todoId).then(() => {

    }, e => {

    })
  }
  onClickRemoveAll() {
    this.isLoading = true;
    const todoIds = this.todos.filter((todo, i) => {
      return this.todosFormArray.value[i]
    }).map(todo => todo.id)
    this.todoService.removeTodos(todoIds).then(() => {
      this.isLoading = false;
      this.todosFormArray.reset();
    }, e => {
      this.isLoading = false;
    })
  }
}
