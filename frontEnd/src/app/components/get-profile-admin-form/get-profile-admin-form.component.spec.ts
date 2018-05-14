import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProfileAdminFormComponent } from './get-profile-admin-form.component';

describe('GetProfileAdminFormComponent', () => {
  let component: GetProfileAdminFormComponent;
  let fixture: ComponentFixture<GetProfileAdminFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetProfileAdminFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetProfileAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
