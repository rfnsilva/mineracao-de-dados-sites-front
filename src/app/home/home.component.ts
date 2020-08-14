import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import * as $ from 'jquery'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public radio_value: any;
  readonly apiURL: string;
  public rota: Router;
  public url: string = '';
  
  @Input()
  public ctrl_img: boolean = false;
  @Input()
  public ctrl_texto: boolean = false;
  @Input()
  public resumo_img: any;
  @Input()
  public resumo_texto: any;

  constructor(private http : HttpClient, private r: Router){
    this.apiURL = 'http://localhost:3000';
    this.rota = r;
  }


  ngOnInit(): void {
    $(document).ready(function () {
      $("#sniper").hide();
      $("#sniper_img").hide();
    });
  }

  pesquisar() {
    console.log(this.radio_value)
    if (this.radio_value !== undefined) {
      this.resumo_img = null;
      $("#sniper_img").hide();
      $("#sniper").show();
      //1 instagram  2 americanas  3 facebook  4 jornais
      const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    
      if (this.radio_value === '1') {
        let aux = {
          perfil: this.url
        }

        this.ctrl_img = true;
        this.ctrl_texto = false;
        this.http.post(`${this.apiURL}/login_get_images_perfil_instagram`, aux, { 'headers': headers })
          .subscribe(result => {
            this.resumo_img = result;
            $("#sniper").hide();
            $("#sniper_img").show();
          });
      }

      if (this.radio_value === '2') {
        let aux = {
          url: this.url
        }

        this.ctrl_texto = true;
        this.ctrl_img = false;
        this.http.post(`${this.apiURL}/get_produtos_celulares_americanas_promocoes`, aux, { 'headers': headers })
          .subscribe(result => {
            this.resumo_texto = result;
            $("#sniper").hide();
            $("#sniper_img").show();
        });
      }

      if (this.radio_value === '3') {
        let aux = {
          perfil: this.url
        }

        this.ctrl_img = true;
        this.ctrl_texto = false;
        this.http.post(`${this.apiURL}/login_get_imagens_perfil_facebook`, aux, { 'headers': headers })
          .subscribe(result => {
            this.resumo_img = result;
            $("#sniper").hide();
            $("#sniper_img").show();
        });
      }

      if (this.radio_value === '4') {
        let aux = {
          url: this.url
        }

        this.ctrl_texto = true;
        this.ctrl_img = false;
        this.http.post(`${this.apiURL}/login_get_manchetes_jornais_page_facebook`, aux, { 'headers': headers })
          .subscribe(result => {
            this.resumo_texto = [result];
            $("#sniper").hide();
            $("#sniper_img").show();
        });
      }
    } else {
      alert('selecione um serviço !');
    }
    
  }

  onItemChange(event){
    this.radio_value = event.target.value;
  }

  onchange() {
  }
}
