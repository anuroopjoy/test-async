import {
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { Observable } from 'rxjs';
import { AppComponent } from './app.component';
import { AppService } from './app.service';

class MockAppService {
  getData() {
    const data = {
      status: 'OK',
      code: 200,
      total: 1,
      data: [
        {
          id: 1,
          title: 'But do cats eat.',
          author: 'Reyna Gusikowski',
          genre: 'Voluptatum',
          description:
            "The moment Alice felt a little ledge of rock, and, as there seemed to be seen: she found to be talking in a hot tureen! Who for such a noise inside, no one could possibly hear you.' And certainly.",
          isbn: '9797720971659',
          image: 'http://placeimg.com/480/640/any',
          published: '1993-09-22',
          publisher: 'Assumenda Quod',
        },
      ],
    };
    return new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(data);
        subscriber.complete();
      }, 4000);
    });
  }
}
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: AppService, useClass: MockAppService }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render book details - waitForAsync', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('div')!.textContent).toContain(
        'Title: But do cats eat.'
      );
      expect(compiled.querySelector('div')!.textContent).toContain(
        'Author : Reyna Gusikowski'
      );
      expect(compiled.querySelector('img')!.src).toBe(
        'http://placeimg.com/480/640/any'
      );
    });
  }));
  it('should render book details - fakeAsync', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    tick(4000);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div')!.textContent).toContain(
      'Title: But do cats eat.'
    );
    expect(compiled.querySelector('div')!.textContent).toContain(
      'Author : Reyna Gusikowski'
    );
    expect(compiled.querySelector('img')!.src).toBe(
      'http://placeimg.com/480/640/any'
    );
  }));
});
