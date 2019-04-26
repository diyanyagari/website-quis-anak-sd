import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, from } from 'rxjs';
import { timer, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session3',
  templateUrl: './session3.component.html',
  styleUrls: ['./session3.component.css'],
  providers: [NgbCarouselConfig]
})
export class Session3Component implements OnInit {

  idQues;
  pgBar;
  skor: number = 0;
  jawaban = [];

  toggle1: Boolean = false;
  toggle2: Boolean = false;
  loadingBar = 0;
  toggle3: Boolean = false;

  allQuestions: any = [{
    "id": 1,
    "question": "Apa saja unsur yang ada pada karya seni tari, kecuali ?",
    "a": { label: "Raga", value: "A" },
    "b": { label: "Irama", value: "B" },
    "c": { label: "Dinamika", value: "C" },
    "d": { label: "Rasa", value: "D" },
    "answer": "C"
  },
  {
    "id": 2,
    "question": "Dibawah ini merupakan pola garis lurus melingkar adalah?",
    "a": { label: "Segi Enam", value: "A" },
    "b": { label: "Bulan Sabit", value: "B" },
    "c": { label: "Zig-zag", value: "C" },
    "d": { label: "Gerakan Horizontal", value: "D" },
    "answer": "C"
  },
  {
    "id": 3,
    "question": "Manakah seni tari yang berasal dari daerah Flores?",
    "a": { label: "Tari Jaran Kepang", value: "A" },
    "b": { label: "Tari Bedhayana", value: "B" },
    "c": { label: "Tari Ana Ule", value: "C" },
    "d": { label: "Tari Geol Saliter", value: "D" },
    "answer": "C"
  },
  {
    "id": 4,
    "question": "Tari srimpi termasuk kedalam tari?",
    "a": { label: "Tari Rakyat", value: "A" },
    "b": { label: "Tari Kreasi Baru", value: "B" },
    "c": { label: "Tari Keagamaan", value: "C" },
    "d": { label: "Tari Klasik", value: "D" },
    "answer": "D"
  },
  {
    "id": 5,
    "question": "Kesan apa yang timbul saat membuat pola lantai garis lengkung?",
    "a": { label: "Lembut tapi lemah", value: "A" },
    "b": { label: "Lembut tapi kuat", value: "B" },
    "c": { label: "Sederhana tapi lemah", value: "C" },
    "d": { label: "Sederhana tapi kuat", value: "D" },
    "answer": "A"
  },
  {
    "id": 6,
    "question": "Yang bukan termasuk jenis tarian bedasarkan koreografi tarian di Indonesia adalah?",
    "a": { label: "Tari Rakyat", value: "A" },
    "b": { label: "Tari Keagamaan", value: "B" },
    "c": { label: "Tari Kreasi Baru", value: "C" },
    "d": { label: "Tari Klasik", value: "D" },
    "answer": "B"
  },
  {
    "id": 7,
    "question": "Garis-garis di lantai yang dilalui oleh seorang penari pada saat melakukan gerak tari disebut?",
    "a": { label: "Pola Lantai", value: "A" },
    "b": { label: "Kesesuaian Menari", value: "B" },
    "c": { label: "Keindahan Tarian", value: "C" },
    "d": { label: "Pengertian Seni Tari", value: "D" },
    "answer": "A"
  },
  {
    "id": 8,
    "question": "Tari ajar merupakan tari yang menceritakan tentang?",
    "a": { label: "Keindahan Alam", value: "A" },
    "b": { label: "Pelajar yang sedang belajar", value: "B" },
    "c": { label: "Ajakan bermain", value: "C" },
    "d": { label: "Persahabatan", value: "D" },
    "answer": "B"
  },
  {
    "id": 9,
    "question": "Kesan apa yang timbul saat membuat pola lantai garis lurus?",
    "a": { label: "Lembut tapi lemah", value: "A" },
    "b": { label: "Lembut tapi kuat", value: "B" },
    "c": { label: "Sederhana tapi lemah", value: "C" },
    "d": { label: "Sederhana tapi kuat", value: "D" },
    "answer": "D"
  },
  {
    "id": 10,
    "question": "Tari Jaran Kepang merupakan tarian yang berasal dari daerah?",
    "a": { label: "Jawa Barat", value: "A" },
    "b": { label: "Jawa Tengah", value: "B" },
    "c": { label: "Jawa Timur", value: "C" },
    "d": { label: "Sumatera", value: "D" },
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
    this.toggle3 = true;
    this.idQues = 0;
    this.progressConfig.animated = true;
    // this.progressConfig.max = 30;
  }

  startSession1() {
    this.toggle1 = true;
    this.progressBar1();
  }

  nextSession() {
    this.router.navigateByUrl('/session4');
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
          this.router.navigateByUrl('/session4');
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
    localStorage.setItem("nilaiS3", nilaiAkhir);
    localStorage.setItem("pilihanS3", JSON.stringify(this.jawaban));
  }

}
