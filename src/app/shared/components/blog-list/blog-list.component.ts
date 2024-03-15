import { Component, Input } from '@angular/core';
import { Blog } from '../../models/blog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
})

export class BlogListComponent {
  @Input({required: true}) blogs: Blog[] = []
}
