import { Component, OnInit,  AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { AuthenticationService } from '../../services/authService/authentication.service';
import * as jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myLoginForm: FormGroup;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  constructor(private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private _flashmessagesService: FlashMessagesService
    ) {
      this.validationMessages = {
        id: {
            required: 'Id is required.',
            range: 'Rate the product between 1 (lowest) and 100 (highest).'
        },
        password: {
            required: 'Password is required.'
        }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
   }

  ngOnInit() {
    this.myLoginForm = this.fb.group({
      id: ['', [Validators.required,
                NumberValidators.range(1, 100)]],
      password: ['', [Validators.required]]
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    Observable.merge(this.myLoginForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.myLoginForm);
    });
  }

  onSubmit() {
    // console.log(this.myLoginForm.value);
    this.authService.onLogin(this.myLoginForm.value)
    .subscribe(data => {
      console.log(jwtDecode(data.token));
      if (data.success) {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/']);
      } else {
        this._flashmessagesService.show('Id Or Password Incorrect!', { cssClass: 'alert-danger', timeout: 10000 });
      }
    });
  }
}
