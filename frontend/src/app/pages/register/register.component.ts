import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule, MatSnackBarModule, MatIconModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  authService=inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router=inject(Router);

  hide = true;
  registerForm!: FormGroup;
  fb = inject(FormBuilder);

  register() {
    if (this.registerForm.valid) {


      this.authService.register(this.registerForm.value).subscribe(
        response => {
          console.log('User registered:', response);

          // Display success message
          this.matSnackBar.open('Registration Successful', 'Close', {
            duration: 5000,
            horizontalPosition: 'center'
          });

          // Navigate to login page
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registration error:', error);

          // Display error message
          this.matSnackBar.open('Registration Failed', 'Close', {
            duration: 5000,
            horizontalPosition: 'center'
          });
        }
      );
    }
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userid: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
