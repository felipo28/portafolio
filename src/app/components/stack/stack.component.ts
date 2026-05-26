import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, StackCategory } from '../../services/data.service';

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.scss'
})
export class StackComponent implements OnInit {
  categories: StackCategory[] = [];

  constructor(private data: DataService) {}

  async ngOnInit() {
    this.categories = await this.data.getStack();
  }
}
