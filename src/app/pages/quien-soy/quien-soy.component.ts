
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../services/github.service';
import { GithubUser } from '../../models';


@Component({
  selector: 'app-quien-soy',
  imports: [CommonModule],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.css'
})

export class QuienSoyComponent implements OnInit{

  userData: GithubUser = {
    avatarUrl: '',
    login: '',
    name: '',
    bio: '',
    location: '',
    publicRepos: 0,
    exists: false
  }

  constructor (private githubService : GithubService) {}

  ngOnInit() {
    this.getGit();
  }

  getGit () {

    this.githubService.getProfile().subscribe(data => {
        this.userData.avatarUrl = data.avatar_url;
        this.userData.login = data.login;
        this.userData.name = data.name;
        this.userData.bio = data.bio;
        this.userData.location = data.location;
        this.userData.publicRepos = data.public_repos;
        this.userData.exists = true;
      })

    
  }
}

