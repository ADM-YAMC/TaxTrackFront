import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComprobanteFiscal } from 'src/app/models/ComprobanteFiscal';
import { Contribuyente } from 'src/app/models/Contribuyente';
import { IResponse } from 'src/app/models/IResponse';
import { TaxpayersService } from 'src/app/services/taxpayers.service';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  dataList: Contribuyente[] = [];
  formCom!: FormGroup;
  dataListTemp: Contribuyente[] = [];
  paginatedTaxPayers: Contribuyente[] = [];
  placeholder: string = '';
  itebis18: number = 0;
  filteredList: { records: any[]; enable: boolean } = {
    records: [],
    enable: false,
  };
  identificationType: any[] = [
    { id: 1, text: 'Cédula' },
    { id: 2, text: 'RNC' },
  ];
  constructor(
    private taxpayersService: TaxpayersService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.getTaxpayers();
  }

  initForm() {
    this.formCom = this.fb.group({
      monto: [null, [Validators.required]],
      itebis18: [{ value: null, disabled: true }],
      nfc: [{ value: '', disabled: true }],
    });
  }
  getTaxpayers() {
    this.taxpayersService
      .getTaxpayers()
      .subscribe((result: IResponse<Contribuyente>) => {
        if (result.success) {
          this.dataListTemp =
            result?.dataList!.length > 0 ? result.dataList! : [];
          this.dataList = [...result.dataList!];
          console.log(this.dataList);
        }
      });
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
  onChangeSelect(event: any) {
    let value = event.target.value;

    this.placeholder = value === '1' ? '***-*******-*' : '*-********';
  }
  onChangeInput(event: any) {
    let value = event.target.value;
    let itebis = (value * 0.18).toFixed(2);
    this.formCom.controls['itebis18'].setValue(itebis);
  }
  onClickInput(event: any) {
    const nextNFC = this.getNextNFC(this.dataList);
    this.formCom.controls['nfc'].setValue(nextNFC);
  }
  getNextNFC(dataList: any[]): string {
    if (!Array.isArray(dataList) || dataList.length === 0) {
      return 'E310000000001';
    }
    const lastData = dataList[dataList.length - 1];
    const lastReceipt =
      lastData.comprobantesFiscales[lastData.comprobantesFiscales.length - 1];
    const lastNFC = lastReceipt?.ncf || 'E310000000001';
    console.log(lastNFC);
    const lastNumber = parseInt(lastNFC.slice(3), 10);
    const nextNumber = (lastNumber + 1).toString().padStart(9, '0');
    return `E31${nextNumber}`;
  }

  getPaginatedRecords(event: any) {
    this.paginatedTaxPayers = event.formattedRecords[event.selectedPage - 1]
      ? event.formattedRecords[event.selectedPage - 1].records
      : [];
  }
}
