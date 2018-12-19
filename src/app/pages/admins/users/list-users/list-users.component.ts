import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UsersService } from '../users.service';
import { User, Invitation } from '../user';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ['created_at', 'name', 'email', 'role', 'active','ccoupons'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource([])
  isLoading: boolean = true;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersService: UsersService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.refreshUsers();
    
  }

  refreshUsers() {
    // const filters = new CouponFilteringParams({ by_month: this.selectedMonth.getMonth() + 1 })
    this.isLoading = true;
    this.usersService.getAll().subscribe(res => {
      debugger;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
    }, error => { }, () => {
      this.isLoading = false;
    });
  }

  createUser() {
    const dialogRef = this.dialog.open(CreateUserComponent);
    dialogRef.afterClosed().subscribe((result: User) => {
      const invitation = new Invitation(result.email, result.name, result.role);
      this.usersService.sendInvitation(invitation).subscribe(res => {

        this.snackBar.open("Invitation sent succefully", "Accept", { duration: 3000 });
        this.refreshUsers();
      });
    });
  }

}
