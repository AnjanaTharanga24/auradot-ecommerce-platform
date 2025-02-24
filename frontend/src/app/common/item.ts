export class Inventory {
    constructor(
      public stockStatus: string,
      public stockQuantity: number,
      public minimumStockLevel: number
    ) {}
  }
  
  export class Item {
    constructor(
      public name: string,
      public description: string,
      public categoryId: number,
      public imgUrl: string,
      public price: number,
      public inventory: Inventory
    ) {}
  }
  
  export class ItemResponse{
    constructor(
      public  id: number | null,
      public name: string,
      public description: string,
      public imgUrl: string,
      public category: string,
      public stockQuantity: number,
      public minimumStockLevel: number,
      public price: number,
      public created_at: string,
      public status: string){

      }
  }

  export class updateRequest{
    constructor(
      public name: string,
      public description: string,
      public stockQuantity: number,
      public minimumStockLevel: number,
      public price: number
    ){

    }
  }