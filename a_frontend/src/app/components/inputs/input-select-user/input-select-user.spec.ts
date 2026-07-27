import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSelectUser } from './input-select-user';

describe('InputSelectUser', () => {
  let component: InputSelectUser;
  let fixture: ComponentFixture<InputSelectUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSelectUser],
    }).compileComponents();

    fixture = TestBed.createComponent(InputSelectUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
