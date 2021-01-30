import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() numberOfPages: number;
  @Output() onChangePage: EventEmitter<number> = new EventEmitter<number>();
  currentPageNumber: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  arrayPages(): any[] {
    return Array(this.numberOfPages);
  }

  onClickPageNumber(pageNumber: number): void {
    this.currentPageNumber = pageNumber;
    this.updatePageNumber();
  }

  onClickPrev(): void {
    if (this.currentPageNumber > 0) {
      this.currentPageNumber -= 1;
      this.updatePageNumber();
    }
  }

  onClickNext(): void {
    if (this.currentPageNumber < this.numberOfPages - 1) {
      this.currentPageNumber += 1;
      this.updatePageNumber();
    }
  }

  updatePageNumber(): void {
    this.onChangePage.emit(this.currentPageNumber);
  }
}
