import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(array: any[], text: string): any[] {
    if (text === '') {
      return array;
    }

    const normalizedText = this.normalizeText(text);

    return array.filter((item) => {
      const rncCedula = this.normalizeText(item?.rncCedula);
      const nombre = this.normalizeText(item?.nombre);

      return (
        (rncCedula ?? '').includes(normalizedText) ||
        (nombre ?? '').includes(normalizedText)
      );
    });
  }

  normalizeText(texto: string): string {
    return texto
      ? texto
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      : '';
  }
}
