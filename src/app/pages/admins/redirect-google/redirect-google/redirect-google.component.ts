import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Coupon, CouponFilteringParams } from 'src/app/pages/users/coupons/coupon';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { CouponsService } from 'src/app/pages/users/coupons/coupons.service';
import { ConfirmDialog } from 'src/app/shared/modals/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../users/user';
import { UsersService } from '../../users/users.service';
import { MatChipSelectionChange } from '@angular/material/chips';


@Component({
  selector: 'app-redirect-google',
  templateUrl: './redirect-google.component.html',
  styleUrls: ['./redirect-google.component.scss']
})
export class RedirectGoogleComponent implements OnInit {

  

  constructor(private couponsService: CouponsService, public dialog: MatDialog, public snackBar: MatSnackBar,
    private usersService: UsersService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    debugger;
    this.activatedRoute.queryParams.subscribe(params => {
      this.usersService.callback(params["code"]).subscribe((res:any) => {
         window.location.href = res.data;
      });
    });
    
    
   

  }


}
