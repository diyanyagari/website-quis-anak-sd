import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [NgbCarouselConfig]
})
export class DashboardComponent implements OnInit {

  closeResult: string;
  loginForm: FormGroup;
  sttsSession: boolean = false;
  titleHeader = "Login Guru";
  sttsLogin;
  namaSiswa: any;

  constructor(private router: Router,
    private config: NgbCarouselConfig,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) {
    config.interval = 2000;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
  }
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  ngOnInit() {
    localStorage.removeItem("namaSiswa");
    localStorage.removeItem("nilaiS1");
    localStorage.removeItem("nilaiS2");
    localStorage.removeItem("nilaiS3");
    localStorage.removeItem("nilaiS4");
    localStorage.removeItem("pilihanS1");
    localStorage.removeItem("pilihanS2");
    localStorage.removeItem("pilihanS3");
    localStorage.removeItem("pilihanS4");
    if (localStorage.getItem("loginStatus") == null) {
      localStorage.setItem("loginStatus", "false");
    }
    this.router.navigateByUrl('/dashboard');
    this.sttsLogin = localStorage.getItem("loginStatus");
    // if (this.sttsLogin == 'true') {
    //   // this.router.navigateByUrl('/admin');
    //   this.titleHeader = "Monitoring";
    // }
    var sttsSession = localStorage.getItem("sttsSession");
    if (sttsSession == 'false' || sttsSession == null) {
      this.sttsSession = false;
    } else {
      this.sttsSession = true;
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  toSession1() {
    this.router.navigateByUrl('/session1');
  }

  toSession2() {
    this.router.navigateByUrl('/session2');
  }

  toSession3() {
    this.router.navigateByUrl('/session3');
  }

  toSession4() {
    this.router.navigateByUrl('/session4');
  }

  open(content) {
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

  toAdmin() {
    this.router.navigateByUrl('/admin');
  }

  onSubmit() {
    console.log(this.loginForm.value)
    if ((this.loginForm.get('username').value == 'guru') && (this.loginForm.get('password').value == 'guru123')) {
      localStorage.setItem("loginStatus", "true");
      this.router.navigateByUrl('/admin');
    } else {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Username atau Password Salah'
      })
      this.ngOnInit();
    }
    // this.submitted = true;

    // // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // }

    // this.loading = true;
    // this.authenticationService.login(this.f.username.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //       this.alertService.error(error);
    //       this.loading = false;
    //     });
  }

  mulaiSession() {
    let namaSiswa = document.getElementById('namaSiswa') as HTMLInputElement;
    console.log(namaSiswa.value);
    localStorage.setItem("namaSiswa", namaSiswa.value);
    this.modalService.dismissAll();
    this.router.navigateByUrl('/session1');
  }

}
