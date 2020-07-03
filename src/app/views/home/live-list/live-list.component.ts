import { Live } from './../../../shared/model/live.model';
import { LiveService } from './../../../shared/service/live.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent implements OnInit {

  livesPrevious: Live[];
  liveNext: Live[];

  constructor(
    public liveService: LiveService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getLives();
  }

  getLives() {
    this.liveService.getLivesWithFlag('previous').subscribe(data => {
      this.livesPrevious = data.content;
      console.log(this.livesPrevious);
      this.livesPrevious.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });
    });

    this.liveService.getLivesWithFlag('next').subscribe(data => {
      this.liveNext = data.content;
      console.log(this.liveNext);
      this.liveNext.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });
    });
  }

}
