import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChpasswordComponent } from './chpassword.component';

describe('ChpasswordComponent', () => {
  let component: ChpasswordComponent;
  let fixture: ComponentFixture<ChpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChpasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
