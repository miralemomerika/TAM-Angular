import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IspitDodaj } from 'src/app/core/models/IspitDodaj';
import { IspitGet } from 'src/app/core/models/IspitGet';
import { IspitService } from 'src/app/core/services/ispit.service';

@Component({
  selector: 'app-ispit-items',
  templateUrl: './ispit-items.component.html',
  styleUrls: ['./ispit-items.component.css']
})
export class IspitItemsComponent implements OnInit {

  public aktivniIspiti!: IspitGet[];
  public neaktivniIspiti!: IspitGet[];
  @Output() public onEdit = new EventEmitter();
  @Output() public onDelete = new EventEmitter();
  addIspit!: FormGroup;
  tempIspit!: IspitGet;

  constructor(private router: Router, private ispitService: IspitService, private fb: FormBuilder) {

    this.ispitService.GetAktivneIspite().subscribe(data => {
      this.aktivniIspiti = data;
      console.log(data);
    });
    this.ispitService.GetNeaktivneIspite().subscribe(data => {
      this.neaktivniIspiti = data;
      console.log(data);
    });
   }

  ngOnInit(): void {
  }

  public uredi = (ispit: IspitGet)=>
  {
    this.onEdit.emit(ispit);
  }

  public izbrisi = (ispit: IspitGet)=>
  {
    this.onDelete.emit(ispit);
  }

}
