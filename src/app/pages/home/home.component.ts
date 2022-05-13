import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  deptFilter = new FormControl();
  filterInput: string[] = ['All'];
  filteredDept: Department[];
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
    this.deptFilter.setValue(this.filterInput);
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

  filterSelected() {
    const list = this.deptFilter.value;
    console.log('before', list);

    if (list.length === 0 || list.length === this.allDepts.length) {
      this.deptFilter.setValue(['All']);
      console.log('1st If', list);
    }

    if (list[0] === 'All') {
      this.deptFilter.setValue(['All']);
      console.log('2nd If', list);
    }

    if (list[0] === 'All' && list.length == 2) {
      list.shift();
      this.deptFilter.setValue(list);
      console.log('3rd If', list);
    }

    // if (this.deptFilter.value[0] === 'All' && this.deptFilter.touched) {
    //   this.deptFilter.setValue(['All']);
    // } else {
    //   // if other is selected then remove "ALL"
    //   if (this.deptFilter.value[0] === 'All') {
    //     this.deptFilter.value.shift();
    //     this.deptFilter.setValue(this.deptFilter.value);
    //   }
    // }
    // // when option selected other than "ALL"

    console.log('after', list);
  }

  ngOnDestroy(): void {
    // unsubscribe all subscriptions
    this.allSubscriptions.forEach((sub) => sub.unsubscribe());
  }
}
