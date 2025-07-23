import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import * as toastr from 'toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  inpType: string = 'password';

  constructor(private router: Router) {}

  login(): void {
    toastr.success('Login successful!');
    this.router.navigate(['/dashboard']);
  }

  tooglePass(): void {
    this.inpType = this.inpType === 'password' ? 'text' : 'password';
  }
}
