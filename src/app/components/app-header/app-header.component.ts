import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css',
})
export class AppHeaderComponent implements OnInit {
  buttonText = 'Dark mode';
  mode= 'light';

  ngOnInit(): void {
    this.mode = localStorage.getItem('mode') || 'light';
    this.applyMode();
  }

  applyMode():void{
    if (this.mode === 'light') {
      document.body.removeAttribute('data-theme');
      this.buttonText = 'Dark Mode';
    } else {
      document.body.setAttribute('data-theme', 'dark');
      this.buttonText = 'Light Mode';
    }
  }

  toggleMode(): void {
    this.mode = this.mode === 'light' ? 'dark' : 'light';
    this.applyMode();
    localStorage.setItem('mode', this.mode);
  }
}
