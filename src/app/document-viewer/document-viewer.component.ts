import {Component, Input, OnChanges, SimpleChanges, EventEmitter, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ViewerTypeEnum} from './enums/ViewerTypeEnum';
import {FileTypeEnum} from './enums/FileTypeEnum';
import {Filetype} from './types/Filetype';
import {ViewerType} from './types/ViewerType';
import {FormatType} from './types/FormatType';
import {FormatTypeEnum} from './enums/FormatTypeEnum';


@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnChanges {

  // il dato rappresentativo del documento, può essere un url o un base64
  @Input()
  docData: string = null;

  // il tipo di visualizzatore scelto
  viewer: ViewerType = ViewerTypeEnum.GOOGLE;

  // emette evento quando il visualizzatore è stato scelto
  @Output()
  choosedViewer = new EventEmitter<string>();

  // il tipo di formato del documento
  @Input()
  formatType: FormatType = FormatTypeEnum.NONE;

  // tipi di file
  filetypePdf: Filetype = FileTypeEnum.PDF;
  filetypeDocx: Filetype = FileTypeEnum.DOCX;

  constructor(private http: HttpClient) {
  }

  // il visualizzatore di goggle emette l'evento quando il documento è caricato
  loaded() {
    // console.log('documento caricato');
  }

  ngOnChanges(changes: SimpleChanges) {

    // se il dato del documento o il tipo di formato cambiano, mostra il documento
    if ((changes.docData && this.docData) || (changes.formatType && this.formatType)) {
      this.showDocument(this.formatType);
    }
  }

  // inizializza il visualizzatore in base al tipo di formato
  showDocument(viewerType: string) {

    switch (viewerType) {

      // visualizza il documento pdf come url
      case FormatTypeEnum.PDF_URL:
        this.viewer = ViewerTypeEnum.GOOGLE;
        this.choosedViewer.emit(this.viewer);
        break;

      // visualizza il documento pdf come base64
      case FormatTypeEnum.PDF_BASE64:
        this.viewer = ViewerTypeEnum.PDF;
        this.choosedViewer.emit(this.viewer);

        // se il documento è un url, scaricalo come base64, altrimenti crea un url base64 per il documento
        if (this.docData.startsWith('http')) {
          this.fetchAsBase64(this.docData);
        } else {
          this.docData = this.createBase64ObjectUrl(this.docData, this.filetypePdf) + '#toolbar=0';
        }
        break;

      // visualizza il documento docx come url
      case FormatTypeEnum.DOCX_URL:
        this.viewer = ViewerTypeEnum.OFFICE;
        this.choosedViewer.emit(this.viewer);
        break;

      // visualizza il documento docx come base64
      case FormatTypeEnum.DOCX_BASE64:
        this.viewer = ViewerTypeEnum.MAMMOTH;
        this.choosedViewer.emit(this.viewer);

        // se il documento è un url, scaricalo come base64, altrimenti crea un url base64 per il documento
        if (this.docData.startsWith('http')) {
          this.fetchAsBase64(this.docData, this.filetypeDocx);
        } else {
          this.docData = this.createBase64ObjectUrl(this.docData, this.filetypeDocx);
        }
        break;

      default:
        this.docData = null;
    }
  }

  // crea un url base64 per il documento
  createBase64ObjectUrl(base64: string, fileType: Filetype) {

    let base64Prefix = '';

    // Determina il prefisso in base al tipo di file
    if (fileType === FileTypeEnum.PDF) {
      base64Prefix = 'data:application/pdf;base64,';
    } else if (fileType === FileTypeEnum.DOCX) {
      base64Prefix = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,';
    }

    return base64Prefix + base64;
  }

  // scarica il documento come base64 da url
  fetchAsBase64(url: string, fileType: Filetype = FileTypeEnum.PDF) {

    // scarica il documento come blob
    this.http.get(url, {responseType: 'blob'}).subscribe(response => {

      // converte il blob in base64
      this.convertBlobToBase64(response).then((base64String: string) => {

        // crea un url base64 per il documento e lo visualizza
        if (fileType === FileTypeEnum.PDF) {

          // inizializza doc data con il documento pdf
          this.docData = this.createBase64ObjectUrl(base64String, this.filetypePdf) + '#toolbar=0';
        } else if (fileType === FileTypeEnum.DOCX) {

          // inizializza doc data con il documento docx
          this.docData = this.createBase64ObjectUrl(base64String, this.filetypeDocx);
        }

      });
    });


  }

  // converte un blob in base64
  convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        resolve(base64data.split(',')[1]);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

}
