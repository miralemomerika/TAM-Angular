import { SharedDataService } from './../../core/services/shared-data.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CollapseDirective } from 'ngx-bootstrap/collapse';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AuthenticationService } from '../../core/services/authentication.service';
import { OrganizerGuard } from '../guards/organizer.guard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('registracijaModal') public registracijaModal?: ModalDirective;
  @ViewChild('prijavaModal') public prijavaModal?: ModalDirective;

  public isUserAuthenticated: boolean = false;
  public isUserOrganizer: boolean = false;
  private _isCollapsed: boolean = true;
  collapseRef: any;
  router: any;
  route: any;
  show: boolean = false;
  brojAktivnihRecenzija!: number | null;


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


  constructor(private renderer: Renderer2, private authService: AuthenticationService,
    private sharedData: SharedDataService, public organizerGuard:OrganizerGuard) {
      // this.authService.authChanged
      // .subscribe(res => {
      // this.isUserAuthenticated = res;
  //})
  // this.authService.organizerChanged
  //     .subscribe(res => {
  //     this.isUserOrganizer = res;
  // })
     }

  ngOnInit(): void {
    // this.authService.authChanged
    // .subscribe((res: any) => {
    //   this.isUserAuthenticated = res;
    // });
    // this.authService.organizerChanged
    // .subscribe((res: any) => {
    //   this.isUserOrganizer = res;
    // });
    this.authService.authChanged
    .subscribe((res: any) => {
      this.isUserAuthenticated = res;
    });
    if(this.authService.isUserAuthenticated() === true)
      this.isUserAuthenticated = true;
    else
      this.isUserAuthenticated = false;
    
    this.authService.organizerChanged
    .subscribe((res: any) => {
      this.isUserOrganizer = res;
    });
    if(this.authService.isUserOrganizer() === true)
      this.isUserOrganizer = true;
    else
      this.isUserOrganizer = false;
    // this.isUserOrganizer=Boolean(this.authService.isUserOrganizer);
    // this.isUserAuthenticated=Boolean(this.authService.isUserAuthenticated);
    this.sharedData.trenutniBroj.subscribe(broj => this.brojAktivnihRecenzija = broj);
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
