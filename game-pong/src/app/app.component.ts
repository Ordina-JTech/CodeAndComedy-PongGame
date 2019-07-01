import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Code&Comedy';

    constructor(
        private domSanitizer: DomSanitizer,
        private matIconRegistry: MatIconRegistry
    ) { }

    ngOnInit(): void {
        this.matIconRegistry.addSvgIcon('arrow_up', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/arrow_up.svg'));
        this.matIconRegistry.addSvgIcon('arrow_down', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/arrow_down.svg'));
    }

}
