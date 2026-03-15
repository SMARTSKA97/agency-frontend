import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Auth } from '../../core/services/auth';
import { ThemeService } from '../../core/services/theme';

@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule, RouterOutlet, RouterModule, ButtonModule, AvatarModule, SelectModule, FormsModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {
  readonly navItems = [
    { label: 'Dashboard', icon: 'pi pi-chart-line', routerLink: '/admin/dashboard' },
    { label: 'Clients', icon: 'pi pi-users', routerLink: '/admin/clients' },
    { label: 'Invoices', icon: 'pi pi-receipt', routerLink: '/admin/invoices' },
  ];

  constructor(
    private authService: Auth,
    public readonly themeService: ThemeService
  ) {}

  logout() {
    this.authService.logout();
  }
}
