import { Component, OnInit, } from '@angular/core';
import { NgbCarouselConfig, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, from } from 'rxjs';
import { timer, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session1',
  templateUrl: './session1.component.html',
  styleUrls: ['./session1.component.css'],
  providers: [NgbCarouselConfig]
})
export class Session1Component implements OnInit {

  idQues;
  pgBar;
  skor: number = 0;
  jawaban = [];
  nilaiSession1: any;

  toggle1: Boolean = false;
  toggle2: Boolean = false;
  loadingBar = 0;
  toggle3: Boolean = false;

  allQuestions: any = [{
    "id": 1,
    "question": "Motif batik apa yang memiliki banyak simbol dan terdapat pembatasan dalam corak ?",
    "a": { label: "Modern", value: "A" },
    "b": { label: "Klasik", value: "B" },
    "c": { label: "Corak", value: "C" },
    "d": { label: "Desain", value: "D" },
    "answer": "B"
  },
  {
    "id": 2,
    "question": "Termasuk jenis motif batik apakah gambar di bawah ini?",
    "a": { label: "Bebas atau mandiri", value: "A" },
    "b": { label: "Terbatas", value: "B" },
    "c": { label: "Sederhana", value: "C" },
    "d": { label: "Klasik", value: "D" },
    "answer": "A"
  },
  {
    "id": 3,
    "question": "Alat untuk membatik yang terbuat dari tembaga ringan dan berbentuk seperti teko kecil dengan corong diujungnya adalah?",
    "a": { label: "Cup", value: "A" },
    "b": { label: "Centong", value: "B" },
    "c": { label: "Canting", value: "C" },
    "d": { label: "Teko", value: "D" },
    "answer": "C"
  },
  {
    "id": 4,
    "question": "Apa nama cairan yang digunakan untuk membatik dengan menggunakan teknik canting tulis?",
    "a": { label: "Tinta Batik", value: "A" },
    "b": { label: "Cat Air", value: "B" },
    "c": { label: "Tinta Lukis", value: "C" },
    "d": { label: "Cairan Malam", value: "D" },
    "answer": "D"
  },
  {
    "id": 5,
    "question": "Pembuatan motif pada kain dengan cara mengikat sebagian kain kemudian dicelupkan dalam larutan pewarna merupakan teknik?",
    "a": { label: "Teknik Printing", value: "A" },
    "b": { label: "Teknik Celup Ikat", value: "B" },
    "c": { label: "Teknik Celup Warna", value: "C" },
    "d": { label: "Teknik Batik Celup", value: "D" },
    "answer": "B"
  },
  {
    "id": 6,
    "question": "Apa nama alat yang berbentuk kepingan logam atau pelat berisi gambar yang agak menonjol dan digunakan oleh orang yang membatik menggunakan teknik printing?",
    "a": { label: "Canting print", value: "A" },
    "b": { label: "Cantinig Cap", value: "B" },
    "c": { label: "Canting Malam", value: "C" },
    "d": { label: "Canting Gambar", value: "D" },
    "answer": "B"
  },
  {
    "id": 7,
    "question": "Gambar di bawah ini adalah gambar orang yang sedang membatik dengan menggunakan teknik?",
    "a": { label: "Teknik Colet", value: "A" },
    "b": { label: "Teknik Batik Tulis", value: "B" },
    "c": { label: "Teknik Klise", value: "C" },
    "d": { label: "Teknik Printing", value: "D" },
    "answer": "A"
  },
  {
    "id": 8,
    "question": "Apa motif yang dihasilkan dengan teknik colet?",
    "a": { label: "Klise", value: "A" },
    "b": { label: "Tidak Klise", value: "B" },
    "c": { label: "Abstrak", value: "C" },
    "d": { label: "Gambar Colet", value: "D" },
    "answer": "A"
  },
  {
    "id": 9,
    "question": "Dari keempat teknik membatik, teknik apa yang dapat menghasilkan kain batik yang lebih banyak dalam waktu yang singkat?",
    "a": { label: "Teknik Canting Tulis", value: "A" },
    "b": { label: "Teknik Celup Ikat", value: "B" },
    "c": { label: "Teknik Printing", value: "C" },
    "d": { label: "Teknik Colet", value: "D" },
    "answer": "C"
  },
  {
    "id": 10,
    "question": "Nama lain dari teknik colet adalah?",
    "a": { label: "Teknik Pengecatan", value: "A" },
    "b": { label: "Teknik Lukis", value: "B" },
    "c": { label: "Teknik Penawaran", value: "C" },
    "d": { label: "Teknik Pengolesan", value: "D" },
    "answer": "B"
  }
  ];

  constructor(config: NgbCarouselConfig, private progressConfig: NgbProgressbarConfig, private router: Router) {
    config.interval = 2000;
  }
  ngOnInit() {
    var sttsSession = localStorage.getItem("sttsSession");
    if (sttsSession == 'false') {
      this.router.navigateByUrl('/dashboard');
    }
    // if (this.allQuestions.a == 'image') {
    //   var element = document.getElementsByClassName('btn-choose') as HTMLCollectionOf<HTMLElement>
    //   for (var i = 0; i < element.length; i++) {
    //     element[i].appendChild(document.createElement("img"))
    //   }
    // }
    this.toggle1 = false
    this.toggle3 = true
    this.idQues = 0;
    this.progressConfig.animated = true;
    // this.progressConfig.max = 30;
  }

  startSession1() {
    this.toggle1 = true;
    this.progressBar1();
  }

  nextSession() {
    this.router.navigateByUrl('/session2');
  }

  progressBar1() {
    const source = timer(0, 10000);
    const waktuProgress = source.pipe(switchMap(() => interval(100)));
    this.pgBar = waktuProgress.subscribe(val => {
      // console.log(val);
      this.loadingBar = val - 10;
      if (val == 98 && this.idQues < 9) {
        this.idQues = this.idQues + 1;
        this.jawaban.push(" ");
        // console.log(this.idQues)
      }
      if (val == 98 && this.idQues == 9) {
        this.pgBar.unsubscribe();
        this.loadingBar = 98;
      }

    });
    // const subscribe = example.subscribe(val1 => {
    //   this.loadingBar = val1;
    //   console.log(val1);
    // }
    // );
  }

  pilihJawaban(val) {
    console.log(val.target.value)
    if (this.idQues < 10) {
      this.jawaban.push(val.target.value)
    }
    if (this.idQues < 9) {

      setTimeout(this.idQues = this.idQues + 1, 5000);
    }
    if (this.idQues == 9) {
      console.log(this.jawaban)
    }
    this.pgBar.unsubscribe();
    this.progressBar1();
    console.log(this.idQues)

    if (this.jawaban.length == 10) {
      this.toggle1 = false;
      for (let i = 0; i < this.jawaban.length; i++) {
        if (this.jawaban[i] == this.allQuestions[i].answer) {
          this.skor = this.skor + 1;
        }
      }
      Swal.fire({
        title: 'Jawaban Yang Benar Ada ' + this.skor,
        text: "Silahkan lanjut ke sesi berikutnya",
        // type: 'warning',
        // showCancelButton: true,
        confirmButtonColor: '#3085d6',
        // cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        // cancelButtonText: 'Tidak'
      }).then((result) => {
        if (result.value) {
          this.router.navigateByUrl('/session2');
        }
      })
      var x = localStorage.getItem("pilihanS1");
      if (x != null) {
        this.toggle3 = false;
      } else {
        this.toggle3 = true;
      }
    }
    let nilaiAkhir = this.skor.toString();
    localStorage.setItem("nilaiS1", nilaiAkhir);
    localStorage.setItem("pilihanS1", JSON.stringify(this.jawaban));
  }


}
