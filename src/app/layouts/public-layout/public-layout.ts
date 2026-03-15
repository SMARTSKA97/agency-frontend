import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet,Menubar,CommonModule],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss',
})
export class PublicLayout implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Portfolio', icon: 'pi pi-fw pi-user', routerLink: '/' },
      { label: 'Projects', icon: 'pi pi-fw pi-github', routerLink: '/projects' },
      { label: 'Web Services', icon: 'pi pi-fw pi-desktop', routerLink: '/websites' },
      { label: 'Contact', icon: 'pi pi-fw pi-envelope', routerLink: '/contact' },
      { 
        label: 'Client Login', 
        icon: 'pi pi-fw pi-lock', 
        routerLink: '/login',
        styleClass: 'ml-4 font-bold'
      }
    ];
  }
}
