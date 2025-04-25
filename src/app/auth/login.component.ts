import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginRequest } from './login-request';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

      form!: FormGroup;



      constructor(private authService: AuthService){

      }
  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

  }
  onSubmit() {
    let loginRequest = <LoginRequest>{
      UserName: this.form.controls['userName'].value,
      password: this.form.controls['password'].value
    };

    this.authService.login(loginRequest).subscribe({
      next:  result => {
        console.log(result);
        if(result.success){
          localStorage.setItem("565-jwt", result.token);
        }
      },
      error: error =>  console.error(error)
    }
    
    )
    }
}
