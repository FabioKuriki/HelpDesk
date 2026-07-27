import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextArea } from './input-text-area';

describe('InputTextArea', () => {
  let component: InputTextArea;
  let fixture: ComponentFixture<InputTextArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextArea],
    }).compileComponents();

    fixture = TestBed.createComponent(InputTextArea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
