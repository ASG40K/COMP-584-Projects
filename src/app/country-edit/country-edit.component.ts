import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { environment } from '../../environments/environment.development';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Country } from '../country';

@Component({
  selector: 'app-country-edit',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './country-edit.component.html',
  styleUrl: './country-edit.component.scss'
})
export class CountryEditComponent implements OnInit {
  form!: FormGroup;
  public country: Country | undefined;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.populateData();
    this.form = new FormGroup(
      {
        name: new FormControl(`${this.country?.name}`, Validators.required),
        iso2: new FormControl(`${this.country?.iso2}`, Validators.required),
        iso3: new FormControl(`${this.country?.iso3}`, Validators.required)
      });
  }

  populateData() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.http.get<Country>(`${environment.baseUrl}api/Countries/${id}`).subscribe({
      next: result => {
        this.country = result;
        this.form.patchValue(result);
      },
      error: error => console.error(error)
    }
    );
  }

  onSubmit()
  {
    /*
    let loginRequest = <Country>
    {
      userName: this.form.controls['countryName'].value,
      iso2: this.form.controls['countryISO2'].value
      iso3: this.form.controls['countryISO3'].value
    };
    this.authService.login(loginRequest).subscribe({
      next: result => {
        if(result.success)
        {
          this.router.navigate(["/"]);
        }
      },
      error: error => console.error(error)
    }
    );
    */
  }
}