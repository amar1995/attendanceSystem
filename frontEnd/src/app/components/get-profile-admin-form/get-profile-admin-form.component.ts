import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-get-profile-admin-form',
  templateUrl: './get-profile-admin-form.component.html',
  styleUrls: ['./get-profile-admin-form.component.css']
})
export class GetProfileAdminFormComponent implements OnInit {
  formId: FormGroup;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
    private router: Router) {
    this.createForm();
    this.validationMessages = {
      id: {
          required: 'Id is required.',
          range: 'Rate the product between 1 (lowest) and 100 (highest).'
          }
      };
      this.genericValidator = new GenericValidator(this.validationMessages);
    }

  ngOnInit() {
  }

  createForm() {
    this.formId = this.fb.group({
      id: ['', [
        Validators.required,
        NumberValidators.range(1, 100)]]
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    Observable.merge(this.formId.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.formId);
    });
  }
  onSubmit() {
    this.router.navigate([`/profile/${this.formId.value.id}`]);
  }
}
