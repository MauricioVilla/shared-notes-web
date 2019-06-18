import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() setWhiteLetters: boolean;
  @Input() setAuthenticated: boolean;

  whiteLetters: boolean;
  authenticated: boolean;

  constructor(private router: Router,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.whiteLetters = this.setWhiteLetters;
    this.authenticated = this.setAuthenticated;
  }

  logOut() {
    this.authService.logout();
    this.router.navigate([''] );
  }
}
