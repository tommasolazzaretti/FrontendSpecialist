import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

// Other imports
import {TestBed} from '@angular/core/testing';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {Book} from '../../model/Book';
import {BooksService} from './books.service';
import {asyncData} from '../../testCase/async-observable-helpers';

describe('booksService (with spies)', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let booksService: BooksService;

  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    booksService = new BooksService(httpClientSpy as any);
  });

  it('should return expected books (HttpClient called once)', () => {
    const expectedbooks: Book[] =
      [
        {
          title: '1',
          description: '1',
          author: '1',
          category: '1',
          price: 1,
          id: 1
        },
        {
          title: '2',
          description: '2',
          author: '2',
          category: '2',
          price: 2,
          id: 2
        }
      ];

    httpClientSpy.get.and.returnValue(asyncData(expectedbooks));

    booksService.loadBooks().subscribe(
      books => expect(books).toEqual(expectedbooks, 'expected books'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  // it('should return an error when the server returns a 404', () => {
  //   const errorResponse = new HttpErrorResponse({
  //     error: 'test 404 error',
  //     status: 404,
  //     statusText: 'Not Found'
  //   });
  //
  //   httpClientSpy.get.and.returnValue(asyncError(errorResponse));
  //
  //   booksService.loadBooks().subscribe(
  //     books => fail('expected an error, not books'),
  //     error => expect(error.message).toContain('test 404 error')
  //   );
  // });

});

describe('booksService (with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let booksService: BooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [BooksService]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    booksService = TestBed.inject(BooksService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// HeroService method tests begin ///
  describe('#getbooks', () => {
    let expectedbooks: Book[];

    beforeEach(() => {
      booksService = TestBed.inject(BooksService);
      expectedbooks = [
        {
          title: '1',
          description: '1',
          author: '1',
          category: '1',
          price: 1,
          id: 1
        },
        {
          title: '2',
          description: '2',
          author: '2',
          category: '2',
          price: 2,
          id: 2
        },
      ] as Book[];
    });

    it('should return expected books (called once)', () => {
      booksService.loadBooks().subscribe(
        books => expect(books).toEqual(expectedbooks, 'should return expected books'),
        fail
      );

      // HeroService should have made one request to GET books from expected URL
      const req = httpTestingController.expectOne(booksService.booksUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock books
      req.flush(expectedbooks);
    });

    it('should be OK returning no books', () => {
      booksService.loadBooks().subscribe(
        books => expect(books.length).toEqual(0, 'should have empty books array'),
        fail
      );

      const req = httpTestingController.expectOne(booksService.booksUrl);
      req.flush([]); // Respond with no books
    });

    it('should turn 404 into a user-friendly error', () => {
      const msg = 'Deliberate 404';
      booksService.loadBooks().subscribe(
        books => fail('expected to fail'),
        error => expect(error.message).toContain(msg)
      );

      const req = httpTestingController.expectOne(booksService.booksUrl);

      // respond with a 404 and the error message in the body
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return expected books (called multiple times)', () => {
      booksService.loadBooks().subscribe();
      booksService.loadBooks().subscribe();
      booksService.loadBooks().subscribe(
        books => expect(books).toEqual(expectedbooks, 'should return expected books'),
        fail
      );

      const requests = httpTestingController.match(booksService.booksUrl);
      expect(requests.length).toEqual(3, 'calls to getbooks()');

      // Respond to each request with different mock hero results
      requests[0].flush([]);
      requests[1].flush([{id: 1, name: 'bob'}]);
      requests[2].flush(expectedbooks);
    });
  });

  describe('#updateBook', () => {
    // Expecting the query form of URL so should not 404 when id not found
    const makeUrl = (id: number) => `${booksService.booksUrl}/?id=${id}`;

    it('should update a hero and return it', () => {

      const updateBook: Book = {
        title: '1',
        description: '1',
        author: '1',
        category: '1',
        price: 1,
        id: 1
      };

      booksService.addBook(updateBook).subscribe(
        data => expect(data).toEqual(updateBook, 'should return the hero'),
        fail
      );

      // HeroService should have made one request to PUT hero
      const req = httpTestingController.expectOne(booksService.booksUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateBook);

      // Expect server to return the hero after PUT
      const expectedResponse = new HttpResponse(
        {status: 200, statusText: 'OK', body: updateBook});
      req.event(expectedResponse);
    });

    it('should turn 404 error into user-facing error', () => {
      const msg = 'Deliberate 404';
      const updateBook: Book = {
        title: '1',
        description: '1',
        author: '1',
        category: '1',
        price: 1,
        id: 1
      };
      booksService.addBook(updateBook).subscribe(
        books => fail('expected to fail'),
        error => expect(error.message).toContain(msg)
      );

      const req = httpTestingController.expectOne(booksService.booksUrl);

      // respond with a 404 and the error message in the body
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should turn network error into user-facing error', () => {
      const emsg = 'simulated network error';

      const updateBook: Book = {
        title: '1',
        description: '1',
        author: '1',
        category: '1',
        price: 1,
        id: 1
      };
      booksService.addBook(updateBook).subscribe(
        books => fail('expected to fail'),
        error => expect(error.message).toContain(emsg)
      );

      const req = httpTestingController.expectOne(booksService.booksUrl);

      // Create mock ErrorEvent, raised when something goes wrong at the network level.
      // Connection timeout, DNS error, offline, etc
      const errorEvent = new ErrorEvent('so sad', {
        message: emsg,
        // The rest of this is optional and not used.
        // Just showing that you could provide this too.
        filename: 'HeroService.ts',
        lineno: 42,
        colno: 21
      });

      // Respond with mock error
      req.error(errorEvent);
    });
  });

});


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
