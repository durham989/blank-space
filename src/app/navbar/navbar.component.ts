import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  styleUrls: [ './navbar.component.scss' ],
  templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {

  constructor() {}

  public ngOnInit() {
    // 
  }

  openSidebar() {
    console.log('sidebar icon clicked');
  }

}
