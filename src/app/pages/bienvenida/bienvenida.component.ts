import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.services';

@Component({
  selector: 'app-bienvenida',
  imports: [],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent implements OnInit {

  name: string = ""
  login: string = ""
  avatar_url: string = ""

  constructor (private githubService : GithubService) {}

  ngOnInit() {
    this.getGit();
  }

  getGit () {

    this.githubService.getProfile().subscribe(data => {
      this.login = data.login;
      this.name = data.name;
      this.avatar_url = data.avatar_url;
      })

    
  }
}
