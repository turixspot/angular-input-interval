{

  function ms(timeunit) {
     switch(timeunit) {
      case "s":
       return 1000;
      case "m":
       return 1000 * 60;
      case "h":
       return 1000 * 60 * 60;
      case "d":
       return 1000 * 60 * 60 * 24;
      case "w":
       return 1000 * 60 * 60 * 24 * 7;
      default:
       console.log("Invalid time unit " + timeunit);
       return 0;
     }
   }

}

start
  = interval

interval 
  =  right:(component)+
   {
     return right.reduce(function(prev, next) { 
                        return prev + next;
                   });
   }

component
  = _ left:value right:timeunit { return left * right;}

value 
  = digits:[0-9]+ {
      return parseInt(digits.join(""), 10); 
  }

timeunit
  = timeunit:[wdhms] { return ms(timeunit); }

// optional whitespace
_  = [ \t\r\n]*
