'use strict';

const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');
const app = dialogflow();

const Parameters = {
  firstNumber: 'firstNumber',
  secondNumber: 'secondNumber',
};

const LIST_FALLBACK = [
   'I didnt get that, can you repeat.',
   'Sorry what did you say?',
   'Maybe we should try this again later',
];

const LIST_HELP = [
   'This is an escape game that you can control the assistant.',
   'This is an escape game, I will go where you want.',
];



var lva = "x";
var name = "sir";

app.intent('add', conv => {
  const firstNumber = parseInt(conv.parameters[Parameters.firstNumber]);
  const secondNumber = parseInt(conv.parameters[Parameters.secondNumber]);

  conv.close(`answer` + (firstNumber + secondNumber));
  
});


app.intent('multiply', conv => {
  var answer = conv.parameters['answer'].toString().toLowerCase();
  
  
  var step = conv.data.step;
  conv.data.step = 1;
  
  if(step>1){
   conv.data.step = step; 
  }
  
   if (conv.user.last.seen && answer != 'sir' && conv.data.step == 1 && answer != 'help') {
    conv.ask('Welcome back ');
  }
  
  if(!(conv.data.fallback>=0)){
   conv.data.fallback = 0; 
  }
  
  
  
  game(conv,answer);
  
  //else if(conv.data.step != 0){
    //conv.ask(LIST_FALLBACK[Math.floor((Math.random() * 3) + 1)]);
  
  //}
  
});

function game(conv,answer){
  
  
  
  if(answer.includes("help")){
   conv.ask(LIST_HELP[Math.floor(Math.random() * 2)]); 
  }else if(conv.data.step === 1){
    answer.replace("my"," ");
    answer.replace("name"," ");
    answer.replace("is"," ");
    
    name = answer;

   	conv.ask(', ' + name + ', I am in a dark room and there is a door, should I break the door or search for key?');lva = answer;
    conv.data.step = 2;
    
  }else if(conv.data.step === 1 && answer === 'no'){
   	conv.ask('I need to open.');
    
  }else if(conv.data.step === 2 && answer.includes("break")){
    conv.ask('He heard me..... You died. ' + ',If you want to leave, simply say exit ' + name + ', I am in a dark room and there is a door, should I break the door or search for key?');lva = answer;
    conv.data.step = 2;
    
  }else if(conv.data.step === 2 && answer.includes("key")){
    conv.ask('I find the keys, I open the door, Now I see a kitchen, bathroom, stairs to second floor and exit door where should I go ?');lva = answer;
    conv.data.step = 3;
    //////
  }else if(conv.data.step === 3 && answer.includes("bathroom")){
    conv.ask('He is in the shower.  I need to hide. Where should I go ? To the kitchen, exit door or stairs?');lva = answer;
    conv.data.step = 3;
    
  }else if(conv.data.step === 3 && answer.includes("kitchen")){
    conv.ask('GDG written on the wall written with blood where should I go now? stairs, bathroom or exit door?');lva = answer;
    conv.data.step = 3;
    
  }else if(conv.data.step === 3 && answer.includes("stairs")){
    conv.ask('I am in the roof now ! I can see everywhere but it is too high. I can use the ladders to go to garden or I need to go back in');lva = answer;
    conv.data.step = 9;
    
  }else if(conv.data.step === 3 && (answer.includes("exit") || answer.includes("door"))){
    conv.ask('Door needs a password I cant open I need to go to another room or try a password what do you think?');lva = answer;
    conv.data.step = 4;
    ///////////
  }else if(conv.data.step === 4 && (answer.includes("try") || answer.includes("password"))){
    conv.ask('Okay what is the password?');lva = answer;
    conv.data.step = 5;
    
  }else if(conv.data.step === 4 && (answer.includes("room") || answer.includes("another"))){
    conv.ask('To the kitchen, stairs or bathroom?');lva = answer;
    conv.data.step = 3;
 
  }else if(conv.data.step === 5 && (answer.includes("gdg"))){
    conv.ask('Thanks ! We win');lva = answer;
    conv.data.step = 0;
    
  }else if(conv.data.step === 5){
    conv.ask('Wrong password, it needs 3 letter I think. Try again or go to another room?');lva = answer;
    conv.data.step = 4;
    
  }else if(conv.data.step === 6 && (answer.includes("stairs") || answer.includes("upstairs"))){
    conv.ask('Upstairs');lva = answer;
    conv.data.step = 8;
    
  }else if(conv.data.step === 6 && (answer.includes("try") || answer.includes("again"))){
    conv.ask('Okay what is the password?');lva = answer;
    conv.data.step = 5;
    
  }else if(conv.data.step === 9 && (answer.includes("garden") || answer.includes("use") || answer.includes("ladder"))){
    conv.ask('I am in the garden now. GDG written on table and There is a gun on the table, should I take it ? There is a dog sleeping be quick yes or no?');lva = answer;
    conv.data.step = 10;
    
  }else if(conv.data.step === 9 && (answer.includes("back") || answer.includes("in"))){
    conv.ask('Okay I am in, where should I go now? kitchen, stairs or bathroom');lva = answer;
    conv.data.step = 3;
    
  }else if(conv.data.step === 10 && (answer.includes("yes") || answer.includes("take"))){
    conv.ask('I take the gun, He is in the bathroom I can kill him or we can try password, what should I do? kill, kitchen, exit door for password.');lva = answer;
    conv.data.step = 3;
    
  }else if(conv.data.step === 10 && (answer.includes("no") || answer.includes("dont"))){
    conv.ask('Okay I am in again, Maybe I should go to exit door and try a password? where should I go, exit door, kitchen, bathroom, upstairs?');lva = answer;
    conv.data.step = 3;
  }else if(conv.data.step === 3 && answer.includes("kill")){
    conv.ask('Gun was fake, you died' + ',If you want to leave, simply say exit ' + name + ', I am in a dark room and there is a door, should I break the door or search for key?');lva = answer;
    conv.data.step = 2;
  }
  
  
  else{
   conv.ask(LIST_FALLBACK[conv.data.fallback]);
   conv.data.fallback = conv.data.fallback + 1;
   
   if(conv.data.fallback === 3){
     conv.data.fallback = 0; 
   }
  }
}

exports.helloWorld = functions.https.onRequest(app);
