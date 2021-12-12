import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { User } from '../user';
import { Message } from '../message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

 
  // lista użytkowników
  users: User[] = [];

  // lista wiadomości z wybranym uzytkownikiem
  messagesToUser: Message[] = [];

  // wybrany uzytkownik
  selectedUser: User = null;

  constructor(
    private router: Router,
    private httpService: HttpService,
  ) {
    // Sprawdzenie czy uzytkownik nie jest zalogowany, jezeli tak - przejscie do głownego panelu
    if (!httpService.isLogin) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.reloadUsers();
  }


  // Funkcja zwracająca nasze ID
  getMyId() {
    return this.httpService.loginUserData.user_id;
  }

  // Funkcja wysyłająca wiadomość
  sendMessage(e) {

    
    this.httpService.sendMessages(new Message()).subscribe(
      data => {
        console.log("ChatComponent, onSubmit:", data);
      },
      error => {
      });
  }

  // Funkcja przeładowująca listę użytkowników
  reloadUsers() {
    this.httpService.getUsers().subscribe(
      data => {
        if ("data" in data) {
          console.log("data");
          if (Array.isArray(data["data"])) {
            this.users = data["data"] as User[];
          }
        }
      },
      error => {
      });
  }

  // funkcja wywoływana gdy zostanie wybrany użytkownik na liście użytkowników
  userSelected(user: User) {
    this.selectedUser = user;
    console.log("Selected user", this.selectedUser)
    this.getMessagesWithSelectedUser();
  }

  // Funkcja pobierające listę wiadomości z danym użytkownikiem
  getMessagesWithSelectedUser() {
    this.httpService.getMessages(this.selectedUser.user_id).subscribe(
      data => {
        if ("data" in data) {
          console.log("data");
          if (Array.isArray(data["data"])) {
            this.messagesToUser = data["data"] as Message[];
          }
        }

      },
      error => {
      });
  }

}
