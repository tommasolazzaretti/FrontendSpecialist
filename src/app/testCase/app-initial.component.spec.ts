import {TestBed, waitForAsync} from '@angular/core/testing';
/*
import { AppComponent } from './app.component';

describe('AppComponent', () => {
*/
describe('AppComponent (initial CLI version)', () => {
  beforeEach(waitForAsync(() => {
    TestBed
      .configureTestingModule({
        declarations: [AppComponent],
      })
      .compileComponents();
  }));

  it('should create the app frontEnd Specialist', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'frontEnd Specialist'`, waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('test for frontEnd Specialist');
  }));
});

/// As it should be
import {DebugElement} from '@angular/core';
import {ComponentFixture} from '@angular/core/testing';
import {AppComponent} from '../app.component';

describe('AppComponent (initial CLI version - as it should be)', () => {
  let app: AppComponent;
  let de: DebugElement;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    });

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    de = fixture.debugElement;
  });

  it('should create the app frontEnd Specialist', () => {
    expect(app).toBeDefined();
  });

  it(`should have as title 'frontEnd Specialist'`, () => {
    expect(app.title).toEqual('test for frontEnd Specialist');
  });

});


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
