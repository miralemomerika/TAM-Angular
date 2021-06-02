import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CollapseDirective } from 'ngx-bootstrap/collapse';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('registracijaModal') public registracijaModal?: ModalDirective;
  @ViewChild('prijavaModal') public prijavaModal?: ModalDirective;

  public isUserAuthenticated: boolean = false;
  private _isCollapsed: boolean = true;
  collapseRef: any;
  router: any;
  route: any;
  show: boolean = false;


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


  constructor(private renderer: Renderer2, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.authChanged
    .subscribe((res: any) => {
      this.isUserAuthenticated = res;
    });
    
    if(this.authService.isUserAuthenticated() === true)
      this.isUserAuthenticated = true;
    else
      this.isUserAuthenticated = false;
  }

  public Logout = () => {
    this.authService.logout();
    // this.router.navigate(["/"]);
  }

  ngAfterViewChecked(): void{
    this.collapseRef = this.collapse;
  }

  ShowMobileMenu()
  {
    this.show = !this.show;
  }
}
