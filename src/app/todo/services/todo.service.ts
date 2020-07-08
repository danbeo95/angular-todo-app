import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Todo } from '../models/todo';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosCollection: AngularFirestoreCollection<Todo>;
  constructor(
    private afstore: AngularFirestore
  ) {
    this.todosCollection = this.afstore.collection<Todo>('todos');
  }

  addTodo(todo: Todo) {
    return this.todosCollection.add({ ...todo, createdAt: firebase.firestore.Timestamp.now() });
  }
  uodateTodo(todoId: string, todo: Partial<Todo>) {
    return this.todosCollection.doc(todoId).update(todo);
  }
  getTodos() {
    return this.afstore.collection<Todo>('todos', ref => ref.orderBy('createdAt', 'desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        return { ...data, id: a.payload.doc.id }
      }))
    )
  }
  getTodo(todoId: string) {
    return this.todosCollection.doc<Todo>(todoId).get().pipe(
      map(action => {
        const data = action.data();
        return { ...data, id: todoId };
      })
    )
  }
  updateTodos(todos: Array<Partial<Todo>>) {
    const batch = this.afstore.firestore.batch();
    todos.forEach(todo => {
      const todoRef = this.todosCollection.doc(todo.id).ref;
      batch.update(todoRef, todo);
    });
    return batch.commit();
  }
  removeTodos(todoIds: Array<string>) {
    const batch = this.afstore.firestore.batch();
    todoIds.forEach(id => {
      const todoRef = this.todosCollection.doc(id).ref;
      batch.delete(todoRef);
    });
    return batch.commit();
  }
  deleteTodo(todoId: string) {
    return this.todosCollection.doc(todoId).delete();
  }
  searchTodo(query: string) {
    return query ? this.afstore.collection<Todo>('todos', ref => ref.where('name', '==', query)).valueChanges() : this.afstore.collection<Todo>('todos').valueChanges();;
  }
}
