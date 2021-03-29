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

    /*it('should turn 404 into a user-friendly error', () => {
      const msg = 'Deliberate 404';
      booksService.loadBooks().subscribe(
        books => fail('expected to fail'),
        error => expect(error.message).toContain(msg)
      );

      const req = httpTestingController.expectOne(`http://${booksService.booksUrl}/books?`);

      // respond with a 404 and the error message in the body
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });*/

  });
});
