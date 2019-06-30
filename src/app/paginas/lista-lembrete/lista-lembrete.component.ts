import { Component, OnInit, ViewChild } from '@angular/core';

import { LembreteService } from '../../services/lembrete.service';
import { ErrorMsgComponent } from '../../compartilhado/error-msg/error-msg.component';
import { Lembrete } from 'src/lembrete';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-lembrete',
  templateUrl: './lista-lembrete.component.html',
  styleUrls: ['./lista-lembrete.component.css']
})
export class ListaLembreteComponent implements OnInit {
  public lembretes: Lembrete[];

  lembretes$: Observable<Lembrete[]>;

  @ViewChild(ErrorMsgComponent) errorMsgComponent: ErrorMsgComponent;

  constructor(private lembreteService: LembreteService) { }

  ngOnInit() {
    this.getListaLembretes();
  }

  getListaLembretes() {
    this.lembreteService.getListaLembretes()
      .subscribe((lembretes: Lembrete[]) => {
        this.lembretes = lembretes;
      }, () => { this.errorMsgComponent.setError('Falha ao buscar lembretes.'); });
  }

  deletaLembrete(id: number) {
    this.lembreteService.deletaLembrete(id)
      .subscribe(() => {
        this.getListaLembretes();
      }, () => { this.errorMsgComponent.setError('Falha ao deletar lembrete.'); });
  }

  existemLembretes(): boolean {
    return this.lembretes && this.lembretes.length > 0;
  }
}
