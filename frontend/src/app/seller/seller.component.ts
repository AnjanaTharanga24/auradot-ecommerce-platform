import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {
  item = {
    name: '',
    description: '',
    category: '',
    price: 0,
  };

  async onSubmit() {
    try {
      const response = await axios.post(`http://localhost:8080/api/items/`, this.item);
      console.log(response.data);
      Swal.fire({
        title: 'Success!',
        text: 'Item added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        background: '#f0f9ff', 
        color: '#4caf50', 
        confirmButtonColor: '#4caf50', 
      });
    } catch (error) {
      console.log(error);
    }
  }
}
