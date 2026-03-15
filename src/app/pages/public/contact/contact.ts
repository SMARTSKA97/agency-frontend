import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ButtonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {}
