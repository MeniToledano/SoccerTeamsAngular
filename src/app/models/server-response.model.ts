export interface ServerResponseModel {
  count: number;
  filters: {};
  teams: TeamModel[];
}

export interface TeamModel {
  id: number;
  crestUrl: string;
  founded: number;
  name: string;
}
