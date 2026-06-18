import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Promotion } from '../../models/promotion.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PromotionService } from '../../services/promotion';
import { PromotionFormDialog } from './promotion-form-dialog/promotion-form-dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-promotions',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './promotions.html',
  styleUrl: './promotions.scss',
})
export class Promotions implements OnInit {

  /**
   * Tableau
   */
  dataSource = new MatTableDataSource<Promotion>([]);

  /**
   * Paginateur
   */
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  /**
   * Colonnes
   */
  displayedColumns = [

    'name',

    'formation',

    'academicYear',

    'capacity',

    'actions'
  ];

  constructor(

    private promotionService: PromotionService,

    private dialog: MatDialog,

    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {

    // Chargement
    this.loadPromotions();

    // Filtre
    this.dataSource.filterPredicate = (
      data: Promotion,
      filter: string
    ) => {
      const search = (
        data.name +

        ' ' +

        data.academicYear
      ).toLowerCase();

      return search.includes(filter);
    };
  }

  /**
   * Chargement des promotions
   */
  loadPromotions(): void {

    this.promotionService.getPromotions().subscribe({

      next: (response) => {

        this.dataSource.data = response;

        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {

        console.error(error);

        this.snackBar.open('Une erreur est survenue', 'Fermer');
      }
    });
  }

  /**
   * Filter
   */
  applyFilter(event: Event): void {

    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Ajouter une promotion
   */
  openCreateDialog(): void {

    const dialogRef = this.dialog.open(PromotionFormDialog, {

      width: '550px',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {

        this.loadPromotions();
      }
    });
  }

  /**
   * Open update dialog
   */
  openEditDialog(promotion: Promotion): void {

    const dialogRef = this.dialog.open(PromotionFormDialog, 

      {
        width: '550px',
        height: '90%',

        data: promotion
      }
    );

      dialogRef.afterClosed().subscribe((result) => {

        if (result) {

          this.loadPromotions();
        }
      }
    );
  }

  /**
   * Delete promotion
   */
  deletePromotion(promotion: Promotion): void {

    const confirmed = confirm('Confirmer la suppression de cette promotion ?');

    if (!confirmed) {

      return;
    }

    this.promotionService.deletePromotion(promotion.id).subscribe({

      next: () => {

        this.snackBar.open('Promotion supprimée avec succès', 'Fermer', {

          duration: 3000
        });

        this.loadPromotions();
    },
      error: (error) => {

        console.error(error);
      }
    });
  }
}
