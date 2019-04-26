import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, from } from 'rxjs';
import { timer, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session4',
  templateUrl: './session4.component.html',
  styleUrls: ['./session4.component.css']
})
export class Session4Component implements OnInit {

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
    "question": "Berdasarkan bentuknya,anyaman dibagi menjasi berapa ?",
    "a": { label: "Dua(2)", value: "A" },
    "b": { label: "Tiga(3)", value: "B" },
    "c": { label: "Empat(4)", value: "C" },
    "d": { label: "Lima(5)", value: "D" },
    "answer": "A"
  },
  {
    "id": 2,
    "question": "Anyaman adalah teknik membuat karya seni rupa yang dilakukan dengan ?",
    "a": { label: "Tusuk", value: "A" },
    "b": { label: "Gunting", value: "B" },
    "c": { label: "Menyilang", value: "C" },
    "d": { label: "Potong", value: "D" },
    "answer": "C"
  },
  {
    "id": 3,
    "question": "Anyaman datar (Sasak) dibuat dengan cara seperti apa ?",
    "a": { label: "Datar, pipih dan lebar  ", value: "A" },
    "b": { label: "Miring atau serong", value: "B" },
    "c": { label: "Persegi panjang", value: "C" },
    "d": { label: "Lebar dan kotak", value: "D" },
    "answer": "A"
  },
  {
    "id": 4,
    "question": "Anyaman yang dibuat datar, pipih, dan lebar. Jenis kerajinan ini banyak digunakan untuk tikar, dinding rumah tradisional, dan pembatas ruangan merupakan pengertian dari?",
    "a": { label: "Anyaman miring (Serong)", value: "A" },
    "b": { label: "Anyaman persegi (Truntum)", value: "B" },
    "c": { label: "Anyaman  rapat", value: "C" },
    "d": { label: "Anyaman datar", value: "D" },
    "answer": "D"
  },
  {
    "id": 5,
    "question": "Bahan apa aja yang bisa diolah menjadi anyaman yang berasal dari tumbuh-tumbuhan?",
    "a": { label: "Daun jati", value: "A" },
    "b": { label: "Lidi, rotan , akar dan pandan", value: "B" },
    "c": { label: "Origami", value: "C" },
    "d": { label: "Buku", value: "D" },
    "answer": "B"
  },
  {
    "id": 6,
    "question": "Bahan-bahan yang digunakan dalam membuat anyaman adalah ?",
    "a": { label: "Daun kelapa, bilah bambu", value: "A" },
    "b": { label: "Gunting dan Pisau", value: "B" },
    "c": { label: "Sendok dan garpu", value: "C" },
    "d": { label: "Sekop", value: "D" },
    "answer": "A"
  },
  {
    "id": 7,
    "question": "Berdasarkan teknik anyaman dibagi menjadi berapa ?",
    "a": { label: "Dua(2)", value: "A" },
    "b": { label: "Empat(4)", value: "B" },
    "c": { label: "Tiga(3)", value: "C" },
    "d": { label: "Sembilan(9)", value: "D" },
    "answer": "A"
  },
  {
    "id": 8,
    "question": "Alat yang digunakan untuk mengayam ?",
    "a": { label: "Tangan", value: "A" },
    "b": { label: "Piring", value: "B" },
    "c": { label: "Pisau pemotong, pisau penipis, dan catut bersungut bundar", value: "C" },
    "d": { label: "Sendok", value: "D" },
    "answer": "C"
  },
  {
    "id": 9,
    "question": "Jenis produk apa yang bisa diperkembangan oleh produk anyaman? ",
    "a": { label: "Anyaman serong ", value: "A" },
    "b": { label: "Anyan persegi", value: "B" },
    "c": { label: "Anyaman kotak", value: "C" },
    "d": { label: "Lampion", value: "D" },
    "answer": "D"
  },
  {
    "id": 10,
    "question": "Berdasarkan cara membuatnya dibagi menjadi?",
    "a": { label: "Dua(2)", value: "A" },
    "b": { label: "Empat(4)", value: "B" },
    "c": { label: "Tiga(3)", value: "C" },
    "d": { label: "Sembilan(9)", value: "D" },
    "answer": "C"
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
    this.router.navigateByUrl('/dashboard');
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
      // this.jawaban.push(val.target.value);
      this.toggle1 = false;
      for (let i = 0; i < this.jawaban.length; i++) {
        if (this.jawaban[i] == this.allQuestions[i].answer) {
          this.skor = this.skor + 1;
        }
      }
      let nilaiAkhir = this.skor.toString();
      localStorage.setItem("nilaiS4", nilaiAkhir);
      localStorage.setItem("pilihanS4", JSON.stringify(this.jawaban));
      Swal.fire({
        title: 'Jawaban Yang Benar Ada ' + this.skor,
        text: "",
        // type: 'warning',
        // showCancelButton: true,
        confirmButtonColor: '#3085d6',
        // cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        // cancelButtonText: 'Tidak'
      }).then((result) => {
        if (result.value) {
          // localStorage.removeItem("nilaiS1");
          // localStorage.removeItem("nilaiS2");
          // localStorage.removeItem("nilaiS3");
          // localStorage.removeItem("nilaiS4");
          // localStorage.removeItem("pilihanS1");
          // localStorage.removeItem("pilihanS2");
          // localStorage.removeItem("pilihanS3");
          // localStorage.removeItem("pilihanS4");
          this.router.navigateByUrl('/dashboard');
        }
        // else {
        //   this.router.navigateByUrl('/dashboard');
        // }
      })
      var x = localStorage.getItem("pilihanS1");
      if (x != null) {
        this.toggle3 = false;
      } else {
        this.toggle3 = true;
      }
      this.generateAnswer();
    }

  }

  generateAnswer() {
    var namaSiswa = localStorage.getItem("namaSiswa");
    var nilaiS1 = localStorage.getItem("nilaiS1");
    var nilaiS2 = localStorage.getItem("nilaiS2");
    var nilaiS3 = localStorage.getItem("nilaiS3");
    var nilaiS4 = localStorage.getItem("nilaiS4");
    var pilS1 = JSON.parse(localStorage.getItem("pilihanS1"));
    var pilS2 = JSON.parse(localStorage.getItem("pilihanS2"));
    var pilS3 = JSON.parse(localStorage.getItem("pilihanS3"));
    var pilS4 = JSON.parse(localStorage.getItem("pilihanS4"));
    var x: number = parseInt(nilaiS1) + parseInt(nilaiS2) + parseInt(nilaiS3) + parseInt(nilaiS4);
    var nilaiRata = x / 4;
    let dataTemp = {
      'namaSiswa': namaSiswa,
      'nilaiS1': nilaiS1,
      'nilaiS2': nilaiS2,
      'nilaiS3': nilaiS3,
      'nilaiS4': nilaiS4,
      'pilS1': pilS1,
      'pilS2': pilS2,
      'pilS3': pilS3,
      'pilS4': pilS4,
      'nilaiRata': nilaiRata
    }
    var rekapNilai = [];
    var dataLoad = JSON.parse(localStorage.getItem('rekapNilai'));
    console.log(dataLoad);
    if (dataLoad != null) {
      for (let i = 0; i < dataLoad.length; i++) {
        rekapNilai.push(dataLoad[i])
      }
    }
    rekapNilai.push(dataTemp);
    localStorage.setItem("rekapNilai", JSON.stringify(rekapNilai));
  }

}
