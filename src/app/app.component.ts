import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from './mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'diary';

  openDialog(): void {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      width:"100%",
      maxWidth: '395px',
      height: "auto",
      minHeight: '207px'
    });
  }
  

  
  constructor(public dialog: MatDialog){}
}