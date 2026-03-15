import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { ThemeService } from '../../core/services/theme';

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, CommonModule, RouterModule, FormsModule, SelectModule, ButtonModule],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss',
})
export class PublicLayout {
  readonly navItems = [
    { label: 'Portfolio', routerLink: '/' },
    { label: 'Projects', routerLink: '/projects' },
    { label: 'Web Services', routerLink: '/websites' },
    { label: 'Contact', routerLink: '/contact' },
  ];

  constructor(public readonly themeService: ThemeService) {}
}
