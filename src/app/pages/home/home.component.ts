import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DepartmentService } from 'src/app/app-service/department.service';
import { AddDeptFormComponent } from 'src/app/includes/add-dept-form/add-dept-form.component';
import { AddUserFormComponent } from 'src/app/includes/add-user-form/add-user-form.component';
import { Department } from 'src/app/models/department.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  allDepts: Department[];
  allUsers: User[];
  usersByDept: Partial<User[]>;
  usersByDeptLength: number;
  allSubscriptions: Subscription[] = [];

  constructor(
    private _deptService: DepartmentService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // get all departments
    const deptSubscription = this._deptService._deptSubject.subscribe((x) => {
      this.allDepts = x;
      this.allDepts.map((row) => {
        row.userCount = this._deptService.getCount(row.deptName);
      });
    });
    // get all users
    const userSubscription = this._deptService._userSubject.subscribe(
      (x) => (this.allUsers = x)
    );
    // push all subscription to array
    this.allSubscriptions.push(deptSubscription, userSubscription);
  }

  step: number;

  setStep(index: number) {
    this.step = index;
  }

  getUserByDept(deptName: string) {
    return this._deptService.getUsersByDeptName(deptName);
  }

  openAddDeptDialog() {
    const dialogRef = this.dialog.open(AddDeptFormComponent);
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserFormComponent);
  }

  ngOnDestroy(): void {
    // unsubscribe all subscriptions
    this.allSubscriptions.forEach((sub) => sub.unsubscribe());
  }
}
