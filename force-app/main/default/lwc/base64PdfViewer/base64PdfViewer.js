import { LightningElement, api } from 'lwc';
import { base64PdfContent } from 'c/data';

export default class Base64PdfViewer extends LightningElement {
    @api height = '500px';
    @api width = '100%';
  
    pdf = `data:application/pdf;base64,${base64PdfContent}`;
    fileName = 'sf-lwc-pdf-test.pdf';
  
    get pdfSrc() {
      return this.pdf;
    }
}