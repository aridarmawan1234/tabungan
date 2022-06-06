import { Component } from '@angular/core';
import { StorageAService } from 'src/app/storage-a.service'
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  dark = false;
  constructor(private storage: StorageAService, public global: GlobalService) {}

  async ngOnInit(){
    await this.storage.init();

    this.storage.get('theme').then(val=>{
      this.dark = val || val == true ? true : false;
      this.global.setTheme(this.dark)

    });
  }
}
