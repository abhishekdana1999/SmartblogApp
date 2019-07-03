import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blogdetail',
  templateUrl: './blogdetail.page.html',
  styleUrls: ['./blogdetail.page.scss'],
})
export class BlogdetailPage implements OnInit {
  id:any;
  data = [];
  constructor(private aroute: ActivatedRoute , private http: HttpClient) { }

  ngOnInit() {
    this.aroute.params.subscribe(a=>{
      this.id = a.id;
      
    });

    this.http.get<any>(`${environment.apiUrl}/ghost/api/v2/content/posts/${this.id}?key=${environment.contentApiKey}&include=tags,authors`)
    .pipe(map(a=>a.posts))
    .subscribe(a=>{
      this.data = a[0];
      console.log(this.data);
    })
    
  }

}
