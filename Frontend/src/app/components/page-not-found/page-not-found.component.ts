import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../user/header/header.component';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {

}
