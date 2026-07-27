import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCheckTicket } from './page-check-ticket';

describe('PageCheckTicket', () => {
  let component: PageCheckTicket;
  let fixture: ComponentFixture<PageCheckTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCheckTicket],
    }).compileComponents();

    fixture = TestBed.createComponent(PageCheckTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
