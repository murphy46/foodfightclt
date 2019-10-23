import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  @ViewChild('counter') counter: ElementRef;

  ngOnInit(): void {
    this.initializeTimer();
    this.setCountdownTimer();
  }

  initializeTimer() {
    const countDownDate = new Date("Nov 10, 2019 23:59:59").getTime();
    const now = new Date().getTime();

    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance > 0) {
      this.counter.nativeElement.innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s "
    }

  }

  setCountdownTimer() {
    const x = setInterval(() => {
      const countDownDate = new Date("Nov 14, 2019 12:00:00").getTime();
      const now = new Date().getTime();

      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      distance > 0 ? this.counter.nativeElement.innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s " : clearInterval(x);
    }, 1000);
  }

}
