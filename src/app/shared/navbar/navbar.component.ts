import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CollapseDirective } from 'ngx-bootstrap/collapse';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('registracijaModal') public registracijaModal?: ModalDirective;
  @ViewChild('prijavaModal') public prijavaModal?: ModalDirective;

  private _isCollapsed: boolean = true;
  collapseRef: any;
  router: any;
  route: any;


  set isCollapsed(value) {
    this._isCollapsed = value;
  }
  get isCollapsed() {
    if (this.collapseRef) {
      // temp fix for "overflow: hidden"
      if (getComputedStyle(this.collapseRef.nativeElement).getPropertyValue('display') === 'flex') {
       this.renderer.removeStyle(this.collapseRef.nativeElement, 'overflow');
      }
    }
    return this._isCollapsed;
  }

  @ViewChild(CollapseDirective, { read: ElementRef, static: false }) collapse !: CollapseDirective;


  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void{
    this.collapseRef = this.collapse;
  }
}
