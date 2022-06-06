import { Component, OnInit, ViewChild  } from '@angular/core';
import { MenuController, NavController, ToastController, LoadingController, ModalController, AlertController } from '@ionic/angular';
import { AddTabunganPage } from 'src/app/add-tabungan/add-tabungan.page'
import { StorageAService } from 'src/app/storage-a.service';
import { DatabaseService } from 'src/service/database.service';
import * as messageCenter from 'src/app/message-center.service';
import * as tools from 'src/app/tools.service';
import { element } from 'protractor';
import { EditTabunganPage } from 'src/app/edit-tabungan/edit-tabungan.page';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";



@Component({
  selector: 'app-tab-chart',
  templateUrl: './tab-chart.page.html',
  styleUrls: ['./tab-chart.page.scss'],
})
export class TabChartPage {
  options: any = {};
  ChartOptions: any = {};
  NamaFilter = "ALL";
  namaLengkap = [];
  nama = [];
  date = [];
  uang = [];
  startDate = tools.currentDateModify(-8);
  endDate = tools.currentDateModify(21);
  constructor(private modalCtrl: ModalController,public storage: StorageAService, private db: DatabaseService) {
    this.reqDb();
  }
   

  ionViewWillEnter() {
    this.reqDb();
  }

  reqDb(){
    let result = [];
    this.db.dbState().subscribe((res)=>{
      if(res){
        this.db.getSelectName(this.NamaFilter,this.startDate.toString(),this.endDate.toString()).then(item =>{
          this.nama = [];
          this.uang = [];
          this.date = [];
          let display = [];
          let data = Object.assign(item)
          for(var items of data){
            let p = {
              nama: items['nama'],
              uang: items['uang']
            }
            display.push(p)
           }
           for(var array of display){
              if(!result.some(value => value && value['nama'] === array['nama'])){
              array['uangFormat'] = parseFloat(array['uang'])
              result.push(array)
            }else{
              result.forEach(element => {
                if(element['nama'] === array['nama']){
                 array['uangFormat'] = parseFloat(array['uang'])
                 element['uangFormat'] += array['uangFormat'];
               }
              })
            }
           }
           for(let i = 0; i<result.length; i++){
            this.nama.push(result[i]['nama'])
             this.uang.push(result[i]['uangFormat'])
            }
            this.options = {
              series: [
                {
                  name: "Nominal: ",
                  data: this.uang
                }
              ],
              chart: {
                height: 350,
                type: "bar"
              },
              title: {
                text: "Chart Tabungan"
              },
              xaxis: {
                categories: this.nama
              }
            }

          })
        }
      });
    
  }

}
