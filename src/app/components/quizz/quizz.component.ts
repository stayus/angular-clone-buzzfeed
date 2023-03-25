import { Component, OnInit } from '@angular/core';
import quizz_question from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answersSelected:string =""

  questionIndex:number = 0
  questionMaxIdex:number = 0

  finished:boolean = false

  constructor() { }

  ngOnInit(): void {
    if(quizz_question){
      this.finished = false
      this.title = quizz_question.title

      this.questions = quizz_question.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIdex = this.questions.length
    }
  }

  playerChoose(value:string) {
    this.answers.push(value)
    this.nextStap()
  }

  async nextStap() {
    this.questionIndex+=1

    if(this.questionMaxIdex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else{
      const finalAnswers:string = await this.checkResults(this.answers)
      this.finished = true
      this.answersSelected = quizz_question.results[finalAnswers as keyof typeof quizz_question.results]
      //verificar a opção ganhadora
    }
  }
  async checkResults(answers:string[]){
    const results = answers.reduce((previous, current, i, arr) =>{
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
        ){
        return previous
      } else {
        return current
      }
    })
    return results
  }

}

