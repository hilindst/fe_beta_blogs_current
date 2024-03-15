import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { Blog } from '../../shared/models/blog';
import { BlogListComponent } from '../../shared/components/blog-list/blog-list.component';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlogListComponent, ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  homeBlogs: Blog[] = []

constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe({
      next: (blogs: Blog[]) => {
        this.homeBlogs = blogs;
      },
      error: (error: any) => {
        console.log('Error fetching blogs', error);
      },
    });
  }

  
}
