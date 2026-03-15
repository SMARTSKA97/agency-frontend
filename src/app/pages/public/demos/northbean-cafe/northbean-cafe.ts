import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-northbean-cafe',
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './northbean-cafe.html',
  styleUrl: './northbean-cafe.scss',
})
export class NorthbeanCafe {
  currentPage = 'home';
  readonly nav = [
    { label: 'Home', page: 'home' },
    { label: 'Menu', page: 'menu' },
    { label: 'Events', page: 'events' },
  ];

  readonly blocks = [
    { title: 'Morning Brew Club', text: 'Subscription members get first pour and priority pastries.' },
    { title: 'Weekend Acoustic', text: 'Curated artist evenings that keep the space intimate and warm.' },
    { title: 'Remote Work Corners', text: 'Quiet tables, fast Wi-Fi, and all-day single-origin pours.' },
  ];

  readonly menu = [
    { item: 'Flat White', price: 'INR 220' },
    { item: 'Hazelnut Cold Brew', price: 'INR 260' },
    { item: 'Butter Croissant', price: 'INR 190' },
  ];

  readonly events = ['Open Mic Friday', 'Latte Art Sunday', 'Local Roaster Talk'];

  constructor(private readonly route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      const page = params.get('page') ?? 'home';
      this.currentPage = this.nav.some((item) => item.page === page) ? page : 'home';
    });
  }
}
