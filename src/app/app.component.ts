import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalDirective } from '../../node_modules/ngx-bootstrap';
import { QuestionClass } from './question-class';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';





@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	isQuestionCardShow: boolean = false;
	totalAnswered: number = 0;
	rightAnswer: number;
	questionObj = new QuestionClass();
	@ViewChild('submitModal') submitModal: ModalDirective;
	@ViewChild('addQuestionModal') addQuestionModal: ModalDirective;
	@ViewChild('answerModal') answerModal: ModalDirective;
	@ViewChild('questionForm') questionForm: any;
	@ViewChild('questionTest') questionTest: any;

	constructor(private toastr: ToastrService, private router: Router) { }

	answerArray = [];

	allQuestions: any = [{
		"id": 1,
		"question": "Apa saja unsur yang ada pada karya seni tari, kecuali ?",
		"a": "Raga",
		"b": "Irama",
		"c": "Dinamika",
		"d": "Rasa",
		"answer": "c"
	},
	{
		"id": 2,
		"question": "Manakah seni tari yang berasal dari daerah Flores?",
		"a": "Tari Jaran Kepang",
		"b": "Tari Bedhayana",
		"c": "Tari Ana Ule",
		"d": "Tari Geol Saliter",
		"answer": "b"
	},
	{
		"id": 3,
		"question": "Tari srimpi termasuk kedalam tari?",
		"a": "Tari Rakyat",
		"b": "Tari Kreasi Baru",
		"c": "Tari Keagamaan",
		"d": "Tari Klasik",
		"answer": "b"
	}
	];

	/**Method call on submit the test */
	submitTest() {
		this.rightAnswer = 0;
		this.totalAnswered = 0;
		for (let i = 0; i < this.allQuestions.length; i++) {
			if ("selected" in this.allQuestions[i] && (this.allQuestions[i]["selected"] != null)) {
				this.totalAnswered++;
				if (this.allQuestions[i]["selected"] == this.allQuestions[i]["answer"]) {
					this.rightAnswer++;
				}
			}

		}
		this.submitModal.show();

	}

	startQuiz() {
		for (let i = 0; i < this.allQuestions.length; i++) {
			if ("selected" in this.allQuestions[i]) {
				delete this.allQuestions[i]["selected"];
			}

		}
		this.questionTest.reset();
		this.isQuestionCardShow = true;

	}
	HomePage() {
		this.isQuestionCardShow = false;
	}
	addQuestion() {
		this.addQuestionModal.show();
	}
	submitAddQuestion() {
		let quesTemp = JSON.parse(JSON.stringify(this.questionObj));
		quesTemp["id"] = this.allQuestions.length + 1;
		this.allQuestions.push(quesTemp);
		this.questionForm.reset();
		this.toastr.success("Question Added Successfully!!");
		this.addQuestionModal.hide();

	}
	checkAnswers() {
		this.submitModal.hide();
		this.answerModal.show();
	}

	ngOnInit() {



	}

	toSession1() {
		this.router.navigateByUrl('/session1');
	}

}
