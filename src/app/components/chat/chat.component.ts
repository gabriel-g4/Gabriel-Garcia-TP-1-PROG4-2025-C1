// src/app/components/chat/chat.component.ts
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})


export class ChatComponent implements OnInit {
  messages$!: Observable<any[]>;
  message = '';
  user: any


  constructor(private chatService: ChatService, private authService: AuthService) {
  }


  async ngOnInit(): Promise<void> {
    this.messages$ = this.chatService.getMessages();
    this.authService.session$.subscribe(session => {
      if (session?.user) {
        // Asignamos el usuario autenticado
        this.user = session.user;
        console.log('Usuario autenticado:', this.user);
      } else {
        console.log('Usuario no autenticado');
      }
    });

    
    console.log('Usuario:', this.user);
  }

  send() {
    if (this.message.trim()) {
      this.chatService.sendMessage(this.user.id, this.message, this.user.email);
      this.message = '';
    }
  }
}
