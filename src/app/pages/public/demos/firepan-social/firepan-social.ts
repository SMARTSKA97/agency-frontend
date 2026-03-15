import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-firepan-social',
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './firepan-social.html',
  styleUrl: './firepan-social.scss',
})
export class FirepanSocial {
  currentPage = 'home';
  readonly nav = [
    { label: 'Home', page: 'home' },
    { label: 'Offers', page: 'offers' },
    { label: 'Order', page: 'order' },
  ];

  readonly offers = [
    { label: 'Weekday Combo', detail: 'Burger + Fries + Cold Brew - INR 399' },
    { label: 'Grill Night', detail: 'Buy 1 platter, get 30% off on second' },
    { label: 'Late Hour Drop', detail: 'Delivery charge free after 10 PM' },
  ];

  readonly deliveryAreas = ['Indiranagar', 'Koramangala', 'HSR Layout', 'BTM', 'JP Nagar'];

  constructor(private readonly route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      const page = params.get('page') ?? 'home';
      this.currentPage = this.nav.some((item) => item.page === page) ? page : 'home';
    });
  }
}
