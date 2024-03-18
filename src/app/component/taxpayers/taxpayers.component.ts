import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComprobanteFiscal } from 'src/app/models/ComprobanteFiscal';
import { Contribuyente } from 'src/app/models/Contribuyente';
import { IResponse } from 'src/app/models/IResponse';
import { TaxpayersService } from 'src/app/services/taxpayers.service';
import { AddTaxpayersComponent } from './component/add-taxpayers/add-taxpayers.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewTaxpayersComponent } from './component/view-taxpayers/view-taxpayers.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'taxpayers',
  templateUrl: './taxpayers.component.html',
  styleUrls: ['./taxpayers.component.css'],
})
export class TaxpayersComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  dataList: Contribuyente[] = [];
  dataListTemp: Contribuyente[] = [];
  paginatedTaxPayers: Contribuyente[] = [];
  search: string = '';
  filteredList: { records: any[]; enable: boolean } = {
    records: [],
    enable: false,
  };

  constructor(
    private taxpayersService: TaxpayersService,
    private changeDetecter: ChangeDetectorRef,
    private dialog: MatDialog,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getTaxpayers();
  }

  getTaxpayers() {
    this.taxpayersService.getTaxpayers().subscribe({
      next: (result: IResponse<Contribuyente>) => {
        if (result.success) {
          this.dataListTemp =
            result?.dataList!.length > 0 ? result.dataList! : [];

          this.dataList = [...result.dataList!];
          this.changeDetecter.detectChanges();
          //  console.log(this.dataList);
        }
      },
      error: (result: IResponse<Contribuyente>) => {
        this.toast.error(
          'Ocurrió un error al momento de cargar la información… ',
          'Error'
        );
      },
    });
  }
  searchbarInput(ev: any) {
    this.search = ev.target.value;
  }
  sumMontoTax(taxs: ComprobanteFiscal[]): number {
    let total = 0;
    taxs.forEach((tax) => {
      total += tax.monto;
    });
    return total;
  }
  sumTax(taxs: ComprobanteFiscal[]): number {
    let total = 0;
    taxs.forEach((tax) => {
      total += tax.itbis18;
    });
    return total;
  }
  editStatus(type: any) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `¿Estas seguro de que quieres ${
        type.isActive ? 'Inactivar' : 'Activar'
      } este contribuyente?`,
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
        this.getTaxpayers();
      } else if (result.dismiss === Swal.DismissReason.close) {
        this.getTaxpayers();
      } else if (result.dismiss === Swal.DismissReason.backdrop) {
        this.getTaxpayers();
      }
    });
  }
  put(form: any) {
    form.isActive = !form.isActive;
    this.taxpayersService
      .putTaxpayers(form)
      .subscribe((result: IResponse<string>) => {
        if (result.success) {
          this.getTaxpayers();
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
  addOrEdit(data: any) {
    this.dialog
      .open(AddTaxpayersComponent, {
        width: '900px',
        data: {
          data: data,
          dataList: this.dataList,
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.getTaxpayers();
        }
      });
  }
  view(data: any) {
    this.dialog.open(ViewTaxpayersComponent, {
      width: '900px',
      data,
    });
  }

  getPaginatedRecords(event: any) {
    this.paginatedTaxPayers = event.formattedRecords[event.selectedPage - 1]
      ? event.formattedRecords[event.selectedPage - 1].records
      : [];
    this.changeDetecter.detectChanges();
  }
}
