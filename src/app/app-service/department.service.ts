import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Department } from '../models/department.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor() {}

  departments: Department[] = [
    new Department('NodeJs'),
    new Department('ReactJs'),
    new Department('Mean'),
    new Department('QA'),
  ];
  _deptSubject = new BehaviorSubject<Department[]>(this.departments);

  users: User[] = [
    new User('Nirali', 'Mean'),
    new User('Nirali', 'NodeJs'),
    new User('Rajan', 'Mean'),
    new User('Rajan', 'ReactJs'),
    new User('Prem', 'QA'),
    new User('Raj', 'QA'),
    new User('Jay', 'Mean'),
  ];
  _userSubject = new BehaviorSubject<User[]>(this.users);

  getUsersByDeptName(deptName: string) {
    return this.users.filter((user) => user.deptName === deptName);
  }

  addDeptartment(name: string) {
    this.departments.push(new Department(name));
  }

  addUser(name: string, deptName: string) {
    this.users.push(new User(name, deptName));
  }

  getCount(deptName: string) {
    return this.users.filter((user) => user.deptName === deptName).length;
  }
  // groupByUsers(users:User[], depts:Department[]){
  //   let obj:any
  //   for(let user of users){
  //     let arr = []
  //     if(depts.map(x=>x.deptName).includes(user.deptName)){
  //       obj[user.deptName]
  //     }
  //   }
  // }
}
