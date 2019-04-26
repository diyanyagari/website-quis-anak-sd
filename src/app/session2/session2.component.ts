import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, from } from 'rxjs';
import { timer, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session2',
  templateUrl: './session2.component.html',
  styleUrls: ['./session2.component.css']
})
export class Session2Component implements OnInit {

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
    "question": "Berikut merupakan contoh alat  music daerah Indonesia, kecuali",
    "a": { label: "Tanjidor", value: "A" },
    "b": { label: "Gambang kromong", value: "B" },
    "c": { label: "Sampek", value: "C" },
    "d": { label: "Gitar", value: "D" },
    "answer": "D"
  },
  {
    "id": 2,
    "question": "Dibawah ini yang mana merupakan lagu daerah DKI Jakarta?",
    "a": { label: "Putri cening ayu", value: "A" },
    "b": { label: "Kicir-kicir", value: "B" },
    "c": { label: "Rek ayo rek", value: "C" },
    "d": { label: "Si patokaan", value: "D" },
    "answer": "B"
  },
  {
    "id": 3,
    "question": "Dibawah ini yang mana merupakan lagu daerah Aceh?",
    "a": { label: "Rek ayo rek", value: "A" },
    "b": { label: "Si patokaan", value: "B" },
    "c": { label: "Bungong jeumpa", value: "C" },
    "d": { label: "Kicir-kicir", value: "D" },
    "answer": "C"
  },
  {
    "id": 4,
    "question": "Manakah music tradisional yang berasal dari Sulawesi utara?",
    "a": { label: "Triton", value: "A" },
    "b": { label: "Sampek", value: "B" },
    "c": { label: "Arbab", value: "C" },
    "d": { label: "Kolintang", value: "D" },
    "answer": "D"
  },
  {
    "id": 5,
    "question": "Manakah dibawah ini yang merupakan alat music dari Kalimantan?",
    "a": { label: "Sampek", value: "A" },
    "b": { label: "Canang", value: "B" },
    "c": { label: "Seruling", value: "C" },
    "d": { label: "Triton", value: "D" },
    "answer": "A"
  },
  {
    "id": 6,
    "question": "Berikut beberapa hal yang harus diketahui oleh seorang penyanyi, kecuali",
    "a": { label: "Menguasai materi lagu", value: "A" },
    "b": { label: "Mengerti isi lagu", value: "B" },
    "c": { label: "Menghafal lirik lagu", value: "C" },
    "d": { label: "Menerapkan frasering dengan baik.", value: "D" },
    "answer": "C"
  },
  {
    "id": 7,
    "question": "Dibawah ini lagu yang menggunakan gaya marcato adalah",
    "a": { label: "Syukur", value: "A" },
    "b": { label: "Maju tak gentar", value: "B" },
    "c": { label: "Gugur bunga", value: "C" },
    "d": { label: "Himne guru", value: "D" },
    "answer": "B"
  },
  {
    "id": 8,
    "question": "Dibawah ini lagu yang menggunakan gaya legato adalah",
    "a": { label: "Syukur", value: "A" },
    "b": { label: "Maju tak gentar", value: "B" },
    "c": { label: "Garuda pancasila", value: "C" },
    "d": { label: "Indonesia raya", value: "D" },
    "answer": "A"
  },
  {
    "id": 9,
    "question": "Dibawah ini manakah teknik dalam vocal?",
    "a": { label: "Ekspresi", value: "A" },
    "b": { label: "Penjiwaan", value: "B" },
    "c": { label: "Suara yang merdu", value: "C" },
    "d": { label: "Lagu yang bagus", value: "D" },
    "answer": "A"
  },
  {
    "id": 10,
    "question": "Iringan sebuah lagu biasanya terdiri atas bagian-bagian berikut, kecuali",
    "a": { label: "Intro", value: "A" },
    "b": { label: "Lagu", value: "B" },
    "c": { label: "Interlude", value: "C" },
    "d": { label: "Reff", value: "D" },
    "answer": "D"
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
    this.router.navigateByUrl('/session3');
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
          this.router.navigateByUrl('/session3');
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
    localStorage.setItem("nilaiS2", nilaiAkhir);
    localStorage.setItem("pilihanS2", JSON.stringify(this.jawaban));
  }

}
