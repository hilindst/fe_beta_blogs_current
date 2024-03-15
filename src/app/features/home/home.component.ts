import { Component, OnInit } from '@angular/core';
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
@Output() onChangeBlogs: EventEmitter<Blog[]> = new EventEmitter<Blog[]>();
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

  toggleLiked(blogId: number) {
    const blogs = [...this.blogs];
    const blogIndex = blogs.findIndex((blog) => blog.id === blogId);

    if (blogIndex === -1) return;

    const blog = blogs[blogIndex];
    const isLiked = blog.liked;
    const blog$ = isLiked
      ? this.blogService.unLikeBlog(blogId)
      : this.blogService.likeBlog(blogId);

    blog.liked = !isLiked;

    blog$.subscribe({
      next: () => {
        blog.likes_count! += isLiked ? -1 : 1;
        this.onChangeBlogs.emit(blogs);
      },
      error: (error) => {
        console.error('Error toggling like status:', error);
        blog.liked = isLiked;
      },
    });
}
}
