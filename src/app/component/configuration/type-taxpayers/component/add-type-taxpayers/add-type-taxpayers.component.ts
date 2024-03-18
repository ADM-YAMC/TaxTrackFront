import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IResponse } from 'src/app/models/IResponse';
import { TypeTaxpayersService } from 'src/app/services/type-taxpayers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'add-type-taxpayers',
  templateUrl: './add-type-taxpayers.component.html',
  styleUrls: ['./add-type-taxpayers.component.css'],
})
export class AddTypeTaxpayersComponent implements OnInit {
  form!: FormGroup;
  @Output() reloadTable = new EventEmitter<any>();
  constructor(
    private typeTaxpayersService: TypeTaxpayersService,
    public dialogRef: MatDialogRef<AddTypeTaxpayersComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
  }
  ngOnInit(): void {
    this.initForm();
    if (this.data !== null) {
      this.form.patchValue({
        comentario: this.data.comentario,
        nombre: this.data.nombre,
      });
    }
    console.log(this.form.value);
  }
  initForm() {
    this.form = this.fb.group({
      isActive: [true],
      comentario: [null],
      nombre: [null, [Validators.required]],
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let form = this.form.value;
    form.id = this.data === null ? 0 : this.data.id;
    form.isActive = this.data === null ? true : this.data.isActive;
    if (this.data === null) {
      this.post(form);
    } else {
      this.put(form);
    }
  }

  put(form: any) {
    this.typeTaxpayersService
      .putTypeTaxpayers(form)
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
  post(form: any) {
    this.typeTaxpayersService
      .setTypeTaxpayers(form)
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
  validator(campo: string) {
    return (
      this.form.controls[campo]?.errors && this.form.controls[campo]?.touched
    );
  }
  close(): void {
    this.dialogRef.close();
  }
}
