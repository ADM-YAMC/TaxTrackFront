import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IResponse } from 'src/app/models/IResponse';
import { TipoContribuyente } from 'src/app/models/TipoContribuyente';
import { TypeTaxpayersService } from 'src/app/services/type-taxpayers.service';
import { AddTypeTaxpayersComponent } from './component/add-type-taxpayers/add-type-taxpayers.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'type-taxpayers',
  templateUrl: './type-taxpayers.component.html',
  styleUrls: ['./type-taxpayers.component.css'],
})
export class TypeTaxpayersComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  dataList: TipoContribuyente[] = [];
  dataListTemp: TipoContribuyente[] = [];
  paginatedTaxPayers: TipoContribuyente[] = [];
  search: string = '';
  filteredList: { records: any[]; enable: boolean } = {
    records: [],
    enable: false,
  };

  constructor(
    private typeTaxpayersService: TypeTaxpayersService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getTypeTaxpayers();
  }

  getTypeTaxpayers() {
    this.typeTaxpayersService
      .getTypeTaxpayers()
      .subscribe((result: IResponse<TipoContribuyente>) => {
        if (result.success) {
          this.dataListTemp =
            result?.dataList!.length > 0 ? result.dataList! : [];
          this.dataList = [...result.dataList!];
          // console.log(this.dataList);
        }
      });
  }
  addOrEdit(data: any) {
    this.dialog
      .open(AddTypeTaxpayersComponent, { width: '600px', data })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.getTypeTaxpayers();
        }
      });
  }
  searchbarInput(ev: any) {
    this.search = ev.target.value;
    //console.log(this.search);
  }
  editStatus(type: any) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `¿Estas seguro de que quieres ${
        type.isActive ? 'Inactivar' : 'Activar'
      } este tipo de contribuyente?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Si, ${type.isActive ? 'Inactivar' : 'Activar'}!`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.put(type);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getTypeTaxpayers();
      } else if (result.dismiss === Swal.DismissReason.close) {
        this.getTypeTaxpayers();
      } else if (result.dismiss === Swal.DismissReason.backdrop) {
        this.getTypeTaxpayers();
      }
    });
  }
  put(form: any) {
    form.isActive = !form.isActive;
    this.typeTaxpayersService
      .putTypeTaxpayers(form)
      .subscribe((result: IResponse<string>) => {
        if (result.success) {
          this.getTypeTaxpayers();
        }
        Swal.fire({
          title: result.success ? '¡Éxito!' : '¡Vaya!',
          text: result.success
            ? result.messages![0]
            : result.messages![0] || result.errors![0],
          icon: result.success ? 'success' : 'error',
        });
      });
  }
  getPaginatedRecords(event: any) {
    this.paginatedTaxPayers = event.formattedRecords[event.selectedPage - 1]
      ? event.formattedRecords[event.selectedPage - 1].records
      : [];
  }
}
