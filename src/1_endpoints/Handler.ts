interface Handler{
   setNext(h:Handler):void;
   handle(request:any,response:any):any;
}export {Handler}