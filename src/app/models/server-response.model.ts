export class ServerResponseModel {
  count: number;
  filters: {};
  teams: TeamModel[];
}
export class TeamModel {
  id: number;
  crestUrl: string;
  founded: number;
  name: string;
}
