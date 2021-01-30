import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpRequestsService} from "../http-requests.service";
import {TeamClientModel} from "../models/teamClientModel";
import {Subscription} from "rxjs";
import {StorageManagerService} from "../storage-manager.service";

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  teamsData: TeamClientModel[];
  viewTeams: TeamClientModel[];
  isFav: { [key: number]: boolean };
  KEY: string = 'favoriteTeams';
  viewNum: number = 0;
  numberOfTeamsInView: number = 10;
  currentPage: number = 0;
  numberOfPages: number;

  constructor(private httpReqService: HttpRequestsService,
              private storageManagerService: StorageManagerService) {
  }

  ngOnInit(): void {
    const sub1 = this.httpReqService.getTeamsData().subscribe(
      (response: TeamClientModel[]) => {
        this.teamsData = response;
        this.initView();
        console.log(this.teamsData);
      },
      (error) => {
        console.error(error);
      }
    );

    // init favorite teams from local storage
    const dataString = this.storageManagerService.onInit(this.KEY, '{}');
    this.isFav = JSON.parse(dataString);

    // add all subscription to the sub[] in order to release them on destroying the component
    this.subscription.push(sub1);
  }

  ngOnDestroy(): void {
    // release all subscriptions
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }

  updateTable(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.viewTeams = this.teamsData.slice(this.currentPage * 10, this.currentPage * 10 + this.numberOfTeamsInView);
  }

  updateFavorites(teamId: number): void {
    this.isFav[teamId] = !this.isFav[teamId];
    this.storageManagerService.setData(this.KEY, JSON.stringify(this.isFav));
  }

  private initView(): void {
    // init view
    this.viewTeams = this.teamsData.slice(this.viewNum * 10, this.viewNum * 10 + this.numberOfTeamsInView);
    this.numberOfPages = this.teamsData.length / this.numberOfTeamsInView;
  }
}
