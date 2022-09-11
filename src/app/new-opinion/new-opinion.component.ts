import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../api.service';

@Component({
  selector: 'app-new-opinion',
  templateUrl: './new-opinion.component.html',
  styleUrls: ['./new-opinion.component.css']
})
export class NewOpinionComponent implements OnInit {

  opinion: string;
  opinionId: string = this.route.snapshot.params['opinionId'];
  filmId: string = this.route.snapshot.params['filmId'];
  action: string = this.route.snapshot.params["action"];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: APIService
  ) { }

  ngOnInit(): void {
    if (this.action == "edit") {
      // Si l'utilisateur veut modifier un avis déjà existant, on l'affiche en assignant à la variable opinion, liée en ngModel, le contenu de l'avis existant déjà
      this.service.getOpinion(this.opinionId).subscribe(opinion => {
        this.opinion = opinion.content;
      });
    }
  }

  sendOpinion() {
    if (this.opinion !== "") {
      if (this.action == "create") {
        this.service.addOpinion(this.filmId, localStorage.getItem("id"), this.opinion).subscribe(res => {
          this.router.navigateByUrl(`home/${this.filmId}/${res.opinion._id}`);
          // Une fois l'avis créé, on retourne vers home en affichant ce film et cet avis
        });
      }
      else if (this.action == "edit") {
        this.service.editOpinion(this.opinionId, this.opinion).subscribe(() => {
          // De même s'il est modifié
          this.router.navigateByUrl(`home/${this.filmId}/${this.opinionId}`);
        });
      }
    }
    else {
      alert("Votre avis est vide");
    }
  }

}
