import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() flagSrc = '';
  @Input() flagAlt = '';
  @Input() name = '';
  @Input() population = 0;
  @Input() region = '';
  @Input() capital = '';
}
