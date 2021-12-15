import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

 btType:ButtonType; 
 buttonEnumType: typeof ButtonType = ButtonType;

  constructor(
    public httpService: HttpService,
    private router: Router) {
      this.btType=ButtonType.none;
  }


setButtonText(buttonType:ButtonType){
    this.btType=buttonType;
}


  logout() {
    this.httpService.logout().subscribe(
      data => {
        if ("loggedin" in data) {
          if (data["loggedin"] === false) {
            this.httpService.isLogin = false;
            this.httpService.user = null;
            this.router.navigate(['/login']);
          }
        }
      });
  }
}

enum ButtonType{
  none,
  home, 
  info,
}



