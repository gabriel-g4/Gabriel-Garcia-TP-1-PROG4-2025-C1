import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class GithubService {

    constructor (private http : HttpClient) {}

    profileUrl = "https://api.github.com/users/gabriel-g4"

    getProfile() : Observable<any> {
        return this.http.get(this.profileUrl)
    }
}

