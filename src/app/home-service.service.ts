import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


export interface ToDoData {
  tId: any
  name: string
  status: string
  quantity: string
  category: any
  category_id:any
}
export interface Category {
  cat_id: any
  category: string
}


@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  constructor(private http: HttpClient) { }
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // }
  getToDo() {
    return this.http.get<ToDoData[]>('http://localhost/todoData/get.php',);
  };
  getCat() {
    return this.http.get<Category[]>('http://localhost/todoData/get-category.php',);
  };
  deleteList(id : number){
    return this.http.delete<ToDoData[]>('http://localhost/todoData/delete.php?id=' + id);
  };
  createList(todoData : ToDoData){
    return this.http.post('http://localhost/todoData/post.php', todoData);
  };
  createCategory(category: Category){
    return this.http.post('http://localhost/todoData/post-category.php', category);
  };
  updateList(todoData : ToDoData){
    console.log(todoData, 'todo');
    return this.http.put('http://localhost/todoData/edit.php'+'?id=' +todoData.tId, todoData);
  };
}
