import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.page.html',
  styleUrls: ['./contribute.page.scss'],
})
export class ContributePage implements OnInit {
  data:any;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get<any>(`${environment.apiUrl}/ghost/api/v2/content/pages/slug/contribute/?key=${environment.contentApiKey}`)
      .pipe(map(a=>a.pages))
      .subscribe(a=>{
        this.data = a[0];
        console.log(this.data);
      })
  }

}
