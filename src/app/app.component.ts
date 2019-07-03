import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

declare var GhostContentAPI: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  data: any = [];
  constructor(private http: HttpClient,
    private platform: Platform,private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  closeMenu() {
    document.getElementById("backdrop").style.visibility= "hidden";
    document.getElementById("backdrop").style.opacity= "0";
    document.getElementById("menu").style.width = "0";
  }

  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1,autoplay: true,
  autoplaySpeed: 2000};
  ngOnInit() {
    this.http.get<any>(`${environment.apiUrl}/ghost/api/v2/content/posts/?key=${environment.contentApiKey}&filter=featured:true`)
      .pipe(map(a => a.posts))
      .subscribe(a => {
        this.data = a;
        console.log(a);
      })
  }

  ngAfterViewInit(): void {
    const sliderOpts = { 
     
      speed: 400, 
      pager: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ] 
      }
  }


  gotoDetails(id)
  {
    this.router.navigateByUrl('/blogdetail/'+id)
  }
}
