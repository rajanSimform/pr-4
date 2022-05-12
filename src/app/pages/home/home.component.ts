import { Component, OnInit } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { DepartmentService } from 'src/app/app-service/department.service';
import { Department } from 'src/app/models/department.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allDepts: Department[];
  allUsers: User[];
  usersByDept: Partial<User[]>;
  usersByDeptLength: number;

  constructor(private _deptService: DepartmentService) {}

  ngOnInit(): void {
    this._deptService._deptSubject.subscribe((x) => {
      this.allDepts = x;
      this.allDepts.map((row) => {
        row.userCount = this._deptService.getCount(row.deptName);
      });
    });
    this._deptService._userSubject.subscribe((x) => (this.allUsers = x));
  }

  step: number;

  setStep(index: number) {
    this.step = index;
  }

  getUserByDept(deptName: string) {
    return this._deptService.getUsersByDeptName(deptName);
  }
}
