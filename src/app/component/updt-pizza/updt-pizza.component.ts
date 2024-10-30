import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      // precio: ['', Validators.required]
      nombre_opcional: new FormControl ('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ]),
      correo_opcional: new FormControl ('', [
        Validators.required,
        Validators.email
      ]),
      precio: new FormControl ('', [
        Validators.required,
        Validators.min(0.1),
        Validators.max(100)
      ])
    })
  }
  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!
    if (this.id) {
      this.pizzaService.getPizza(this.id).subscribe(pizza => {
       // this.pizzaForm.patchValue(pizza)
        this.pizzaForm.get('nombre')?.setValue(pizza.nombre)
        this.pizzaForm.get('nombre_opcional')?.setValue('')
        this.pizzaForm.get('correo_opcional')?.setValue('nnn@xxx.yyy')
        this.pizzaForm.get('precio')?.setValue(pizza.precio)
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
