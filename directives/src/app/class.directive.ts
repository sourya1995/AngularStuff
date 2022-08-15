import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appClass]'
})
export class ClassDirective {



  constructor(private element: ElementRef) {

  }
  @Input('appClass') set classnames(ClassObj: any) {
    for (let key in ClassObj) {
      if (ClassObj[key]) {
        this.element.nativeElement.classList.add(key);

      } else {
        this.element.nativeElement.classList.remove(key);

      }
    }
  }


}
