import {FormatTypeEnum} from '../document-viewer.component';

export type FormatType =
  FormatTypeEnum.NONE
  | FormatTypeEnum.PDF_URL
  | FormatTypeEnum.PDF_BASE64
  | FormatTypeEnum.DOCX_URL
  | FormatTypeEnum.DOCX_BASE64;
