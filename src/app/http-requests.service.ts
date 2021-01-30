import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ServerResponseModel} from "./models/server-response.model";
import {TeamClientModel} from "./models/teamClientModel";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {
  private readonly BASE_URL = 'https://api.football-data.org/v2/teams';
  private headers = {'X-Auth-Token': '168c87a5b0ba45239ceee596952d3d6c'};

  constructor(private http: HttpClient) {
  }

  getTeamsData(): Observable<TeamClientModel[]> {
    return this.http.get<ServerResponseModel>(this.BASE_URL, {headers: this.headers}).pipe(
      map((serverResponseModel: ServerResponseModel) => {

        if (!serverResponseModel) {
          console.error('Empty response returned from the server!');
          return [];
        }

        return TeamClientModel.arrPlainToClass(serverResponseModel.teams);
      })
    );
  }

}
