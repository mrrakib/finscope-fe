import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as toastr from 'toastr';

declare var bootstrap: any;

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent {
  @ViewChild('addExpenseModal') addExpenseModal!: any;
  modalInstance: any;

  openModal(): void {
    this.modalInstance = new bootstrap.Modal(
      this.addExpenseModal.nativeElement
    );
    this.modalInstance.show();
  }

  closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  submitExpense(): void {
    toastr.info('Transaction saved successfully.');
    this.closeModal();
  }
}
