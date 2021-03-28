// import {TestBed, getTestBed} from '@angular/core/testing';
// import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
// import {BooksService} from '../global/services/books.service';
//
// describe('StudentsService', () => {
//   let injector: TestBed;
//   let service: BooksService;
//   let httpMock: HttpTestingController;
//
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [BooksService],
//     });
//
//     injector = getTestBed();
//     service = injector.get(BooksService);
//     httpMock = injector.get(HttpTestingController);
//   });
//
//   afterEach(() => {
//     httpMock.verify();
//   });
//
//   const dummyUserListResponse = {
//     data: [
//       {id: 1, first_name: 'George', last_name: 'Bluth', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg'},
//       {id: 2, first_name: 'Janet', last_name: 'Weaver', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg'},
//       {id: 3, first_name: 'Emma', last_name: 'Wong', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg'},
//     ],
//   };
//
//   it('loadBooks() should return data', () => {
//
//     service.loadBooks({}).subscribe((res) => {
//       expect(res);
//       console.log('res ', res);
//     });
//
//     const req = httpMock.expectOne('http://localhost:3000/books?s');
//     expect(req.request.method).toBe('GET');
//     req.flush(dummyUserListResponse);
//   });
//
// });
