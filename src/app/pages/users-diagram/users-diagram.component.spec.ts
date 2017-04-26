import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTreeDiagramComponent } from './users-diagram.component';

describe('UsersTreeDiagramComponent', () => {
  let component: UsersTreeDiagramComponent;
  let fixture: ComponentFixture<UsersTreeDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersTreeDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTreeDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
