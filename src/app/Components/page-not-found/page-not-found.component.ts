import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  path: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.pipe(take(1))
    .subscribe((data: { path: string }) => {
      this.path = data.path;
    });
  }
}

/** We are using activated route snapshot to get the path resolved by PathResolveService. 
 * This path is used in the component template to show a user-friendly message with the link to correct resource. 
 */