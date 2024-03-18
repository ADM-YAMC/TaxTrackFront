import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComprobanteFiscal } from 'src/app/models/ComprobanteFiscal';

@Component({
  selector: 'app-view-taxpayers',
  templateUrl: './view-taxpayers.component.html',
  styleUrls: ['./view-taxpayers.component.css'],
})
export class ViewTaxpayersComponent implements OnInit {
  dataListTemp: ComprobanteFiscal[] = [];
  paginatedTax: ComprobanteFiscal[] = [];
  taxTotal: number = 0;
  montoTotal: number = 0;
  filteredList: { records: any[]; enable: boolean } = {
    records: [],
    enable: false,
  };
  constructor(
    public dialogRef: MatDialogRef<ViewTaxpayersComponent>,
    private changeDetecter: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
  }
  ngOnInit(): void {
    this.dataListTemp = this.data.comprobantesFiscales;
    this.taxTotal = this.sumTax(this.data.comprobantesFiscales);
    this.montoTotal = this.sumMontoTax(this.data.comprobantesFiscales);
    this.changeDetecter.detectChanges();
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

  getPaginatedRecords(event: any) {
    this.paginatedTax = event.formattedRecords[event.selectedPage - 1]
      ? event.formattedRecords[event.selectedPage - 1].records
      : [];
  }
  close(): void {
    this.dialogRef.close();
  }
}
