import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbCarouselConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
// import html2canvas from 'html2canvas'
import * as html2canvas from 'html2canvas';
// declare var jsPDF: any; 

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xls';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  disable1: boolean = false;
  disable2: boolean = false;
  closeResult: string;
  rekapNilai;
  constructor(
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    var loginStts = localStorage.getItem("loginStatus");
    var sttsSession = localStorage.getItem("sttsSession");
    if (loginStts == 'false') {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Anda Belum Login'
      })
      this.router.navigateByUrl('/dashboard');
    }
    if (sttsSession == 'true') {
      this.disable1 = false;
      this.disable2 = true;
    } else {
      this.disable1 = true;
      this.disable2 = false;
    }
  }

  startSession() {
    localStorage.setItem("sttsSession", "true");
    this.ngOnInit();
  }

  stopSession() {
    localStorage.setItem("sttsSession", "false");
    this.ngOnInit();
  }

  logout() {
    localStorage.setItem("loginStatus", "false");
  }

  home() {
    this.router.navigateByUrl('/dashboard');
  }

  modalRekap(content) {
    this.rekapNilai = JSON.parse(localStorage.getItem("rekapNilai"));
    console.log(this.rekapNilai);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  downloadPdf() {
    // window.html2canvas = html2canvas
    // let doc = new jsPDF();
    // doc.addHTML(this.rekapNilai, function () {
    //   doc.save("Daftar Nilai Siswa.pdf");
    // });

    // html2canvas(this.rekapNilai).then(function (canvas) {
    //   var doc = new jsPDF();
    //   doc.save('testCanvas.pdf');
    // });
    var codes = []
    for (let i = 0; i < this.rekapNilai.length; i++) {
      codes.push({
        nama: this.rekapNilai[i].namaSiswa,
        nilai1: this.rekapNilai[i].nilai1,
      })
    }

    var col = ["Nama Siswa", "Nilai"];
    // this.exportAsPdfFile("Data Nilai Siswa", col, codes, "Data Nilai Siswa");
    this.exportAsExcelFile(codes, 'Nilai');
  }

  public exportAsPdfFile(title: string, header: any, json: any, fileName: string): void {
    var rows = [];
    var doc = new jsPDF('landscape');
    for (var key in json) {
      var temp = json[key];
      var arr = Object.keys(temp).map(function (k) { return temp[k] });
      rows.push(arr);
    }

    doc.setFontSize(12);//doc.internal.pageSize.width/2
    doc.text(title, doc.internal.pageSize.width - 95, 20, 'center');
    //doc.text('Col and row span', 14, 20);
    //doc.text("Overflow 'linebreak'", 7, doc.autoTable.previous.finalY  + 10);
    /* doc.autoTable(col, rows, {
        startY: doc.autoTable.previous.finalY + 15,
        margin: {horizontal: 7},
        bodyStyles: {valign: 'top'},
        styles: {overflow: 'linebreak', columnWidth: 'wrap'},
        columnStyles: {text: {columnWidth: 'auto'}}
      }); */
    var options = {
      // tableWidth: 'wrap',
      // columnWidth: 'auto',
      // pageBreak : 'always'
      styles: {
        // overflow: 'linebreak',
        columnWidth: 'wrap',
        tableWidth: 'auto',
      },
      columnStyles: {
        1: { columnWidth: 'auto' }
      }
    };
    doc.autoTable(header, rows, options);
    doc.save(fileName + '_' + new Date().getTime() + '.pdf');
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  printNilai(): void {
    let printContents, popupWin;
    printContents = document.getElementById('listData') as HTMLElement;
    printContents = printContents.innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
			<html>
				<head>
					<title>Profile Sekolah - Tujuan</title>
					<style>
						@media print{
							@page {
								size: landscape
							}
						}
						th, td {
              border: 1px solid black;
              border-collapse: collapse;
              word-wrap:break-word;
              max-width:200px;
          }
          table {
              border: 1px solid black;
              border-collapse: collapse;
              table-layout: fixed;
          }
					</style>
				</head>
				<body onload="window.print();window.close()">${printContents}</body>
			 </html>`
    );
    popupWin.document.close();
  }


}
