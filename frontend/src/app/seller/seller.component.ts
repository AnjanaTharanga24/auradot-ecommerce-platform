import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private router: Router) { }

  async onSubmit() {
    try {
      const response = await axios.post(`http://localhost:8080/api/items/`, this.item);
      console.log(response.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Item added successfully!",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something went wrong, please try again.",
        showConfirmButton: false,
        timer: 1500
      });

    }
  }

  onCancle() {
    this.router.navigate(['/']);
  }
}
