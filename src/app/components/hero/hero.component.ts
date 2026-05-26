import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  emailExpanded = false;
  copied = false;

  readonly email = 'pipegmacias00@gmail.com';

  toggleEmail(): void {
    this.emailExpanded = !this.emailExpanded;
    if (!this.emailExpanded) this.copied = false;
  }

  copyEmail(): void {
    navigator.clipboard.writeText(this.email).then(() => {
      this.copied = true;
      setTimeout(() => { this.copied = false; }, 2000);
    });
  }
}
