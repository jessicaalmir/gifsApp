import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
    selector: 'gifs-search-box',
    template: `<h5>Find:</h5>
    <input type="text"
        class="form-control"
        placeholder="Find Gifs"
        (keyup.enter)="searchTag()"
        #TxtTagInput 
    />`,
})

export class SearchBoxComponent implements OnInit {
    @ViewChild('TxtTagInput')
    public tagInput!: ElementRef<HTMLInputElement>;

    constructor(private gifsService: GifsService) { }

    ngOnInit() { }

    searchTag(){
        const newTag = this.tagInput.nativeElement.value;
        this.gifsService.searchTag(newTag);
        this.tagInput.nativeElement.value = "";
    }
}