import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReloadPageService {

  private numberOfPagesVisited: number;
  public numberOfPagesVisited$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    this.numberOfPagesVisited = 0;
    this.numberOfPagesVisited$.next(this.numberOfPagesVisited);
  }


  addNewVisitedPage(): void {
    this.numberOfPagesVisited += 1;
    this.numberOfPagesVisited$.next(this.numberOfPagesVisited);
  }

}
