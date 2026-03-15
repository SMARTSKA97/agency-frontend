import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule, ButtonModule, CardModule, 
    InputNumberModule, CheckboxModule, DividerModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  calc = {
    pages: 4,
    menuPage: true,
    photoGallery: true,
    domain: true,
    maintenance: true
  };

  totalCost: number = 0;
  basePageCost: number = 500; // ₹500 per page

  constructor() {
    this.calculateTotal();
  }

  calculateTotal() {
    let total = this.calc.pages * this.basePageCost;
    if (this.calc.menuPage) total += 1000;
    if (this.calc.photoGallery) total += 800;
    if (this.calc.domain) total += 2000;
    if (this.calc.maintenance) total += 2400;
    
    this.totalCost = total;
  }
}
