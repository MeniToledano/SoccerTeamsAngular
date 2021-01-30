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
export class TeamsListComponent implements OnInit,OnDestroy {

  subscription: Subscription[] = [];
  teamsData: TeamClientModel[];
  viewTeams: TeamClientModel[];
  isFavorite: number[] = [];
  KEY:string = 'favoriteTeams';
  viewNum: number = 0;
  numberOfTeamsInView: number = 10;
  currentPage: number = 0;
  numberOfPages: number;

  constructor(private httpReqService: HttpRequestsService,
              private  storageManagerService: StorageManagerService) {
  }

  ngOnInit(): void {
    const sub1 = this.httpReqService.getTeamsData().subscribe(
      (response: TeamClientModel[]) => {
        this.teamsData = response;
        this.initView();
        console.log(this.teamsData);
      },
      (error) => {
        alert('Error: Cant retrieve teams data!');
        console.log(error);
      }
    );

    // init favorite teams from local storage
    this.storageManagerService.onInit(this.KEY).split(',').map(num => this.isFavorite.push(Number(num)));

    // add all subscription to the sub[] in order to release them on destroying the component
    this.subscription.push(sub1);
  }

  private initView(): void {
    // init view
    this.viewTeams = this.teamsData.slice(this.viewNum * 10 , this.viewNum * 10 + this.numberOfTeamsInView);
    this.numberOfPages = this.teamsData.length / this.numberOfTeamsInView ;
  }

  ngOnDestroy(): void {
    // release all subscriptions
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }


  onClickTeam(teamId: number): void {
    // make team favorite / not favorite
    console.log(this.isFavorite.indexOf(teamId));
    if ( this.isFavorite.indexOf(teamId) > -1){
      this.isFavorite.splice(this.isFavorite.indexOf(teamId), 1);
    }else{
      this.isFavorite.push(teamId)
    }


    // update local storage
    this.storageManagerService.setData(this.KEY, this.isFavorite.toString());
  }
  arrayPages(): any[] {
    return Array(this.numberOfPages);
  }

  onClickPageNumber(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.viewTeams = this.teamsData.slice( this.currentPage * 10 ,  this.currentPage * 10 + this.numberOfTeamsInView);


  }

  onClickPrev(): void {
    if (this.currentPage > 0){
      this.currentPage -= 1;
      this.viewTeams = this.teamsData.slice(this.currentPage * 10 , this.currentPage * 10 + this.numberOfTeamsInView);
    }
  }
  onClickNext(): void {
    if (this.currentPage < this.numberOfPages -1){
      this.currentPage += 1;
      this.viewTeams = this.teamsData.slice(this.currentPage * 10 , this.currentPage * 10 + this.numberOfTeamsInView);
    }
  }
}
