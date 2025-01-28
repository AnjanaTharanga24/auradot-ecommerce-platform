
import { Injectable } from "@angular/core";
import axios from "axios"

export interface Item{
    id: number,
    name:string,
    category:string,
    description:string,
    price:number
}

@Injectable({
    providedIn: 'root'
})

export class ItemService{

    constructor(){
        axios.defaults.headers.common['Content-Type'] = 'application/json';
    }

    async addItems(item:Item){
       try {
        const response = await axios.post(`http://localhost:8080/api/items/`,item);
        console.log(response.data);
       } catch (error) {
        console.log(error);
       }
    }

}