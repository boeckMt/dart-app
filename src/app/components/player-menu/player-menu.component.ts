import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from 'src/app/shared/utils';


interface IData {
  name: Player['name'];
  remove: boolean;
}
@Component({
  selector: 'app-player-menu',
  templateUrl: './player-menu.component.html',
  styleUrls: ['./player-menu.component.css']
})
export class PlayerMenuComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PlayerMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IData,
  ) { }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
