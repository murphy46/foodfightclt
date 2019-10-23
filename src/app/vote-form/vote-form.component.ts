import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {VoteTransaction} from "../model/vote-transaction";
import {UtilityService} from "../utility.service";
import {Nominee} from "../model/nominee";
import {Subscription} from "rxjs/index";
import * as moment from 'moment';

@Component({
  selector: 'app-vote-form',
  templateUrl: './vote-form.component.html',
  styleUrls: ['./vote-form.component.scss']
})
export class VoteFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  @Input() nomineeId: string;
  @Input() nomineeName: string;
  @Output() closeForm = new EventEmitter();
  votes: AngularFireList<any>;
  voteList: VoteTransaction[];
  nominees: Nominee[];

  voteSubscription: Subscription;
  nomineeSubscription: Subscription;
  constructor(private fb: FormBuilder, private db: AngularFireDatabase) {

  }

  ngOnInit() {
    this.votes = this.db.list('/votes');
    this.voteSubscription = this.db.list('/votes').valueChanges().subscribe(data => this.voteList = data as VoteTransaction[]);
    this.nomineeSubscription = this.db.list('/nominees').valueChanges().subscribe(data => this.nominees = data as Nominee[]);
    this.form = this.fb.group({
      donorName: ['', Validators.required],
      nomineeId: [this.nomineeId, Validators.required],
      voteCount: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    this.voteSubscription.unsubscribe();
    this.nomineeSubscription.unsubscribe();
  }

  onSubmit(formValue: { donorId: string, donorName: string, nomineeId: string, voteCount: number }) {
    const filteredNominees = this.nominees.filter(nominee => nominee.id === formValue.nomineeId);
    const currentVoteTotal = filteredNominees && filteredNominees.length ? filteredNominees
      .map(nominee => nominee.voteTotal ? +nominee.voteTotal : 0)
      .reduce((a, b) => a + b) : 0;
    const donorId = UtilityService.formatStringLowercaseNoSpaces(formValue.donorName);
    const existingVotesCastByDonor = this.calculateMaxVotesByNomineeAndDonor(formValue.nomineeId, donorId);
    const currentMaxForNominee = this.calculateCurrentMaxVotesByNominee(formValue.nomineeId);

    const voteTransaction = {
      donorName: formValue.donorName,
      donorId: donorId,
      nomineeName: this.nomineeName,
      nomineeId: formValue.nomineeId,
      voteCount: +formValue.voteCount,
      timestamp: moment().format('MM-DD-YYYY HH:mm').toString()
    };
    this.votes.push(voteTransaction);

    const nomineeUpdates = {
      voteTotal: currentVoteTotal + +formValue.voteCount
    };
    if (existingVotesCastByDonor + +formValue.voteCount > currentMaxForNominee) {
      nomineeUpdates['maxVotes'] = existingVotesCastByDonor + +formValue.voteCount;
      nomineeUpdates['maxContributorName'] = formValue.donorName;
      nomineeUpdates['maxContributorId'] = donorId;
    }
    this.db.object('nominees/' + formValue.nomineeId).update(nomineeUpdates);
    this.form.get('donorName').reset();
    this.form.get('voteCount').reset();
    this.closeForm.emit();
  }

  // Given a nominee id, calculate which donor has contributed the most and how much they have contributed
  calculateMaxVotesByNomineeAndDonor(nomineeId: string, donorId: string): number {
    const filteredVotes = this.voteList.filter(vote =>
      vote.nomineeId === nomineeId && vote.donorId === donorId);
    if (filteredVotes && filteredVotes.length) {
      return filteredVotes.map(vote => +vote.voteCount).reduce((a, b) => a + b);
    }
    return 0;
  }

  calculateCurrentMaxVotesByNominee(nomineeId: string): number {
    const filteredNominees = this.nominees.filter(nominee => nominee.id === nomineeId);
    return filteredNominees && filteredNominees.length ? filteredNominees
      .map(nominee => nominee.maxVotes ? +nominee.maxVotes : 0).reduce((a, b) => a + b) : 0;
  }

  onCancel() {
    this.form.get('donorName').reset();
    this.form.get('voteCount').reset();
    this.closeForm.emit();
  }
}
