import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Coupon, CouponFilteringParams } from 'src/app/pages/users/coupons/coupon';
import { MatSort } from '@angular/material/sort';
import { CouponsService } from 'src/app/pages/users/coupons/coupons.service';
import { ConfirmDialog } from 'src/app/shared/modals/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../users/user';
import { UsersService } from '../../users/users.service';
import { MatChipSelectionChange } from '@angular/material/chips';

@Component({
  selector: 'app-manage-coupons',
  templateUrl: './manage-coupons.component.html',
  styleUrls: ['./manage-coupons.component.scss']
})
export class ManageCouponsComponent implements OnInit {

  displayedColumns: string[] = ['user_name', 'created_at', 'requested_date', 'status', 'actions'];
  dataSource: MatTableDataSource<Coupon> = new MatTableDataSource([])


  isLoading: boolean = true;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;

  usersSource: User[] = []

  filtersActive: CouponFilteringParams = new CouponFilteringParams();
  filter_only_pending = true;
  filter_only_current_month = true;


  constructor(private couponsService: CouponsService, public dialog: MatDialog, public snackBar: MatSnackBar,
    private usersService: UsersService) { }

  ngOnInit() {
    this.refreshCoupons();
    this.usersService.getAll().subscribe(res => {
      this.usersSource = res;
    });
    this.sort.sort({ id: 'requested_date', start: 'desc', disableClear: true })

  }

  refreshCoupons() {
    // const filters = new CouponFilteringParams({ by_month: this.selectedMonth.getMonth() + 1 })
    this.filtersActive.by_status = this.filter_only_pending ? Coupon.STATUSES.pending : null;
    this.filtersActive.by_month = this.filter_only_current_month ? new Date().getMonth() + 1 : null;
    this.filtersActive.by_year = this.filter_only_current_month ? new Date().getFullYear() : null;

    this.isLoading = true;
    this.couponsService.getAllCoupons(this.filtersActive).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;

    }, error => { }, () => {
      this.isLoading = false;
    });
  }

  deleteCoupon(coupon: Coupon) {
    const message = `Do you want to delete this coupon?`
    const dialogRef = this.dialog.open(ConfirmDialog, { data: { message: message } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.couponsService.deleteCoupon(coupon.id).subscribe(() => {
          this.snackBar.open("Coupon deleted succefully", "Accept", { duration: 3000 });
        }, err => {
        }, () => {
          this.refreshCoupons();
        });
      }
    });
  }

  approveCoupon(coupon: Coupon) {
    this.couponsService.approveCoupon(coupon.id).subscribe(res => {
      this.refreshCoupons();
      this.snackBar.open("Coupon approved succefully", "Accept", { duration: 3000 });
      
    });
  }

  rejectCoupon(coupon: Coupon) {
    this.couponsService.rejectCoupon(coupon.id).subscribe(res => {
      this.refreshCoupons();
      this.snackBar.open("Coupon rejected succefully", "Accept", { duration: 3000 });

    })
  }

}
