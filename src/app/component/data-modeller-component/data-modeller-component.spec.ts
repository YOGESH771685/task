import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataModellerComponent } from './data-modeller-component';

describe('DataModellerComponent', () => {
  let component: DataModellerComponent;
  let fixture: ComponentFixture<DataModellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataModellerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataModellerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
