class Hello{
    private greeting: string;
    constructor(message: string){
        this.greeting = message;
        
    }
    
    public sayHello(){
        return this.greeting;
    }
    
    public sayGoodbye(){
        
    }
}

export default Hello;