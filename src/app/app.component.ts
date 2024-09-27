import {Component} from '@angular/core';
import {linkDocxBase64} from './docxBase64';
import {pdfbase64} from './pdfbase64';
import { FormatType } from './document-viewer/types/FormatType';
import { FormatTypeEnum } from './document-viewer/enums/FormatTypeEnum';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dynamic-viewer';
  viewer = '';

  formatType: FormatType = FormatTypeEnum.NONE;
  data = '';

  formatPdfurl: FormatType = FormatTypeEnum.PDF_URL;
  dataPdfUrl = 'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf';
  formatDocxUrl: FormatType = FormatTypeEnum.DOCX_URL;
  dataDocxUrl = 'https://www2.hu-berlin.de/stadtlabor/wp-content/uploads/2021/12/sample3.docx';
  formatPdfBase64: FormatType = FormatTypeEnum.PDF_BASE64;
  pdfbase64 = pdfbase64;
  formatDocxBase64: FormatType = FormatTypeEnum.DOCX_BASE64;
  docxbase64 = linkDocxBase64;


  showExample(
    formatType: FormatTypeEnum,
    data: string
  ) {
    this.formatType = formatType;
    this.data = data;
  }
}
