import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MenuController, ToastController } from '@ionic/angular';
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data:any=[];
  metadata:any;
  load = 5;
  limit = 0;
  
  page: any;
  maximumPages = 3;
  constructor(private http: HttpClient , private toast: ToastController , private menu: MenuController) {
    this.getData();
  }

  ngOnInit(): void {
    this.http.get(`${environment.apiUrl}/ghost/api/v2/content/posts/?key=${environment.contentApiKey}&include=tags,authors&order=published_at%20desc&limit=all`)
    .subscribe(res => { this.limit = res["meta"].pagination.total;
     })
  }


  getData(infiniteScroll?)
  {
    this.http.get<any>(`${environment.apiUrl}/ghost/api/v2/content/posts/?key=${environment.contentApiKey}&include=tags,authors&order=published_at%20desc&limit=${this.load}`)
    .pipe(map(a=>a.posts)).
    
    subscribe(res => {
      
      this.data =  res
      
    })
  }

  async loadMore(infiniteScroll) {
    this.page++;
   
     this.getData(infiniteScroll);
    console.log(this.load === this.limit)
    if (this.load >= this.limit) {
      infiniteScroll.target.disabled = true;
      const toast = await this.toast.create({
        message: 'You have reach the end.',
        position: 'bottom',
        duration: 2500
      });
      toast.present();
    }else{
      this.load += 5;
    }
  }


  openSearch()
  {
    let ele = document.getElementById("search");
    ele.style.opacity = "1";
    ele.style.visibility = "visible";
  }

  openMenu()
  {
    document.getElementById("menu").style.width = "80%";
    
  }


}
