import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MiniConvo } from './mini-convo';
import { ConvoService } from './convo.service.ts';


@Component({
  selector: 'convo',
  templateUrl: 'convo.template.html',
  styleUrls: ['convo.styles.css']
})

export class Convo{
  questionToBeAsked: string;
  tempAnswer: string;
  conversation: MiniConvo[];

  constructor(
    public convoService: ConvoService,
    public router: Router
  ) {  }

  onClear(){
    if(this.questionToBeAsked === undefined){
      this.router.navigate(['/bot']);
    }
    else if(this.questionToBeAsked !== ""){
      this.questionToBeAsked = "";
    }
    //check to see if there are any elements in the conversation
    else if(this.conversation && this.conversation.length){
      //pop if there are
      console.log('popping convo');
      this.conversation.pop();
    }
    else{
      this.router.navigate(['/bot']);
    }//end else
  }

  onEnterKey($event){
    $event.stopPropagation();
    //checks to see if the Enter key was hit
    if($event.keyCode == 13){
      //run ask question if it is 13
      this.askQuestion();
    }
  }

  askQuestion(){
    if(typeof this.questionToBeAsked === 'undefined'){ return; }

    let question = this.questionToBeAsked.trim();
    if(question.length < 1){ return; }

    let excerpt = this.convoService.createConvo(this.questionToBeAsked);
    this.conversation = this.conversation || [];
    this.conversation.push(excerpt);

    this.questionToBeAsked = "";
  }
}
