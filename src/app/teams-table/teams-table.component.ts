import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TeamClientModel} from "../models/teamClientModel";
import {StorageManagerService} from "../storage-manager.service";

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {

  @Input() currentPage: number;
  @Input() isFavorite: { [key: number]: boolean };

  // @Input() isFavorite: Map<number,boolean>;
  @Input() viewTeams: TeamClientModel[];
  @Output() onUpdateFavorite: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickTeam(teamId: number): void {
    this.onUpdateFavorite.emit(teamId);
  }
}
