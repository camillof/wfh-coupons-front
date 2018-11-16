import { Component, OnInit, ViewChild, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Coupon, CouponFilteringParams } from '../coupon';
import { CouponsService } from '../coupons.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDatepickerInputEvent, MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/shared/modals/confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';



@Component({
  selector: 'app-my-coupons',
  templateUrl: './my-coupons.component.html',
  styleUrls: ['./my-coupons.component.scss'],
  providers: [DatePipe],
})
  
export class MyCouponsComponent implements OnInit {

  // TO-DO: put this on a config file or retrieve from api.
  readonly TOTAL_DAYS_AVAILABLE = 6

  displayedColumns: string[] = ['created_at', 'requested_date', 'status', 'delete'];
  dataSource: MatTableDataSource<Coupon> = new MatTableDataSource([])
  
  dateFilter = (d: Date): boolean => {
    
    // Prevent Saturday and Sunday from being selected.
    // return day !== 0 && day !== 6;
    return !(this.dataSource.data.filter(coupon => {
      const couponDate = new Date(coupon.requested_date);
      return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() == new Date(couponDate.getUTCFullYear(), couponDate.getUTCMonth(), couponDate.getUTCDate()).getTime();
    }).length > 0);
  }

  currentDate = new Date();
  selectedMonth = this.currentDate;

  maxDate = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, 0);
  minDate = this.currentDate;
  datePickerDate: Date;

  isLoading: boolean = true;
  

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private couponsService: CouponsService, public dialog: MatDialog,
    private datePipe: DatePipe, public dateAdapter: DateAdapter<any>,
    @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats,
    public snackBar: MatSnackBar, private authService: AuthService) { }

  ngOnInit() {
    this.refreshCoupons();

    this.sort.sort({ id: 'requested_date', start: 'desc', disableClear: true })
    
  }

  refreshCoupons() {
    const filters = new CouponFilteringParams({by_month: this.selectedMonth.getMonth() + 1, by_user_id: this.authService.User.id})
    this.isLoading = true;
    this.couponsService.getAllCoupons(filters).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;

    }, error => {}, () => {
      this.isLoading = false;
    });
  }

  isOlderThanToday(coupon: Coupon): boolean {
    return new Date(coupon.requested_date) < new Date();
  }

  canDelete(coupon: Coupon): boolean {
    return coupon.status == Coupon.STATUSES.pending
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

  dateSelected(event: MatDatepickerInputEvent<Date>) {
    this.datePickerDate = undefined;
    const message = `You selected ${this.datePipe.transform(event.value, 'fullDate')}. Do you want to confirm?`
    const dialogRef = this.dialog.open(ConfirmDialog, { data: { message: message } });
    event.target.value = undefined;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result == true) {
        const coupon = new Coupon();
        coupon.user_id = 1;
        coupon.requested_date = event.value;
        this.couponsService.saveCoupon(coupon).subscribe(result => {
          this.snackBar.open("Coupon created succefully", "Accept", { duration: 3000 });
          this.refreshCoupons();
        })
      }
    });
    
  }

  get periodLabel() {
    return this.dateAdapter
      .format(this.selectedMonth, this.dateFormats.display.monthYearA11yLabel)
      .toLocaleUpperCase();
  }

  moveMonth(move: "next" | "previous") {
    if (move === "next") {
      this.selectedMonth = this.minDate = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, 1);
      this.maxDate = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, 0);
      this.refreshCoupons();
    } else if (move === "previous" )  {
      this.selectedMonth = this.minDate = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() - 1, 1);
      this.maxDate = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, 0);
      this.refreshCoupons();
    }
    if (this.selectedMonth.getTime() < this.currentDate.getTime()) {
      this.minDate = this.currentDate;
    }
  }

  get isNextMonth() {
    return this.selectedMonth.getMonth() > this.currentDate.getMonth();
  }

  get isPastMonth() {
    return this.selectedMonth.getMonth() < this.currentDate.getMonth();
  }
  
  chosenMonthHandler(date: Date, datepicker: MatDatepicker<any>) { 
    this.selectedMonth = this.minDate = date;
    this.maxDate = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, 0);
    if (this.selectedMonth.getTime() < this.currentDate.getTime()) {
      this.minDate = this.currentDate;
    }
    this.refreshCoupons();
    datepicker.close();
  }

  get countDaysLeft(): number {
    return this.TOTAL_DAYS_AVAILABLE - this.dataSource.data.filter(x => {
      return !(x.status == Coupon.STATUSES.rejected)
    }).length;
  }


}
