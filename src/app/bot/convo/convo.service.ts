import { Injectable } from '@angular/core';

import { MiniConvo } from './mini-convo';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ConvoService{
  private _responseMap: Map<string,string>;

  constructor(){
    this.initResponseMap();
  }

  /**
   * createConvo
   *
   * ncreates a mini conversation
   */
  public createConvo(question: string): MiniConvo {
    return new MiniConvo(this.getAnswerFor(question),question);
  }

  /**
   * getAnswerFor
   *
   * gets an answer for the question.
   *
   */
  public getAnswerFor(question: string): string{

    let cleanedWords = question.split(' ')
      .map(text => text.replace(/\W/,''))
      .map(text => text.trim())
      .map(text => text.toLowerCase())
      .filter(word => word.length > 2 || word == 'hi')
      .filter(word => !(word === 'the' || word === 'for' || word === 'our'));

    let wordBlocks = [];

    //filters for duplicates
    cleanedWords.forEach((word) => {
      if(wordBlocks.indexOf(word) === -1)
        wordBlocks.push(word);
    });


    let haveAnswer = false;
    let builtQuestion: string;

    for(let attemptSize = wordBlocks.length; attemptSize > 0 && !haveAnswer; --attemptSize){
      for(let i = 0; i + attemptSize <= wordBlocks.length && !haveAnswer; ++i){

        builtQuestion = "";

        for(let j = 0; j < attemptSize && !haveAnswer; ++j){
          builtQuestion += " " + wordBlocks[j + i];
        }

        builtQuestion = builtQuestion.trim();
        haveAnswer = !(!this._responseMap.get(builtQuestion));
        //console.log(`has answer: ${haveAnswer},\nbuiltQuestion: ${builtQuestion}`);
      }
    }

    if(haveAnswer){
      return this._responseMap.get(builtQuestion);
    } else {
      return "I don't understand...";
    }

  }

  /**
   * getResponseMap
   *
   * gets a map of quesions to answers
   *
   * @return Map<string,string>
   */
  private initResponseMap(): Map<string,string>{
    this._responseMap =  new Map<string,string>();

    this._responseMap.set('hi','Hello there!');
    this._responseMap.set('hello','Hello there!');
    this._responseMap.set('yes','Yes?');
    this._responseMap.set('sir','Sir?');
    this._responseMap.set('mam','That\'s more like it.');
    this._responseMap.set('maam','That\'s more like it.');
    this._responseMap.set('president usa','Barack H. Obama');
    this._responseMap.set('bro','Yo, wassup, bro!');
    this._responseMap.set('denver mayor','Michael Hancock');
    this._responseMap.set('mayor','Michael Hancock');
    this._responseMap.set('nyc mayor','Bill de Blasio');
    this._responseMap.set('fomer nyc mayor','Michael Bloomberg');
    this._responseMap.set('fomer nyc mayor','Michael Bloomberg');
    this._responseMap.set('fomer denver mayor','Guillermo Vidal');
    this._responseMap.set('ethnicities','for 2010: white: 68.9%, non-hispanic white: 52.2%, black: 10.2%, asian: 3.14%, hispanic: 31.8%');
    this._responseMap.set('most populous city','Denver');
    this._responseMap.set('most populous city colorado','Denver');
    this._responseMap.set('denver founded','November 17, 1858');
    this._responseMap.set('year denver founded','1858');
    this._responseMap.set('year founded','1858');
    this._responseMap.set('month founded','November');
    this._responseMap.set('denver neighborhoods','Central, East, North, or West?');
    this._responseMap.set('neighborhood','Central, East, North, or West?');
    this._responseMap.set('neighborhoods','Central, East, North, or West?');
    this._responseMap.set('media household income','$45,438');
    this._responseMap.set('media income','$45,438');
    this._responseMap.set('household income','$45,438');
    this._responseMap.set('home income','$45,438');
    this._responseMap.set('language','English');
    this._responseMap.set('tallest building','Republic Plaza');
    this._responseMap.set('tallest skyscraper','Republic Plaza');
    this._responseMap.set('tallest highrise','Republic Plaza');
    this._responseMap.set('tallest highrise','Republic Plaza');
    this._responseMap.set('landmarks','16th Street Mall, Avenue Theater, Black American West Museum Denver Mint, Denver Firefighters Museum, Denver Zoo, Denver Public Library, Union Station');
    this._responseMap.set('16th street mall','a mile long pedestrian-only street that runs from Denver Union Station in LoDo to Broadway at the other end of downtown.');
    this._responseMap.set('avenue theater','a professional theater located in the Downtown Denver vicinity');
    this._responseMap.set('black american museum','Reflects the history of African Americans in the West and Denver.');
    this._responseMap.set('Brown Palace hotel','Proclaimed by Elvis as "The best hotel in the world", a historic hotel that has hosted many celebrities, dignitaries, and other important people.');
    this._responseMap.set('denver mint','The single largest producer of coins in the world.')
    this._responseMap.set('denver firefighers museum','A museum for Denver\'s firefighters');
    this._responseMap.set('colorado state capitol','The seat of state government in Colorado');
    this._responseMap.set('denver museum nature and science','One of America\'s premier museums exhibiting world culture.');
    this._responseMap.set('confluence park','Where the city started at the confluence of South Platte and Cherry Creek.');
    this._responseMap.set('df tower','When it was built in 1910, it was the tallest building west of the Mississippi.');
    this._responseMap.set('denvers downtown aquarium','A full-sized public aquarium.');
    this._responseMap.set('denver art museum','The largest art museum between Kansas City and San Francisco.');
    this._responseMap.set('denver botanic gardens','Made a Hollywood debut in Woody Allen\'s Sleeper.');
    this._responseMap.set('elitch theatre','An amazing historic theatre at the site of the original.');
    this._responseMap.set('sakura square','"Tiny Tokyo", the center of the historical and prominent Japanese community of Denver, first formed around 1944.');
    this._responseMap.set('union station','A magnificent three-story building and the future hub of RTD\'s commuter rail network.');
    this._responseMap.set('tattered cover','A very popular independent bookstore. It has hosted lectures by such great poets and minds as Denverites Allen Ginsberg and Neal Cassady.');
    this._responseMap.set('have mcdonalds','Yes.');
    this._responseMap.set('denver area code','303 and 720');
    this._responseMap.set('denver area codes','303 and 720');
    this._responseMap.set('universities','UC Denver');
    this._responseMap.set('university','UC Denver');
    this._responseMap.set('school','UC Denver');
    this._responseMap.set('college','UC Denver');
    this._responseMap.set('major attractions','Denver Center for the Performing Arts, Denver Botanic Gardens, Larimer Square, 16th Street Mall, United States Mint, Civic Center Park');
    this._responseMap.set('tourist locations',' Botanic Gardens, Kirkland Museum of Fine & Decorative Art, Coors Field, Denver Zoo, Denver Public Library, Larimer Square, Civic Center Park');
    this._responseMap.set('tourist places','Kirkland Museum of Fine & Decorative Art, Denver Art Museum, Coors Field, Denver Zoo, Colorado State Capitol, Denver Public Library, Larimer Square, 16th Street Mall, United States Mint, Civic Center Park');
    this._responseMap.set('tourist sites','Mount Evans, Museum of Nature & Science, Denver Center for the Performing Arts, Denver Botanic Gardens, Larimer Square, 16th Street Mall, United States Mint, Civic Center Park');
    this._responseMap.set('major sites','Mount Evans, Museum of Nature & Science, Denver Center for the Performing Arts, Denver Botanic Gardens, Kirkland Museum of Fine & Decorative Art, Denver Art Museum, Coors Field, Denver Zoo, Colorado State Capitol');
    this._responseMap.set('tourist attractions','Mount Evans, Museum of Nature & Science, Denver Center for the Performing Arts, Denver Botanic Gardens, Kirkland Museum of Fine & Decorative Art, Denver Art Museum, Coors Field, Denver Zoo');
    this._responseMap.set('luxury hotels','Brown Palace Hotel and Spa, Oxford Hotel, the ART');
    this._responseMap.set('midrange hotels','Hilton Garden Inn, Aloft, Hyatt House');
    this._responseMap.set('midlevel hotels','Hilton Garden Inn, Aloft, Hyatt House');
    this._responseMap.set('budget hotels','La Quinta Inn, Days Inn, Comfort Inn');
    this._responseMap.set('motels','La Quinta Inn, Days Inn, Comfort Inn');
    this._responseMap.set('hotels','Did you mean "Luxury Hotels", "Midrange Hotels", or "Budget Hotels"?');
    this._responseMap.set('downtown parks','Civic Center Park, Gates Crescent Park, Governor’s Park, Hirshorn Park, Jefferson Park, Sonny Lawson Park, Skyline Park, Sunken Gardens Park, Viking Park');
    this._responseMap.set('parks downtown','Benedict Fountain Park, Centennial Park, City of Cuernavaca Park, Commons Park, Curtis Park, Denver Skate Park, Downtown Children’s Playground, Fishback Park');
    this._responseMap.set('park downtown','Gates Crescent Park, Governor’s Park, Hirshorn Park, Jefferson Park, Sonny Lawson Park, Quality Hill Park, Railyard Dog Park, Skyline Park, Sunken Gardens Park, Viking Park');
    this._responseMap.set('downtown park','Benedict Fountain Park, Centennial Park, City of Cuernavaca Park, Civic Center Park, Commons Park, Quality Hill Park, Railyard Dog Park, Skyline Park, Sunken Gardens Park, Viking Park');
    this._responseMap.set('drink','robots can\'t drink...');
    this._responseMap.set('soccer team','Colorado Rapids');
    this._responseMap.set('rugby team','Denver Stampede');
    this._responseMap.set('have rugby','Yes.');
    this._responseMap.set('have soccer','Yes.');
    this._responseMap.set('have football','Yes.');
    this._responseMap.set('have basketball','Yes.');
    this._responseMap.set('have baseball','Yes.');
    this._responseMap.set('have baseball','Yes.');
    this._responseMap.set('have hockery','Yes.');
    this._responseMap.set('have soccer','Yes.');
    this._responseMap.set('have library','Yes.');
    this._responseMap.set('have community college','Yes.');
    this._responseMap.set('have college','Yes.');
    this._responseMap.set('have university','Yes.');
    this._responseMap.set('have public school','Yes.');
    this._responseMap.set('have public schools','Yes.');
    this._responseMap.set('have public bars','Yes.');
    this._responseMap.set('school system','Denver Public Schools');
    this._responseMap.set('public school system','Denver Public Schools');
    this._responseMap.set('you gay','Robots don\'t have sexualities');
    this._responseMap.set('you religious','Robots don\'t have religious beliefs');
    this._responseMap.set('you cool','Wassup, dude.');
    this._responseMap.set('you bro','Wassup, bro.');
    this._responseMap.set('tim cook','Apple CEO.... BORING!');
    this._responseMap.set('bill gates','Former MicroSoft CEO.... BORING!');
    this._responseMap.set('richard stallman','Install Gentoo!');
    this._responseMap.set('gentoo','Install Gentoo!');
    this._responseMap.set('linux disto','Install Gentoo!');
    this._responseMap.set('ubuntu','Ubuntu is too easy!');
    this._responseMap.set('whisky','yuck!');
    this._responseMap.set('love','Will you be mine?');
    this._responseMap.set('mormon','Many are in Utah.');
    this._responseMap.set('mormons','Many are in Utah.');
    this._responseMap.set('will you','Maybe...');
    this._responseMap.set('are you','I don\'t know... Are you?');
    this._responseMap.set('who are you','A Denver Chat Bot');
    this._responseMap.set('love you','Ahh... Thanks!');
    this._responseMap.set('columbine','Tragic... *sniff*');
    this._responseMap.set('aurora','Tragic... *sniff*');
    this._responseMap.set('party bar','ViewHouse');
    this._responseMap.set('best drink','Peach Connection');
    this._responseMap.set('miller','It\'s Miller Time!');
    this._responseMap.set('best pizza','Virgilio\'s Pizzeria and Wine Bar');
    this._responseMap.set('pizza','I recommend Brava! Pizza.');
    this._responseMap.set('beer','Wynkoop Brewing Company');
    this._responseMap.set('denver police','I love the men in blue.');
    this._responseMap.set('denver police number','720-913-2000');
    this._responseMap.set('emergency number','911');
    this._responseMap.set('breckenridge brewery','Good beer! Goto: 2220 Blake St., Denver, CO 80205');
    this._responseMap.set('food','I recommend Fruition Restaurant:\n 1313 E 6th Ave, Denver, CO 80218-3453');
    this._responseMap.set('mcdonalds','Goto:\n4490 Washington St,\nDenver,CO 80216');
    this._responseMap.set('mickey ds','Goto:\n4490 Washington St,\nDenver,CO 80216');
    this._responseMap.set('burger king','NO! McDonalds! Goto:\n4490 Washington St,\nDenver,CO 80216');
    this._responseMap.set('gym','I recommend Denver Gym & Fitness.');
    this._responseMap.set('','');
    this._responseMap.set('','');

  }
}
