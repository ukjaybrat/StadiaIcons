import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiaComponent } from './stadia.component';

describe('StadiaComponent', () => {
  let component: StadiaComponent;
  let fixture: ComponentFixture<StadiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StadiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StadiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
