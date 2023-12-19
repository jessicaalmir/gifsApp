import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @ViewChild('tagButton')
  public tagInput!: ElementRef<HTMLButtonElement>;

    constructor(private gifsService: GifsService){
     
    }
    get tags(){
      return this.gifsService.tagsHistory;
    }

    searchTag(newTag : string){
        this.gifsService.searchTag(newTag);
    }
}
