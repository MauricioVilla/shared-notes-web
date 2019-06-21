import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '@app/core';
import { LoginService } from '@app/login/login.service';
import {finalize} from 'rxjs/operators';
import { LoginContext } from '@app/core/auth/authentication.service';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  whiteLetters = false;
  error: string;
  returnUrl: any;
  loginForm: FormGroup;
  @ViewChild('logInFail') private logInFail: SwalComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private loginServices: LoginService

  ) {
  }

  ngOnInit() {
    this.createForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  public logIn() {
    this.authService.login(this.loginForm.value)
      .pipe(finalize(() => {
        this.loginForm.markAsPristine();
      }))
      .subscribe(() => {
        console.log(`User successfully logged`);
        this.consultUserLogged(this.username.value);
        location.reload(true);
        this.router.navigate(['/boards']);
      }, error => {
        this.logInFail.show();
        console.log(`Login error: ${error.message}`);
        this.error = error;
      });
  }

  consultUserLogged(username: string) {
    this.authService.getUser(username)
      .subscribe(
        data => {
          localStorage.setItem('username', data.username);
          localStorage.setItem('userId', data.id);
        }
      );
  }

}
