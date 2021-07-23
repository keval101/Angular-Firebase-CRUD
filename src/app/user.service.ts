import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  userArray:User[] = [
    {
      id:1,
      name:'Keval',
      technology:'Angular'
    },
    {
      id:2,
      name:'ABC',
      technology:'VueJs'
    },
    {
      id:3,
      name:'DEF',
      technology:'React'
    }
  ];

  
}
