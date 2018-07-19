import { Component, Input } from '@angular/core';

@Component({
  selector: 'dots',
  template: '{{text}}'
})
export class DotsComponent {
  @Input()
  public repeat: number = 0;
  protected text: string = '';

  ngOnInit() {
    for (let i = 0; i < this.repeat; i += 1) {
      this.text += '.';
    }
  }
}