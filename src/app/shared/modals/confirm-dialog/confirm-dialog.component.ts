import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialog{

  readonly defaultTitle = `CONFIRM`;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) { 
    if (!data.message) {
      
    }
    if (!data.title) {
      data.title = this.defaultTitle;    
    }
    
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }


}

export class ConfirmDialogData {
  title: string;
  message: string;
}
