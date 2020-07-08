import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    let s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://sdk.canva.com/v1/embed.js";
    s.crossOrigin="anonymous";
    this.elementRef.nativeElement.appendChild(s);
  }
}
