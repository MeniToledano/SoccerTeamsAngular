import {TeamModel} from "./server-response.model";

export class TeamClientModel {
  id: number;
  name: string;
  crestUrl: string;
  founded: number;

  static plainToClass(teamJson: TeamModel): TeamClientModel{
    const team = new TeamClientModel();
    team.crestUrl = teamJson.crestUrl;
    team.founded = teamJson.founded;
    team.id = teamJson.id;
    team.name = teamJson.name;
    return team;
  }

  static arrPlainToClass(teamsJson: TeamModel[]): TeamClientModel[]{
    return teamsJson.map(team => (TeamClientModel.plainToClass(team)));
  }
}
