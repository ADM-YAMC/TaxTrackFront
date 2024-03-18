import { ComprobanteFiscal } from './ComprobanteFiscal';
import { TipoContribuyente } from './TipoContribuyente';

export interface Contribuyente {
  id: number;
  createdDate: string;
  modifiedDate: string;
  isActive: boolean;
  idTipoContribuyente: number;
  rncCedula: string;
  nombre: string;
  tipoContribuyentes: TipoContribuyente;
  comprobantesFiscales: ComprobanteFiscal[];
}
