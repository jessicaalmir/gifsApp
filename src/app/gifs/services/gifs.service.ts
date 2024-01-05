import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private api_key = 'x6X6un3eZF4dhaYi4ccmCcPU8TwvQQk5';
  private serviceUrl = 'https://api.giphy.com/v1/gifs';
  private _tagsHistory: string [] = [];

  public gifList : Gif[] = [];

  constructor(private http: HttpClient) {
    this.getLocalStorage();
   }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag))
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag != tag)
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }
  // async  searchTag(tag: string): Promise<void>{
  //   if(tag.length===0) return;
  //   this.organizeHistory(tag);
  //    
  //   // fetch('https://api.giphy.com/v1/gifs/search?api_key=x6X6un3eZF4dhaYi4ccmCcPU8TwvQQk5&q=&limit=12')
  //   // .then(resp => resp.json())
  //   // .then(data => console.log(data));

    
  // }

  searchTag(tag : string) : void{
    if(tag.length===0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key',this.api_key)
      .set('limit', '10')
      .set('q', tag)
    
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
    .subscribe(resp => {
      this.gifList = resp.data;
    })
  }

  /**Method to use LocalStorage and save the history tags information */
  private saveLocalStorage(): void{
    localStorage.setItem('historyTags', JSON.stringify(this._tagsHistory));
  }

  private getLocalStorage(): void {
    if(!localStorage.getItem('historyTags')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('historyTags')!);

    const tag = this._tagsHistory.at(0);

    this.searchTag(tag!);
  }
}
