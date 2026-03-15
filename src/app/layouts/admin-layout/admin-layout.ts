import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule, RouterOutlet, RouterModule, ButtonModule, AvatarModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {
  constructor(private authService: Auth) {}

  logout() {
    this.authService.logout();
  }
}
