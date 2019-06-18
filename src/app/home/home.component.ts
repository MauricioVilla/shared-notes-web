import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  whiteLetters = true;
  authenticated: boolean;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.isAuthorized()
      .pipe(finalize(() => {
      }))
      .subscribe(data => {this.authenticated = data; });
  }
}
