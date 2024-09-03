import { Component } from '@angular/core';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {

  buttonText='Dark mode';

  

  toggleMode(){
    if (document.body.getAttribute('data-theme') === 'dark') {
        document.body.removeAttribute('data-theme');
        this.buttonText = 'Dark Mode';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        this.buttonText = 'Light Mode';
    }
  }

}
