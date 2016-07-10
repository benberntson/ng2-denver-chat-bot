import { Component,
         Input,
         trigger,
         state,
         style,
         transition,
         animate } from '@angular/core';


import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
  selector: 'bot',
  styleUrls:['bot.styles.css'],
  templateUrl: 'bot.template.html',
  directives: [ROUTER_DIRECTIVES]
})

export class Bot {
  botAvatar = "../assets/img/happy-robot.png";

  constructor(){}

}
