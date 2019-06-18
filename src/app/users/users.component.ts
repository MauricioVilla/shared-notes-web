import {Component, OnInit, ViewChild} from '@angular/core';
import { UsersService } from '@app/users/users.service';
import { UserModel } from '@app/users/users.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {BeforeOpenEvent, OpenEvent, SwalComponent, SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  whiteLetters = false;
  modalUserNotExist = false;
  formCreateAccount: FormGroup;
  @ViewChild('registerSuccess') private registerSuccess: SwalComponent;
  @ViewChild('registerFail') private registerFail: SwalComponent;

  constructor(private formBuilder: FormBuilder,
              private userService: UsersService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.formCreateAccount = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(80)]],
      email: ['', [Validators.required, Validators.maxLength(80), Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(80)]],
      num_document: ['', [Validators.required, Validators.maxLength(60)]],
      first_name: ['', [Validators.required, Validators.maxLength(60)]],
      last_name: ['', [Validators.required, Validators.maxLength(60)]],
    });
  }

  get username() { return this.formCreateAccount.get('username'); }
  get email() { return this.formCreateAccount.get('email'); }
  get password() { return this.formCreateAccount.get('password'); }
  get first_name() { return this.formCreateAccount.get('first_name'); }
  get last_name() { return this.formCreateAccount.get('last_name'); }
  get num_document() { return this.formCreateAccount.get('num_document'); }

  registerUser() {
    this.modalUserNotExist = false;
    const userModel: UserModel = {
      'username': this.username.value,
      'email': this.email.value,
      'password': this.password.value,
      'num_document': this.num_document.value,
      'first_name': this.first_name.value,
      'last_name': this.last_name.value,
    };
    this.userService.createUser(userModel)
      .subscribe(
        data => {
          this.username.setValue('');
          this.email.setValue('');
          this.password.setValue('');
          this.num_document.setValue('');
          this.first_name.setValue('');
          this.last_name.setValue('');
          this.registerSuccess.show();
        },
    error => {
          this.registerFail.show();
          console.log(`error: ${error.message}`);
        }
      );
  }

}
