export class User{
    
    public id:string;
    public name:string;
    public technology:string

    constructor(id:string, name:string, technology:string){
        this.id = id;
        this.name = name;
        this.technology = technology;
    }
}