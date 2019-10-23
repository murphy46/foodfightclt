import { Component , OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ 
  selector: 'app-sumo',
  templateUrl: './sumo.component.html',
  styleUrls: ['./sumo.component.scss']
 })
export class SumoComponent implements OnInit, AfterViewInit{

  newChallengeForm: FormGroup;
  loading = false;
  rosterClosed: boolean;



    constructor(private fb: FormBuilder) {
      this.newChallengeForm = this.fb.group({
        challengerName: ['', Validators.required],
        opponentName: ['', Validators.required],
        initials1: [false, Validators.required],
        initials2: [false, Validators.required]
      })
     }

    ngOnInit() {
      this.loading = false;
    }

    ngAfterViewInit() {
      this.loading = false;
    }


    onSubmitNewProductForm() {

    }

    onCancelNewChallengeForm() {

    }
    

}