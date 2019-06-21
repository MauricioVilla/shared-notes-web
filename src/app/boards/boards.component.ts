import {Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BoardModel, IdeaModel } from 'src/app/boards/boards.model';
import { BoardsService } from 'src/app/boards/boards.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { finalize } from 'rxjs/operators';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-tableros',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  boards: [{}];
  userId: any;
  username: any;
  approved: string;
  authenticated: boolean;

  formBoard: FormGroup;
  formIdea: FormGroup;
  formSearch: FormGroup;
  @ViewChild('createIdeaFail') private createIdeaFail: SwalComponent;

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
    this.services.getBoardsByUser(this.username)
      .subscribe(
        data => {
          this.boards = data;
        },
        error => {
        }
      );
  }

  /**
   * Get board filtering by values of the searcher
   * @param param
   */
  searchBoard(param: string) {
    this.services.getBoardsSearcher(param)
      .subscribe(
        data => {
          this.boards = data;
        },
        error => {
        }
      );
  }

  /**
   * Function for creation of boards
   */
  newBoard() {
    const boardModel: BoardModel = {
      'title': this.title.value,
      'description': this.description.value,
      'type': this.type.value,
      'created_by': this.userId,
    };
    this.services.createBoard(boardModel)
      .subscribe(
        data => {
          this.getBoards();
        },
        error => {
          console.log(`error: ${error.message}`);
        }
      );
  }

  /**
   * Function that consumes a service of elimination of boards
   * @param id
   */
  deleteBoard(id) {
    this.services.deleteBoard(id)
      .subscribe(
        data => {
          this.getBoards();
        },
        error => {
          console.log(`error: ${error.message}`);
        }
      );
  }

  /**
   * Function for the creation of new ideas on a board
   * @param boardId
   */
  newIdea(boardId) {
    const ideaModel: IdeaModel = {
      'board': boardId,
      'description': this.description_idea.value,
      'approved': this.approved,
      'created_by': this.userId
    };
    console.log(ideaModel);
    this.services.createIdea(ideaModel)
      .subscribe(
        data => {
          this.getBoards();
        },
        error => {
          console.log(`error: ${error.message}`);
        }
      );
  }

  /**
   * Function for validate if an user can add ideas on a board
   * @param boardId
   * @param boardType
   * @param createdBy
   */
  checkNewIdea(boardId, boardType, createdBy) {
    if (boardType === 'Public') {
      if (this.username === createdBy) {
        this.approved = 'Yes';
      } else {
        this.approved = 'No';
      }
      $('#idModalIdea').trigger('click');
    } else if (boardType === 'Private') {
      console.log(this.username);
      console.log(createdBy);
      if (this.username === createdBy) {
        this.approved = 'Yes';
        $('#idModalIdea').trigger('click');
      } else {
        this.approved = 'No';
        this.createIdeaFail.show();
      }
    }
  }

  /**
   * Function for show modal with all the information
   * of an idea
   * @param idea
   */
  showIdea(idea) {
    $('#linkShowIdea').trigger('click');
    $('#showIdea').find('.text').text(idea);
  }

  /**
   * Function that consumes a service of elimination of ideas
   * of the an board
   * @param idIdea
   */
  deleteIdea(idIdea) {
    this.services.deleteIdea(idIdea)
      .subscribe(
        data => {
          this.getBoards();
        },
        error => {
          console.log(`error: ${error.message}`);
        }
      );
  }

  /**
   * Function that consume a service of approve of ideas
   * @param idIdea
   */
  approveIdea(idIdea) {
    this.services.approveIdea(idIdea)
      .subscribe(
        data => {
          this.getBoards();
        },
        error => {
          console.log(`error: ${error.message}`);
        }
      );
  }

}
