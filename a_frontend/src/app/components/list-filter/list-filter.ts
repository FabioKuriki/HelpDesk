import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-filter',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './list-filter.html',
  styleUrl: './list-filter.css',
})
export class ListFilter {
  value = '';

  private _dataSource!: MatTableDataSource<any>;

  @Input({ required: true })
  set dataSource(value: MatTableDataSource<any>) {
    console.log('Novo datasource recebido:', value);

    this._dataSource = value;

    // reaplica o filtro atual no novo datasource
    if (this.value) {
      this.clearFilter()
    }
  }

  get dataSource(): MatTableDataSource<any> {
    return this._dataSource;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.value = filterValue;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter() {
    this.value = '';
    this.dataSource.filter = '';

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
