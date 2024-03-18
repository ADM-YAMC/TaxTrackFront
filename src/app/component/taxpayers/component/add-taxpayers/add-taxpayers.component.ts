import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComprobanteFiscal } from 'src/app/models/ComprobanteFiscal';
import { IResponse } from 'src/app/models/IResponse';
import { TipoContribuyente } from 'src/app/models/TipoContribuyente';
import { TaxpayersService } from 'src/app/services/taxpayers.service';
import { TypeTaxpayersService } from 'src/app/services/type-taxpayers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'add-taxpayers',
  templateUrl: './add-taxpayers.component.html',
  styleUrls: ['./add-taxpayers.component.css'],
})
export class AddTaxpayersComponent implements OnInit, AfterViewInit {
  dataList: any;
  formCom!: FormGroup;
  form!: FormGroup;
  placeholder: string = '000-0000000-0';
  itebis18: number = 0;
  dataListTemp: ComprobanteFiscal[] = [];
  paginatedTax: ComprobanteFiscal[] = [];
  listCom: ComprobanteFiscal[] = [];
  typeTaxpayersList: TipoContribuyente[] = [];
  identificationType: any[] = [
    { id: 1, text: 'Cédula' },
    { id: 2, text: 'RNC' },
  ];
  filteredList: { records: any[]; enable: boolean } = {
    records: [],
    enable: false,
  };
  onLoad = true;
  constructor(
    private taxpayersService: TaxpayersService,
    private typeTaxpayersService: TypeTaxpayersService,
    public dialogRef: MatDialogRef<AddTaxpayersComponent>,
    private changeDetecter: ChangeDetectorRef,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
  }
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    this.dataList = this.data.dataList;
    this.getTypeTaxpayers();
    this.initForm();
    if (this.data.data !== null) {
      this.form.patchValue({
        id: this.data.data.id,
        idTipoContribuyente: this.data.data.idTipoContribuyente,
        rncCedula: this.data.data.rncCedula,
        nombre: this.data.data.nombre,
        typeIdentification: this.data.data.rncCedula.length === 11 ? 1 : 2,
      });
      let comp = [...this.data.data.comprobantesFiscales];
      this.dataListTemp = comp;
    }
    this.changeDetecter.detectChanges();
  }

  initForm() {
    this.formCom = this.fb.group({
      id: [0],
      monto: [{ value: null, disabled: false }, [Validators.required]],
      itbis18: [{ value: null, disabled: true }],
      ncf: [{ value: '', disabled: true }],
      isActive: [true],
    });

    this.form = this.fb.group({
      id: [0],
      typeIdentification: ['', [Validators.required]],
      idTipoContribuyente: ['', [Validators.required]],
      rncCedula: [{ value: null, disabled: true }, [Validators.required]],
      nombre: [null, [Validators.required]],
      isActive: [true],
    });
  }
  getTypeTaxpayers() {
    this.typeTaxpayersService
      .getTypeTaxpayers()
      .subscribe((result: IResponse<TipoContribuyente>) => {
        if (result.success) {
          this.typeTaxpayersList = result.dataList!;
          this.typeTaxpayersList = this.typeTaxpayersList.filter(
            (item: any) => item.isActive === true
          );
        }
      });
  }

  deleteItem(data: any) {
    this.dataListTemp = this.dataListTemp.filter(
      (item: any) => item.ncf !== data.ncf
    );
    this.paginatedTax = this.dataListTemp;
  }

  addTax() {
    if (this.formCom.invalid || this.form.invalid) {
      this.formCom.markAllAsTouched();
      this.form.markAllAsTouched();
      return;
    }
    let form = this.formCom.value;
    form.rncCedula = this.form.controls['rncCedula'].value;
    form.itbis18 = this.formCom.controls['itbis18'].value;
    form.ncf = this.formCom.controls['ncf'].value;
    form.nfc = this.formCom.value.nfc;
    this.dataListTemp.push(form);
    this.paginatedTax = this.dataListTemp;
    this.paginatedTax.reverse();
    this.formCom.reset();
  }

  addTaxPayers() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.data.data === null) {
      let form = this.form.value;

      form.comprobantesFiscales = this.dataListTemp;
      this.put(form);
    } else {
      let form = this.form.value;
      form.id = this.data.data.id;
      form.rncCedula = this.form.controls['rncCedula'].value;
      form.comprobantesFiscales = this.dataListTemp;
      this.put(form);
    }
  }
  post(form: any) {
    this.taxpayersService
      .setTaxpayers(form)
      .subscribe((result: IResponse<string>) => {
        if (result.success) {
          this.form.reset();
          this.dialogRef.close(true);
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
  put(form: any) {
    // console.log(form);
    this.taxpayersService
      .putTaxpayers(form)
      .subscribe((result: IResponse<string>) => {
        if (result.success) {
          this.form.reset();
          this.dialogRef.close(true);
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

  onChangeSelect(event: any) {
    let value = event.target.value;
    this.form.get('rncCedula')?.enable();
    this.placeholder = value === '1' ? '000-0000000-0' : '0-000000000';
  }
  onChangeInput(event: any) {
    let value = event.target.value;
    let itebis = (value * 0.18).toFixed(2);
    this.formCom.controls['itbis18'].setValue(itebis);
  }
  onClickInput(event: any) {
    const nextNFC = this.getNextNFC();
    this.formCom.controls['ncf'].setValue(nextNFC);
  }
  getNextNFC(): string {
    if (this.onLoad) {
      console.log(this.dataList);
      this.listCom = this.dataList.flatMap(
        (item: any) => item.comprobantesFiscales
      );
      this.onLoad = false;
    }

    console.log(this.listCom);
    let combinedList = [...this.listCom, ...this.dataListTemp];
    console.log(combinedList);
    if (!Array.isArray(combinedList) || combinedList.length === 0) {
      return 'E310000000001';
    }
    const lastData = combinedList[combinedList.length - 1];
    const lastNFC = lastData?.ncf || 'E310000000001';
    const lastNumber = parseInt(lastNFC.slice(3), 10);
    const nextNumber = (lastNumber + 1).toString().padStart(9, '0');

    return `E31${nextNumber}`;
  }
  validator(campo: string) {
    return (
      this.form.controls[campo]?.errors && this.form.controls[campo]?.touched
    );
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
