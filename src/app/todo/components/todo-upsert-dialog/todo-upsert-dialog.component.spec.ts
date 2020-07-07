import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoUpsertDialogComponent } from './todo-upsert-dialog.component';

describe('TodoUpsertDialogComponent', () => {
  let component: TodoUpsertDialogComponent;
  let fixture: ComponentFixture<TodoUpsertDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoUpsertDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoUpsertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
