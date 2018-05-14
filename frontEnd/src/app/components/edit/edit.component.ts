import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormControlName } from '@angular/forms';
import { AuthenticationService } from '../../services/authService/authentication.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GenericValidator } from '../../shared/generic-validator';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { NumberValidators } from '../../shared/number.validator';
import { DISABLED } from '@angular/forms/src/model';
import { Subject } from '../../models/subjects.model';


@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  userDetail: FormGroup;
  userDetailCopy = {};
  subjects: FormGroup;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router) {
      this.validationMessages = {
        name: {
            required: 'Name is required.',
            minlength: 'Name must be at least three characters.',
            maxlength: 'Name cannot exceed 100 characters.'
        },
        address: {
            required: 'Address is required.'
        },
        email_id: {
            required: 'Email is required',
            email: 'Invalid Email'
        },
        contactNumber: {
          required: 'Contact Number is required',
          maxlength: 'Contact number be of size 10'
        }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
   }

  ngOnInit() {
    let val1Control;
    if ( this.activeRoute.snapshot.params.id) {
    val1Control = this.fb.control({value: this.activeRoute.snapshot.params.id, disabled: true});
    } else {
    val1Control = this.fb.control({value: this.authService.getId(), disabled: true});
    }
      this.userDetail = this.fb.group({
        id: val1Control,
        name: ['', [Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(100)]],
        address: ['', Validators.required],
        post: [''],
        contactNumber: ['', [Validators.required,
           Validators.maxLength(10)]],
        email_id: ['', [Validators.email,
           Validators.required]],
        dateOfBirth: [''],
        subject: this.fb.array([new FormGroup({
            name: new FormControl('', Validators.required),
            stream: new FormControl(),
            semester: new FormControl()
          })
        ]),
    });
    // console.log(this.userDetail);
  }

  replaceTZ(time) {
    if (time !== undefined ) {
    let t1 = time.replace(/[TZ]|.000/g , ' ');
    t1 = t1.split(' ');
    return t1[0];
    }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
      const  controlBlurs: Observable<any>[] = this.formInputElements
          .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

      // Merge the blur event observable with the valueChanges observable
      Observable.merge(this.userDetail.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
          this.displayMessage = this.genericValidator.processMessages(this.userDetail);
      });
  }
  get subject(): FormArray {
    return <FormArray>this.userDetail.get('subject');
  }

  addTag(): void {
    this.subject.push(new FormGroup({
      name: new FormControl('', Validators.required),
      stream: new FormControl(),
      semester: new FormControl()
    }));
  }
  deleteTag(index: number): void {
    this.subject.removeAt(index);
    // The line below is required in Angular 4 to fix a bug with `removeAt` that was fixed in Angular 5.
  }
  onSubmitEdit() {
    this.userDetail.value.dateOfBirth = new Date(this.userDetail.value.dateOfBirth);
    if (this.authService.isAdmin() && this.activeRoute.snapshot.params.id) {
      this.userDetail.value.id = this.activeRoute.snapshot.params.id;
    } else {
      this.userDetail.value.id = this.authService.getId();
    }
    // console.log(this.userDetail);
    this.authService.editUser(this.userDetail.value).subscribe(data => {
      console.log(data);
      this.router.navigate(['/']);
    });
  }
}
