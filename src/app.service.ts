import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { response } from 'express';
import { map } from 'rxjs';
@Injectable()
export class AppService {
  private data = {
    sarah: {
      twitterFollowers: 300,
      youtubeFollowers: 1000,
    },
    james: {
      twitterFollowers: 500,
    }
  };

  constructor(private httpService: HttpService) {}

  getUser(params) {
    return this.httpService
      .get(`http://api.github.com/users/${ params.username }`)
      .pipe(
        map((response) => response.data),
        map((data) => ({
          ...this.data[params.username],
          githubFollowers: data.followers,
          publicRepos: data.public_repos,
          name: data.name,
          location: data.location,
          bio: data.bio
        }))
      )
  }
}
