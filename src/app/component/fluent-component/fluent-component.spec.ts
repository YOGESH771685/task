import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluentComponent } from './fluent-component';

describe('FluentComponent', () => {
  let component: FluentComponent;
  let fixture: ComponentFixture<FluentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
