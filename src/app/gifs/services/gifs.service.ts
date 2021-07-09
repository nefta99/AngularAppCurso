import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'eCL5Y5zyMcH12UTuC9NpwxT2M6sgKAtq';
  private servicioUrl : string ='https://api.giphy.com/v1/gifs';
  private _historial : string [] = [];
  
  // TODO: cambiar any por su tipo 
  public resultados  : Gif[] = [];

  get historial(){

    return [...this._historial];
  }
 
  constructor(private http:HttpClient ){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  buscarGifs(query: string=''){
    query = query.toLocaleLowerCase();
    //con esto se valida que no exista el elemento dentro del arreglo
    if(!this._historial.includes(query)){      
      this._historial.unshift(query);
      //valida que no se salga de 10 lugares
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial))
      
    }

    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','10')
    .set('q',query);
    
    
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{ params })
    .subscribe((resp )=>{
      console.log(resp.data);  
      this.resultados=resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados))
    });
    



    
  }
}
