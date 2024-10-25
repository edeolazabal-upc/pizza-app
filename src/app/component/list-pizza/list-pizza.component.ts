import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Pizza } from '../../model/pizza';
import { PizzaService } from '../../service/pizza.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-pizza',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './list-pizza.component.html',
  styleUrl: './list-pizza.component.css'
})
export class ListPizzaComponent implements OnInit {
  pizzas: Pizza[] = []

  constructor (private pizzaService: PizzaService, private router: Router) {}

ngOnInit(): void {
  this.pizzaService.getPizzas().subscribe(data => {
    this.pizzas = data
  })
}
editPizza(id: number): void {
  this.router.navigate(['/edit-pizza', id])
}
deletePizza(id: number): void {
  this.pizzaService.deletePizza(id).subscribe(() => {
    this.pizzas = this.pizzas.filter (pizza => pizza.id !== id)
  })
}
}
