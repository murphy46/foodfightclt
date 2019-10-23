import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Nominee } from '../model/nominee';
import { Subscription } from 'rxjs';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-nominate-form',
  templateUrl: './nominate-form.component.html',
  styleUrls: ['./nominate-form.component.scss']
})

export class NominateFormComponent implements OnInit, OnDestroy {
  // @Input() nomineeName: string;
  // @Input() donorName: string;
  @Output() closeForm = new EventEmitter();
  nomineeList: Nominee[];
  nomineeForm: FormGroup;
  nominees: AngularFireList<any>;
  nomineeSubscription: Subscription;
  loading = false;
  imgData: any;
  imgName: string;
  file: any;

  constructor(private db: AngularFireDatabase, private fb: FormBuilder) { }

  ngOnInit() {
    this.nominees = this.db.list('/nominees');
    this.nomineeSubscription = this.db.list('/nominees').valueChanges()
      .subscribe(data => {
        this.nomineeList = data as Nominee[];
        this.loading = false;
      })
    this.nomineeForm = this.fb.group({
      nomineeFirstName: ['', Validators.required],
      nomineeLastName: ['', Validators.required],
      donorName: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(10)]],
      title: ['', [Validators.required]],
      imageUpload: ['', [Validators.required]]
    })
  }

  ngOnDestroy(): void {
    this.nomineeSubscription.unsubscribe();
  }

  onSubmitNomination(): void {
    const nominee = new Nominee();
    let amount = this.nomineeForm.get('amount').value;
    nominee.firstName = this.nomineeForm.get('nomineeFirstName').value.trim();
    nominee.lastName = this.nomineeForm.get("nomineeLastName").value.trim();
    nominee.maxContributorName = this.nomineeForm.get("donorName").value.trim();
    nominee.id = this.calculateNextNomineeId();
    nominee.title = this.nomineeForm.get("title").value.trim();
    nominee.voteTotal = amount / 10;
    nominee.maxVotes = amount / 10;
    nominee.maxContributorName = this.nomineeForm.get("donorName").value.trim();
    nominee.maxContributorId = this.nomineeForm.get("donorName").value.trim().toLowerCase().replace(" ", "");

    // Appends a random number to prevent overwriting previous images with same name
    this.loading = true;
    this.uploadImage();
    nominee.imageURL = "https://foodfight-2019.s3.amazonaws.com/" + this.imgName;
    this.db.object('nominees/' + nominee.id).update(nominee);

    this.nomineeForm.reset();
    this.closeForm.emit();
  }

  calculateNextNomineeId(): string {
    const currentMax = Math.max(...this.nomineeList.map(nominee => +nominee.id), 0);
    return (currentMax + 1).toString();
  }

  uploadImage() {
    const region = "us-east-1";
    const bucketName = "foodfight-2019";

    AWS.config.update({
      region: region,
      accessKeyId: 'AKIAYGPHYWW5SIDTDKNA',
      secretAccessKey: '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'
    });

    const S3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {
        Bucket: bucketName
      }
    });

    S3.upload({
      Key: this.imgName,
      Bucket: bucketName,
      Body: this.file,
      ACL: 'public-read'
    }, function (err, data) {
      if (err) {
        console.error(err, "there was an error uploading your file");
      }
    })
  }

  preview(fileEvent: any) {
    let files = fileEvent.target.files;
    if (files.length === 0) {
      this.imgData = "";
      return;
    }

    this.file = files[0];

    var mimeType = this.file.type;
    if (mimeType.match(/image\/*/) == null) {
      alert("Only images are supported");
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      this.imgData = reader.result;
      this.imgName = this.file.name;
    }
  }

  onCancel() {
    this.nomineeForm.reset();
    this.closeForm.emit();
  }

}