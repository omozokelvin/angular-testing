import { async, fakeAsync, tick } from '@angular/core/testing';
/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { DataService } from '../shared/data.service';
import { UserComponent } from './user.component';
import { UserService } from './user.service';

describe('Component: User', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
    });
  });

  const getFixtureAndApp = () => {
    const fixture = TestBed.createComponent(UserComponent);
    const app = fixture.debugElement.componentInstance;

    return { fixture, app };
  };

  it('should create the app', () => {
    const { fixture, app } = getFixtureAndApp();
    expect(app).toBeTruthy();
  });

  it('should use the user name from the service', () => {
    const { fixture, app } = getFixtureAndApp();
    const userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges(); // we need to update the changes
    expect(userService.user.name).toEqual(app.user.name);
  });

  it('should display the user name if the user is logged in', () => {
    const { fixture, app } = getFixtureAndApp();

    app.isLoggedIn = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(app.user.name);
  });

  it(`shouldn't display the user name if user is not logged in`, () => {
    const { fixture, app } = getFixtureAndApp();

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).not.toContain(
      app.user.name
    );
  });

  it(`shouldn't fetch data successfully if not called asynchronously`, () => {
    const { fixture, app } = getFixtureAndApp();
    const dataService = fixture.debugElement.injector.get(DataService);

    const spy = spyOn(dataService, 'getDetails').and.returnValue(
      Promise.resolve('Data')
    );

    fixture.detectChanges();
    expect(app.data).toBe(undefined);
  });

  it(`should fetch data successfully if called asynchronously`, fakeAsync(() => {
    const { fixture, app } = getFixtureAndApp();
    const dataService = fixture.debugElement.injector.get(DataService);

    const spy = spyOn(dataService, 'getDetails').and.returnValue(
      Promise.resolve('Data')
    );

    fixture.detectChanges();
    tick();
    expect(app.data).toBe('Data');
  }));
});
