import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { User } from './user.model'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  userChanged = new Subject<User[]>()

  private userArray:User[] = [];

  setUser(users:User[]){
    this.userArray = users
    this.userChanged.next(this.userArray.slice());
  }

  addUser(user:{id:string, name:string, technology:string}){
    this.userArray.push(user);
  }

  getUser(){
    return this.userArray
  }

  deleteUser(index:number){
    this.userArray.splice(index,1);
  }

  saveUsers(){
    this.http.put('https://crud-34697-default-rtdb.firebaseio.com/users.json', this.userArray).subscribe()
  }
 
  fetchUsers(){
     return this.http.get('https://crud-34697-default-rtdb.firebaseio.com/users.json').pipe(
      map( data => {
        const user = JSON.stringify(data);
        this.userArray = JSON.parse(user)
      }))
    
  }

}
