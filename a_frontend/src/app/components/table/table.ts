import { Component, Input, ViewChild } from '@angular/core';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { RouterLink } from '@angular/router';

export interface TableColumn {
  columnDef: string;
  header: string;
  cell: (element: any) => string;
}

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, RouterLink],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = []
  @Input({required: true}) columns: TableColumn[] = []
  @Input({required: true}) dataSource!: MatTableDataSource<any>;
  @Input({required: true}) pageSizeOptions!: any[]

  ngOnChanges() {
  this.displayedColumns = this.columns.map(c => c.columnDef);

    if (this.dataSource && this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}
