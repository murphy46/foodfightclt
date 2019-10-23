import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Subscription} from "rxjs/index";
import {ClrDatagridPagination} from "@clr/angular";
import {VoteTransaction} from "../model/vote-transaction";
import {Nominee} from "../model/nominee";

@Component({
  selector: 'app-pie-competition',
  templateUrl: './pie-competition.component.html',
  styleUrls: ['./pie-competition.component.scss']
})
export class PieCompetitionComponent implements OnInit, OnDestroy {
  votes: VoteTransaction[];
  nominees: Nominee[];
  activeForm: string;
  @ViewChild('pagination') pagination: ClrDatagridPagination;
  voteSubscription: Subscription;
  nomineeSubscription: Subscription;
  loading = false;

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.voteSubscription = this.db.list('/votes').valueChanges().subscribe(data => {
      this.votes = data as VoteTransaction[];
      this.votes = this.votes.reverse();
    });
    this.nomineeSubscription = this.db.list('/nominees').valueChanges()
      .subscribe(data => {
      this.nominees = data as Nominee[];
      this.loading = false;
    })
  }

  ngOnDestroy(): void {
    this.voteSubscription.unsubscribe();
    this.nomineeSubscription.unsubscribe();
  }

}
