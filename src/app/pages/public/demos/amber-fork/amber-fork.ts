import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-amber-fork',
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './amber-fork.html',
  styleUrl: './amber-fork.scss',
})
export class AmberFork {
  currentPage = 'home';
  readonly nav = [
    { label: 'Home', page: 'home' },
    { label: 'Menu', page: 'menu' },
    { label: 'Reservations', page: 'reservations' },
  ];

  readonly highlights = [
    { title: 'Tasting Menu', text: 'Seasonal seven-course experience with curated pairings.' },
    { title: 'Chef Table', text: 'Front-row kitchen counter with a narrated culinary journey.' },
    { title: 'Private Dining', text: 'Intimate gatherings with custom menus and premium service.' },
  ];

  readonly menu = [
    { dish: 'Truffle Ricotta Ravioli', price: 'INR 1,850' },
    { dish: 'Charred Sea Bass', price: 'INR 2,250' },
    { dish: 'Saffron Citrus Tart', price: 'INR 780' },
  ];

  readonly reservationSlots = ['6:30 PM', '7:45 PM', '9:00 PM', '10:15 PM'];

  constructor(private readonly route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      const page = params.get('page') ?? 'home';
      this.currentPage = this.nav.some((item) => item.page === page) ? page : 'home';
    });
  }
}
