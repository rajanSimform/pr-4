import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DepartmentService } from 'src/app/app-service/department.service';
import { Department } from 'src/app/models/department.model';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss'],
})
export class AddUserFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  deptSubs: Subscription;
  allDept: Department[];

  constructor(
    private fb: FormBuilder,
    private _deptService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      deptName: [null, [Validators.required]],
    });

    //get allDept for select options
    this.deptSubs = this._deptService._deptSubject.subscribe(
      (x) => (this.allDept = x)
    );
  }

  saveDetails(form: FormGroup) {
    this._deptService.addUser(form.value.name, form.value.deptName);
  }

  ngOnDestroy(): void {
    this.deptSubs.unsubscribe();
  }
}
