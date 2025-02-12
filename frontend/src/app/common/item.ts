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
  