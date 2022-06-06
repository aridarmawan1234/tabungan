import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ToastController, LoadingController, ModalController, AlertController } from '@ionic/angular';
import { AddTabunganPage } from 'src/app/add-tabungan/add-tabungan.page'
import { StorageAService } from 'src/app/storage-a.service';
import { DatabaseService } from 'src/service/database.service';
import * as messageCenter from 'src/app/message-center.service';
import * as tools from 'src/app/tools.service';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-tab-profil',
  templateUrl: './tab-profil.page.html',
  styleUrls: ['./tab-profil.page.scss'],
})
export class TabProfilPage{
  listTabungan = []
  totalPemasukan = 0;
  constructor(
    private modalCtrl: ModalController,public storage: StorageAService, private db: DatabaseService, public global: GlobalService
    ) {
    }
    
  ionViewWillEnter() {
    this.getData();
  }

  getData(){
    let total = 0;
    this.db.dbState().subscribe((res)=>{
      if(res){
        this.db.fetchDisplay().subscribe(item =>{
          console.log(item)
         let data = Object.assign(item);
         var result = [];
         for(var items of data){
           if(!result.some(value => value && value['nama'] === items['nama'])){
             items['uangFormat'] = parseFloat(items['uang'])
            // console.log('true', [items['nama'], items['uang'],items['uangFormat']])
            result.push(items)
           }else{
             result.forEach(element => {
              if(element['nama'] === items['nama']){
                items['uangFormat'] = parseFloat(items['uang'])
                element['uangFormat'] += items['uangFormat'];
                // console.log('false', [items['nama'], items['uang'],element['uangFormat']])
              }
             })
           }
          }
          this.listTabungan = Object.assign(result);
          this.totalPemasukan = 0;
          for(let i=0; i<this.listTabungan.length; i++){
            this.totalPemasukan += this.listTabungan[i]['uangFormat'];
          }
          
        })
      }
    });
  }
  changeDarkMode(value){
    let dark = value ? false : true;
    console.log(dark)
    this.global.setTheme(dark)
    this.storage.set('theme', dark)
  }
}
