import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http'
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(private _userService:UserService, private http:HttpClient){}
  @ViewChild('id') formId:ElementRef;
  @ViewChild('name') formName:ElementRef;
  @ViewChild('technology') formTechnology:ElementRef;

  users:User[] = []
  subscription:Subscription;
  isfetching = false;
  editMode = false;
  editIndex:number;
  ngOnInit(){

    this._userService.userChanged.subscribe(
      (users:User[]) => {
        this.users = users
      }
    )
    this.users = this._userService.getUser()
  }

  onAddUser(id:string, name:string, technology:string){
    if(this.editMode){
      this.users[this.editIndex].id = this.formId.nativeElement.value
      this.users[this.editIndex].name = this.formName.nativeElement.value
      this.users[this.editIndex].technology = this.formTechnology.nativeElement.value
      this.editMode=false;

      this.formId.nativeElement.value = ''
      this.formName.nativeElement.value = ''
      this.formTechnology.nativeElement.value = ''

    } else{
      this._userService.addUser({id:id, name:name, technology:technology})
      
      this.formId.nativeElement.value = ''
      this.formName.nativeElement.value = ''
      this.formTechnology.nativeElement.value = ''
   }

}

  onDelete(index:number){
    this._userService.deleteUser(index)
    this.onSaveUser()
  }

  onSaveUser(){
    this._userService.saveUsers()
  }
  
  onFetchUser(){
    this.isfetching = true
    this._userService.fetchUsers().subscribe(
      data => {
        this.users = this._userService.getUser()
        this.isfetching = false
      }
    )
  }

  onEdit(index:number){
    this.editMode = true;
    this.editIndex= index
    this.formId.nativeElement.value = this.users[this.editIndex].id 
    this.formName.nativeElement.value  = this.users[this.editIndex].name 
    this.formTechnology.nativeElement.value  = this.users[this.editIndex].technology 
  }

}
