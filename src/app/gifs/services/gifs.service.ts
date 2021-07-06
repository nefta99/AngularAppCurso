import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'eCL5Y5zyMcH12UTuC9NpwxT2M6sgKAtq';
  private _historial : string [] = [];
  
  // TODO: cambiar any por su tipo 
  public resultados  : any[] = [];

  get historial(){

    return [...this._historial];
  }
 
  constructor(private http:HttpClient ){}

  buscarGifs(query: string=''){
    query = query.toLocaleLowerCase();
    //con esto se valida que no exista el elemento dentro del arreglo
    if(!this._historial.includes(query)){      
      this._historial.unshift(query);
      //valida que no se salga de 10 lugares
      this._historial = this._historial.splice(0,10);
      
    }
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=eCL5Y5zyMcH12UTuC9NpwxT2M6sgKAtq&q=${query}&limit=10`)
    .subscribe((resp : any)=>{
      console.log(resp.data);  
      this.resultados=resp.data;
    });
    



    
  }
}
