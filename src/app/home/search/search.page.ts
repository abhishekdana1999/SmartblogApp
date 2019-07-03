import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
declare var GhostContentAPI:any;
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  search:any;
  searchdata: any;
  constructor() { }

  ngOnInit() {
  }

  
  searchPost(){
    const api = new GhostContentAPI({
      host: environment.apiUrl,
      key: environment.contentApiKey,
      version: 'v2'
    });
    
    // fetch 5 posts, including related tags and authors
    api.posts.browse({
        filter: `tag:${this.search}`
    })
    .then((posts) => {
      this.searchdata = posts;
        posts.forEach((post) => {

            console.log(post)
        });
    })
    .catch((err) => {
        console.log(err)
    });
  }


  
  closeSearch() 
  {
    let ele = document.getElementById("search");
    ele.style.opacity = "0";
    ele.style.visibility = "hidden";
    this.search = "";
    this.searchdata = ""; 
  }


}
