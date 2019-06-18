import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BoardModel, IdeaModel } from 'src/app/boards/boards.model';
import { BoardsService } from 'src/app/boards/boards.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tableros',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  boards: [{}];
  userId: any;
  username: any;
  showFormIdea: boolean;
  authenticated: boolean;

  formBoard: FormGroup;
  formIdea: FormGroup;
  formSearch: FormGroup;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private services: BoardsService,
              public router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.authService.isAuthorized()
      .pipe(finalize(() => {
      }))
      .subscribe(data => {this.authenticated = data; });
    this.authService.getUsernameStorage()
      .subscribe(
        data => {
          this.username = data;
        }
      );
    this.authService.getUserIdStorage()
      .subscribe(
        data => {
          this.userId = data;
        }
      );
    this.createForm();
    this.getBoards();
  }

  private createForm() {
    this.formBoard = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      type: ['', [Validators.required, Validators.maxLength(30)]],
    });
    this.formIdea = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(500)]],
    });
    this.formSearch = this.formBuilder.group({
      param: ['', [Validators.maxLength(100)]],
    });
  }

  get title() { return this.formBoard.get('title'); }
  get description() { return this.formBoard.get('description'); }
  get type() { return this.formBoard.get('type'); }
  get description_idea() { return this.formIdea.get('description'); }
  get param() { return this.formSearch.get('param'); }

  /*
   Get boards from the user
   */
  getBoards() {
    this.services.getBoards(this.userId)
      .subscribe(
        data => {
          console.log(data);
          this.boards = data;
        },
        error => {
        }
      );
  }

  /*
  Creation of boards
   */
  newBoard() {
    const boarModel: BoardModel = {
      'title': this.title.value,
      'description': this.description.value,
      'type': this.type.value,
      'created_by': this.userId,
    };
    this.services.createBoard(boarModel)
      .subscribe(
        data => {
          console.log(data);
          this.getBoards();
        },
        error => {
          console.log(`error: ${error.message}`);
        }
      );
  }

  addFormIdea(boardId) {
    this.showFormIdea = true;
  }

  newIdea(boardId) {
    const ideaModel: IdeaModel = {
      'board': boardId,
      'description': this.description.value,
      'created_by': this.userId,
      'approved': false
    };
    this.services.createIdea(ideaModel)
      .subscribe(
        data => {
          console.log(data);
          this.getBoards();
        },
        error => {
          console.log(`error: ${error.message}`);
        }
      );
  }

  // createIdea() {
  //   const ideasModel: IdeaModel = {
  //     'board': this.boardId,
  //     'description': this.description_idea.value,
  //     'approved': this.approved,
  //     'created_by': this.userId,
  //   };
  //   this.services.createIdea(ideasModel)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.getBoards();
  //       },
  //       error => {
  //       }
  //     );
  //   this.description_idea.setValue('');
  // }

  editIdeaFormModal(idea, tablero) {
    if (tablero.creado_por === this.userId) {
      this.description_idea.setValue(idea.descripcion);
    } else {
    }
  }

  // Función para editar una idea
  // editIdea() {
  //   const ideasModel: IdeaModel = {
  //     'board': this.info_tablero_idea_editar.id,
  //     'description': this.description_idea.value,
  //     'approved': this.info_idea_editar.aprobada,
  //     'created_by': this.userId,
  //   };
  //   this.services.editIdea(this.info_idea_editar.id, ideasModel)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.getBoards();
  //       },
  //       error => {
  //         console.log(`error: ${error.message}`);
  //       }
  //     );
  //   this.description_idea.setValue('');
  // }

  cancelar() {
    this.description_idea.setValue('');
  }

  deleteIdea(id, tablero_creado_por) {
  }

  approveIdea(idea, tablero) {
  }

  eliminarTablero(id) {
    this.services.deleteIdea(id)
      .subscribe(
        data => {
          console.log(data);
          this.getBoards();
        },
        error => {
          console.log(`error: ${error.message}`);
        }
      );
  }

  onKeyUpBuscador(value) {
    this.services.getBoard(value)
      .subscribe(
        data => {
          console.log(data);
          this.boards = data;
        },
        error => {
        }
      );
  }

}
