import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input() public isLoading:boolean = false;

  private tempoMinimoExibicao: number = 3000; // 1 segundo

  constructor() { }

  ngOnInit(): void {
  }

  public exibirLoadingComTempoMinimo(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, this.tempoMinimoExibicao);
  }

}
