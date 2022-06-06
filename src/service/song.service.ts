import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  id: number;
  nama: string;
  uang: string;
  tanggal: string;
  constructor() { }
}
