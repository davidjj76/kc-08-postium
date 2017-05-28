import { 
  Component,
  DebugElement
 } from '@angular/core'
import { 
  TestBed, 
  ComponentFixture,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser';

import { AutoGrowDirective } from './auto-grow.directive';

// Test component
@Component({
  template: '<textarea autogrow></textarea>'
})
class TestComponent { }

describe('AutoGrowDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ 
        AutoGrowDirective, 
        TestComponent 
      ]
    })
    .createComponent(TestComponent);
    fixture.detectChanges();
    de = fixture.debugElement.query(By.directive(AutoGrowDirective));
  });

  it(`Debería haber un elemento con la directiva 'autogrow'`, () => {
    expect(de).toBeTruthy();
  });

  it('Debería aumentar la altura tras al introducir una nueva linea', () => {
    const textarea: HTMLTextAreaElement = de.nativeElement as HTMLTextAreaElement;
    textarea.value = 'Texto de prueba';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const initialHeight: number = parseInt(textarea.style.height);
    textarea.value = 'Texto de prueba\n';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(parseInt(textarea.style.height)).toBeGreaterThan(initialHeight);
  });

});
