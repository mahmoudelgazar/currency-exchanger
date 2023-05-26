import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangerHomeComponent } from './exchanger-home.component';

describe('ExchangerHomeComponent', () => {
  let component: ExchangerHomeComponent;
  let fixture: ComponentFixture<ExchangerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangerHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
