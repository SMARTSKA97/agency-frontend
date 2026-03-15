import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, ButtonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {}
