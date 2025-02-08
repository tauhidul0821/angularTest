# AngularTestKarma

# Unit Testing in Angular

## 1. Introduction to Unit Testing in Angular
Unit testing ensures that individual components, services, and other parts of an Angular application work correctly in isolation. Angular uses **Jasmine** as the test framework and **Karma** as the test runner by default.

### Running Tests
To run unit tests in an Angular project, use:
```sh
ng test
```

### Understanding `spec.ts` Files
Each component or service typically has a corresponding test file ending with `.spec.ts`.
Example structure:
```
src/app/
│── my-component/
│   │── my-component.component.ts
│   │── my-component.component.spec.ts  <-- Unit test file
```

## 2. Basic Component Testing
### Example Component (`counter.component.ts`)
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <p>Counter: {{ count }}</p>
    <button (click)="increment()">Increment</button>
  `
})
export class CounterComponent {
  count = 0;
  increment() { this.count++; }
}
```

### Unit Test (`counter.component.spec.ts`)
```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial count of 0', () => {
    expect(component.count).toBe(0);
  });

  it('should increment count when increment() is called', () => {
    component.increment();
    expect(component.count).toBe(1);
  });
});
```

---

## 3. Testing User Creation, Update, and Deletion

### User Service (`user.service.ts`)
```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}
```

### Unit Test for `UserService` (`user.service.spec.ts`)
```ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService, User } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch users', () => {
    const mockUsers: User[] = [
      { id: '1', name: 'Alice', email: 'alice@example.com' },
      { id: '2', name: 'Bob', email: 'bob@example.com' },
    ];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should create a user', () => {
    const newUser: User = { id: '3', name: 'Charlie', email: 'charlie@example.com' };

    service.createUser(newUser).subscribe(user => {
      expect(user).toEqual(newUser);
    });

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('POST');
    req.flush(newUser);
  });

  it('should update a user', () => {
    const updatedUser: User = { id: '1', name: 'Alice Updated', email: 'alice@example.com' };

    service.updateUser(updatedUser).subscribe(user => {
      expect(user).toEqual(updatedUser);
    });

    const req = httpMock.expectOne('/api/users/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedUser);
  });

  it('should delete a user', () => {
    const userId = '1';

    service.deleteUser(userId).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`/api/users/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
```

## Summary
- **Unit tests** check individual components and services.
- **Use `TestBed`** to create test environments.
- **Mock services and HTTP calls** to isolate functionality.
- **Run `ng test`** to execute tests in Angular.


