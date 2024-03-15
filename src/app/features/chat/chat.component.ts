import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../message.service';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{
  messages: any[] = [];
  newMessage: string = '';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.getMessages().subscribe((messages: any) => {
      this.messages = messages;
    });

    this.messageService.subscribeToNewMessages((message: any) => {
      this.messages.push(message);
    });
  }

  sendMessage(): void {
    this.messageService.sendMessage(this.newMessage).subscribe((message: any) => {
      if (!this.messages.find((m: any) => m.id === message.id)) {
        this.messages.push(message);
      }
      this.newMessage = '';
    });
  }
}
