import { Component} from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'

})
export class SidebarComponent {

  constructor(private gifsercives: GifsService) { }


  get hitorialGif(){
    return this.gifsercives.historial;
  }

  

}
