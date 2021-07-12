import { Warehouse } from 'src/app/core/models/warehouse/warehouse.model';
import { Injectable } from '@angular/core';
import * as jsPdf from 'jspdf';
//import * as autoTable from 'jspdf-autotable'
import autoTable, { RowInput } from 'jspdf-autotable';
import { GetDtoCompanyBankAccount } from '../../models/company-bank-account/getDtoCompanyBankAccount';
import { Company } from '../../models/company.model';
import { InvoiceHead } from '../../models/invoice/invoice-head.model';
import { InvoiceLine } from '../../models/invoice/invoice-line.model';

@Injectable({
  providedIn: 'root',
})
export class SaleGoodsInvoiceService {
  imagePath: string = '/assets/img/Logo.png';

  constructor() {}

  saleInvoiceDownload(
    company: Company,
    warehouse: Warehouse,
    getDtoCompanyBankAccounts: GetDtoCompanyBankAccount[],
    invoiceHead: InvoiceHead,
    invoiceLines: InvoiceLine[]
  ) {
    function reverse(s: any) {
      return s.split('').reverse().join('');
    }

    let doc = new jsPdf.jsPDF('p', 'mm', 'a4');
    doc.setFontSize(12);
    if (company.imageUrl) {
      doc.addImage(company.imageUrl, 'PNG', 5, 13, 100, 20);
    }

    doc.text(company.name, 120, 10);
    doc.text(`NUI: ${company.uniqueIdentificationNumber}`, 120, 15);
    doc.text(`Nr. TVSH: ${company.vatNumber}`, 120, 20);
    doc.text(`Adres: ${warehouse.city}, ${warehouse.addressDetail}`, 120, 25);
    doc.text(warehouse.country, 120, 30);
    if (getDtoCompanyBankAccounts.length == 1) {
      doc.text(
        `${getDtoCompanyBankAccounts[0].bankName}: ${getDtoCompanyBankAccounts[0].accountNumber}`,
        120,
        35
      );
    } else if (getDtoCompanyBankAccounts.length > 1) {
      doc.text(
        `${getDtoCompanyBankAccounts[0].bankName}: ${getDtoCompanyBankAccounts[0].accountNumber}`,
        120,
        35
      );
      doc.text(
        `${getDtoCompanyBankAccounts[1].bankName}: ${getDtoCompanyBankAccounts[1].accountNumber}`,
        120,
        40
      );
    } else {
    }

    // doc.text(`Banka1: 15641654189564189846`, 120, 35);
    // doc.text(`Banka2: 23561561564156415641`, 120, 40);

    doc.setLineWidth(0.5);
    doc.line(10, 45, 195, 45);

    doc.text(invoiceHead.partnerName, 20, 60);
    doc.text(`NUI: ${invoiceHead.partnerUniqueIdentificationNumber}`, 20, 65);
    doc.text(`Nr. TVSH: ${invoiceHead.partnerVatNumber}`, 20, 70);
    doc.text(
      `Adres: ${invoiceHead.partnerCity}, ${invoiceHead.partnerAddress}`,
      20,
      75
    );
    doc.text(invoiceHead.partnerCountry, 20, 80);
    doc.text(
      `Data: ${invoiceHead.registerDate
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-')}`,
      100,
      65
    );
    doc.setFontSize(20);
    doc.setFont('times', 'bold');
    doc.text(`Fatura Nr:${invoiceHead.invoiceNumber}`, 100, 60);
    doc.text('Blerësi:', 20, 53);
    const data: any = [];
    const head = [
      [
        'Nr',
        //  'Bracode',
        'Emertimi',
        'Nj.',
        'Sasia',
        'Cmimi',
        'TVSH',
        'C.Tvsh',
        'Rab.%',
        'Vlera',
        'V.Tvsh',
      ],
    ];

    invoiceLines.forEach((x, i) => {
      data.push([
        i + 1,
        //    x.productBarcode,
        x.productName,
        x.unitOfMeasureShortName,
        x.quantity.toFixed(4),
        x.unitPrice.toFixed(4),
        x.unitPriceVatValue.toFixed(4),
        x.unitPriceWithVat.toFixed(4),
        x.discountRate.toFixed(4),
        x.amount.toFixed(4),
        x.amountWithVat.toFixed(2),
      ]);
    });

    autoTable(doc, {
      tableWidth: 190,
      columnStyles: {
        1: { cellWidth: 35 },
      },
      styles: {
        overflow: 'visible',
      },
      theme: 'grid',
      startY: 85,
      head: head,
      body: data,
    });

    // if (data.length > 20 && data.length < 26) {
    //   doc.addPage();
    //   console.log('20 ve 24 arasi');
    // } else if (data.length >= 26) {
    //   debugger;
    //   let rows = data.length - 25;
    //   let modNumber = 0;
    //   modNumber = rows % 34;
    //   if ((modNumber > 29 && modNumber < 34) || modNumber == 0) {
    //     doc.addPage();
    //   }
    // }
    if (data.length > 18 && data.length < 26) {
      doc.addPage();
      console.log('20 ve 24 arasi');
    } else if (data.length >= 26) {
      let rows = data.length - 25;
      let modNumber = 0;
      modNumber = rows % 32;
      if ((modNumber > 27 && modNumber < 34) || modNumber == 0) {
        doc.addPage();
      }
    }
    // let element = 1;
    // for (let index = 0; index < invoiceLines.length; index++) {
    //  element =  invoiceLines[index].amountWithVat*element
    // }

    doc.setLineWidth(1);
    doc.line(25, 280, 70, 280);
    doc.line(145, 280, 190, 280);

    doc.setProperties({
      title: `Fatura Nr: ${invoiceHead.invoiceNumber} ${invoiceHead.partnerName}`,
      keywords: 'Fatura',
      subject: `Fatura Nr: ${invoiceHead.invoiceNumber} ${invoiceHead.partnerName}`,
      creator: `${company.name}`,
    });

    let amount = [];
    let amountWithVat = [];
    let amountVatValue = [];

    for (let i = 0; i < 3; i++) {
      amount[i] = invoiceLines
        .filter((x) => x.vatId == i + 1)
        .reduce((sum, val) => (sum += val.amount), 0);
      amountVatValue[i] = invoiceLines
        .filter((x) => x.vatId == i + 1)
        .reduce((sum, val) => (sum += val.amountVatValue), 0);
      amountWithVat[i] = invoiceLines
        .filter((x) => x.vatId == i + 1)
        .reduce((sum, val) => (sum += val.amountWithVat), 0);
    }
    const vatValue = ['TVSH %0', 'TVSH %8', 'TVSH %18'];

    const totalHead = [['TVSH %', 'Vlera', 'TVSH', 'V.TVSH']];
    const totalBody = [];
    for (let i = 0; i < 3; i++) {
      totalBody[i] = [
        vatValue[i],
        amount[i].toFixed(4),
        amountVatValue[i].toFixed(4),
        amountWithVat[i].toFixed(2),
      ];
    }

    autoTable(doc, {
      tableWidth: 65,
      startY: 235,
      head: totalHead,
      body: totalBody,
      styles: {
        cellWidth: 20,
        overflow: 'visible',
      },
    });

    doc.autoPrint();
    doc.save(
      `Fatura Nr: ${invoiceHead.invoiceNumber} ${invoiceHead.partnerName}.pdf`
    );
  }
}
