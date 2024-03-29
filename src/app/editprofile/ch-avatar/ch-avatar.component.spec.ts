import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChAvatarComponent } from './ch-avatar.component';

describe('ChAvatarComponent', () => {
  let component: ChAvatarComponent;
  let fixture: ComponentFixture<ChAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChAvatarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
