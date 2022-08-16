import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output() close = new EventEmitter();

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    document.body.appendChild(this.element.nativeElement);
  }

  ngOnDestroy() {
    this.element.nativeElement.remove();
  }

  closeModal(){
    this.close.emit();
  }

}
