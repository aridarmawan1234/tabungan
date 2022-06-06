import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SongService } from 'src/service/song.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import * as messageCenter from 'src/app/message-center.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private storage: SQLiteObject;
  songsList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private platform: Platform, private sqlite: SQLite, private httpClient: HttpClient, private sqlPorter: SQLitePorter,) {
    // let data = {username: 'ADMIN', password: "12345"}
    // this.httpClient.post("http://localhost:2021/auth",data).subscribe(value=>{
    //   console.log(value)
    // })
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'tabungan.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }
 
  fetchDisplay(): Observable<SongService[]> {
    return this.songsList.asObservable();
  }

    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/dump.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getSongs();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

  // Get list
  getSongs(){
    return this.storage.executeSql('SELECT * FROM tabunganTable', []).then(res => {
      let items: SongService[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            nama: res.rows.item(i).nama,  
            uang: res.rows.item(i).uang,
            tanggal: res.rows.item(i).tanggal
           });
        }
      }
      this.songsList.next(items);
    });
  }

  // Add
  addSong(nama, uang, tanggal) {
    let addTabungan: object = []
    let data = [nama, uang, tanggal];
    return this.storage.executeSql('INSERT INTO tabunganTable (nama, uang, tanggal) VALUES (?, ?, ?)', data)
    .then(res => {
      messageCenter.runCallback('addTabungan', 'Y')
      this.getSongs();
    })
    .catch(er =>{
      messageCenter.runCallback('addTabungan', 'N')
    })
  }
 
  // Get single object
  getSong(id): Promise<SongService> {
    return this.storage.executeSql('SELECT * FROM tabunganTable WHERE id = ?', [id]).then(res => { 
      return {
        id: res.rows.item(0).id,
        nama: res.rows.item(0).nama,  
        uang: res.rows.item(0).uang,
        tanggal: res.rows.item(0).tanggal
      }
    });
  }

  getSelectName(nama: string, stardate: string, enddate:string){
    console.log(nama,stardate,enddate)
    let items = [];
    if(nama != "ALL"){
    return this.storage.executeSql(`SELECT * FROM tabunganTable WHERE nama = ? AND tanggal >= ? AND tanggal <= ?`,[nama,stardate,enddate]).then(res => {
        if (res.rows.length > 0) {
           for (var i = 0; i < res.rows.length; i++) { 
            items.push({ 
               id: res.rows.item(i).id,
               nama: res.rows.item(i).nama,  
               uang: res.rows.item(i).uang,
               tanggal: res.rows.item(i).tanggal
              });
           }
         }
         return items;
       })
    }else{
    return this.storage.executeSql(`SELECT * FROM tabunganTable WHERE tanggal >= ? AND tanggal <= ?`,[stardate,enddate]).then(res => {
        if (res.rows.length > 0) {
           for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
               id: res.rows.item(i).id,
               nama: res.rows.item(i).nama,  
               uang: res.rows.item(i).uang,
               tanggal: res.rows.item(i).tanggal
              });
           }
          }
          console.log(items)
          return items;
        })
    }
  }

  // Update
  updateSong(id, nama, uang, tanggal) {
    let data = [nama, uang, tanggal];
    return this.storage.executeSql(`UPDATE tabunganTable SET nama = ?, uang = ?, tanggal = ? WHERE id = ${id}`, data)
    .then(data => {
      this.getSongs();
    })
  }

  // Delete
  deleteSong(id) {
    return this.storage.executeSql('DELETE FROM tabunganTable WHERE id = ?', [id])
  }

}

