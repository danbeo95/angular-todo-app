import * as firbase from 'firebase';
export interface Todo {
    name: string;
    piority: 'hight' | 'normal',
    status: 'done' | 'progress',
    id: string;
    createdAt: firbase.firestore.Timestamp;
    startAt: firbase.firestore.Timestamp;
    searchKeywords: Array<string>
}