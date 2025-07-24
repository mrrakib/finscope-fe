import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as toastr from 'toastr';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [FormsModule, NgbDatepickerModule, CommonModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent {
  @ViewChild('addExpenseModal') addExpenseModal!: any;
  modalInstance: any;
  transactionType: 'Expense' | 'Income' = 'Expense';

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

  toogleTransactionType(type: 'Expense' | 'Income'): void {
    this.transactionType = type;
  }

  submitExpense(): void {
    toastr.info('Transaction saved successfully.');
    this.closeModal();
  }
}
