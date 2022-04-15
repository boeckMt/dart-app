import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from 'src/app/shared/utils';
import { PlayerMenuComponent } from '../player-menu/player-menu.component';

interface IData {
  name: Player['name'];
}
@Component({
  selector: 'app-end-dialog',
  templateUrl: './end-dialog.component.html',
  styleUrls: ['./end-dialog.component.css']
})
export class EndDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PlayerMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IData,
  ) { }

  ngOnInit(): void {
  }

}
