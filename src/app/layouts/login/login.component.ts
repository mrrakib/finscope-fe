import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import * as toastr from 'toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  inpType: string = 'password';
  form!: FormGroup;

  constructor(private router: Router, private authService: AuthService) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.form.reset();
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.setValue('');
      this.form.get(key)?.markAsPristine();
      this.form.get(key)?.markAsUntouched();
    });

    // Optional: Manually remove autofill by setting timeout (in some browsers)
    setTimeout(() => {
      this.form.get('email')?.setValue('');
      this.form.get('password')?.setValue('');
    }, 0);
  }

  login(): void {
    const { email, password } = this.form.value;

    if (this.form.invalid) {
      toastr.error('Please enter valid credentials');
      return;
    }

    this.authService.login(email, password).subscribe({
      next: (res) => {
        switch (res?.status_code) {
          case '206':
            toastr.info('Two Factor Authentication Required');
            this.router.navigate(['/verify-code'], { queryParams: { email } });
            break;
          default:
            if (res?.data?.token) {
              toastr.success('Login successful!');
              this.router.navigate(['/dashboard']);
            } else {
              toastr.error(res?.error_messages[0].error_message);
            }
        }
      },
      error: (error) => {
        const msg =
          error?.error?.error_messages?.[0]?.error_message ||
          'Invalid username or password';
        toastr.success(msg);
      },
    });
  }

  tooglePass(): void {
    this.inpType = this.inpType === 'password' ? 'text' : 'password';
  }
}
