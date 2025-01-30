import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
   items : any[] = [];

   async getAllItems(){
     try {
      const response = await axios.get(`http://localhost:8080/api/items/`);
      this.items = response.data;
      console.log(response.data);
     } catch (error) {
      console.log(error)
     }
   }

   async deleteItem(id: number) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(`http://localhost:8080/api/items/${id}`);
            console.log(response);
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              icon: "success"
            });
            this.getAllItems(); 
          } catch (error) {
            console.error("Error deleting item:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the item. Please try again.",
              icon: "error"
            });
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  


   ngOnInit(){
    this.getAllItems();
  }
}
