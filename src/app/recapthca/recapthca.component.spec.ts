import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapthcaComponent } from './recapthca.component';

describe('RecapthcaComponent', () => {
  let component: RecapthcaComponent;
  let fixture: ComponentFixture<RecapthcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecapthcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapthcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
