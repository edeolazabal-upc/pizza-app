import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PizzaService } from '../../service/pizza.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updt-pizza',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './updt-pizza.component.html',
  styleUrl: './updt-pizza.component.css'
})
export class UpdtPizzaComponent implements OnInit {
  pizzaForm: FormGroup
  id: number | null = null
  nombres = ['napolitana', 'margarita', 'peruana']

  constructor (
    private fb: FormBuilder,
    private pizzaService: PizzaService,
    private route: ActivatedRoute,
    private router: Router 
  ) {
    this.pizzaForm = this.fb.group({
      nombre: [''],
      precio: ['']
    })
  }
  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!
    if (this.id) {
      this.pizzaService.getPizza(this.id).subscribe(pizza => {
        this.pizzaForm.patchValue(pizza)
      })
    }
  }
  onSubmit(): void {
    if (this.pizzaForm.valid) {
      if (this.id) {
        this.pizzaService.updatePizza(this.id, this.pizzaForm.value).subscribe(() => {
          this.router.navigate(['/list-pizzas'])
        })
      } else {
        this.pizzaService.addPizza(this.pizzaForm.value).subscribe(() => {
          this.router.navigate(['/list-pizzas'])
        })
      }
      
    }
  }

}
