import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    isAdmin: new FormControl(false),
  });

  constructor(public dialogRef: MatDialogRef<CreateUserComponent>,) { }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.userForm.controls['email'].hasError('required') ? 'You must enter a value' :
      this.userForm.controls['email'].hasError('email') ? 'Not a valid email' :
        '';
  }

  saveUser() {
    const user = new User(this.userForm.value);
    this.dialogRef.close(user)
  }

}
