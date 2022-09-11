import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../api.service';
import { Film } from '../models/Film';
import { Opinion } from '../models/Opinion';
import { User } from '../models/User';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  // Cette classe est celle comprenant la plus de logique

  @Input() film: Film;
  @Input() user : User;
  @Input() isLogged: boolean;
  isLiked: boolean;
  isDisliked: boolean;
  @Output() seekedDirector = new EventEmitter<string>();
  // Ces icônes seront modifiées selon que l'éventuel utilisateur authentifié a déjà liké ou disliké le film
  likedIcon: string = "./assets/thumbup.png";
  dislikedIcon: string = "./assets/thumbdown.png";
  opinions: Opinion[];
  opinionIndex: number = 0;
  selectedOpinion: Opinion = null;
  isOpinionLiked:boolean;
  opinionAuthor:string;
  @Output() opinionToCheck = new EventEmitter<string>();
  seekedId:string = this.route.snapshot.params["opinionId"];
  isIdSeeked:boolean = true;

  constructor(
    private service: APIService,
    private router:Router,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    // À chaque changement de film affiché, on vérifie s'il possède des avis.
    // Si oui, on les affiche
    if (this.film.opinionsId.length > 0) {
      this.getOpinions();
    }
    // Si non, on s'assure de vider les variables en jeu (des quelles dépendent certains éléments du template)
    else {
      this.opinions = null;
      this.selectedOpinion = null;
    }
    // Si l'utilisateur est connecté, on vérifie s'il a déjà interagi avec le film afin de modifier les icônes
    if (this.isLogged){
      this.likedsAndDislikesCheck();
    }
  }

  likeOrDislike(action: string) {
    // On ne peut liker ou disliker un film que si on est authentifié
    // Le paramètre "action" détermine s'il s'agit d'un like ou d'un dislike
    if (this.isLogged) {
      this.service.likeOrDislikeFilm(this.film._id, this.user._id, action).subscribe((res:{user:User, film:Film}) => {
        // Dans le cas où l'utilisateur likerait un film déjà disliké (ou inversement), l'API se charge d'annuler l'action précédente
        // Dans tous les cas, on met donc à jour les deux valeurs, autant de l'utilisateur que du film
        this.user.likedFilmsId = res.user.likedFilmsId;
        this.user.dislikedFilmsId = res.user.dislikedFilmsId;
        this.film.likes = res.film.likes;
        this.film.dislikes = res.film.dislikes;
        this.likedsAndDislikesCheck();
    });
  }
    else {
      alert("Connectez-vous pour effectuer cette action");
    }
  }

  likedsAndDislikesCheck() {
    // Cette fonction permet de mettre à jour le template et notamment les icônes, concernant les actions déjà effectuées par l'utilisateur
    this.isLiked = (this.user.likedFilmsId.includes(this.film._id)) ? true : false;
    this.isDisliked = (this.user.dislikedFilmsId.includes(this.film._id)) ? true : false;
    this.likedIcon = this.isLiked ? "./assets/thumbup_done.png" : "./assets/thumbup.png";
    this.dislikedIcon = this.isDisliked ? "./assets/thumbdown_done.png" : "./assets/thumbdown.png";
  }


  addOpinion() {
    if (this.isLogged) {
      // Si l'utilisateur n'a pas encore donné son avis sur le film, on l'enverra sur la page de création d'un nouvel avis
      let flag = false;
      let i = 0;
      let opinionId;
      // Cette vérification n'est bien sûr pas nécessaire si aucun avis n'a été laissé
      if (this.opinions){
        // Pour vérifier ça, on va lancer une boucle qui s'arrêtera soit quand toute la liste d'avis aura été itérée, soit quand on trouvera un avis dont il est l'auteur
        while (i<this.opinions.length && !flag){
          if (this.opinions[i].author === this.user._id){
            flag = true;
            opinionId = this.opinions[i]._id;
          }
            i++;
        }
      }
      // Si l'utilisateur a déjà laissé un avis, on lui demande s'il veut le modifier
      if (flag){
        if (window.confirm("Vous avez déjà écrit un avis sur ce film. Voulez-vous le modifier?")){
          // Si oui, le component NewOpinion le détectera grâce au paramètre "action" de la route qui aura la valeur "edit"
          this.router.navigateByUrl(`opinion/${this.film._id}/edit/${opinionId}`);
        }
        else {
          // Si non, on lui demande s'il veut le supprimer
          if (window.confirm("Voulez-vous le supprimer?")){
            this.eraseOpinion(opinionId);
          }
        }
      }
      // Si l'utilisateur n'a laissé aucun avis, on l'envoie simplement vers NewComponent avec "create" passé dans le paramètre "action" de la route
      else {
        this.router.navigateByUrl(`opinion/${this.film._id}/create`);
      }      
    }
    else {
      alert("Connectez-vous pour effectuer cette action");
    }
  }

  getFilms(director: string) {
    // Méthode déclenchant la réception de la liste des films du réalisateur sur lequel on a cliqué
    // Puisque cela nécessite de mettre à jour un composant frère, cette action doit se faire chez le parent
    this.seekedDirector.emit(director);
  }

  getOpinions() {
    // Tout d'abord, on vide la liste des avis
    this.opinions = [];
    this.opinionIndex = 0;
    let i = 0;
    // Puis on va récupérer chaque avis laissés sur ce film
    this.film.opinionsId.forEach(opinionId => {
      this.service.getOpinion(opinionId).subscribe((opinion: Opinion) => {
          this.opinions.push(opinion);
        i++;
        // Puisqu'on est dans des requêtes asynchrones, on effectue le tri et les attributions ici, après la récupération du dernier avis
        if (i === this.film.opinionsId.length) {          
          this.opinions.sort((a, b) => {
            return b.likes - a.likes;
          });
          // Dans les cas où on vient d'écrire ou de modifier un avis, on sera renvoyé ici avec un paramètre d'avis en route
          if (this.seekedId && this.isIdSeeked){
            // Dans ce cas, on ne va pas afficher l'avis le plus aimé, mais le notre 
            this.opinionIndex = (this.opinions.map(opinion=>opinion._id)).indexOf(this.seekedId);
            this.selectedOpinion = this.opinions[this.opinionIndex];
            // Et comme pour le film dans HomeComponent, on ne se sert de cet id qu'une fois, car ensuite nous pourrons aller regarder d'autres films
            this.isIdSeeked = false;
          }
          else {
            // Dans les cas général, on affiche donc d'abord l'avis le plus aimé
            this.selectedOpinion = this.opinions[0];
          }
          this.opinionCheck();
        }
      });
    });
  }

  opinionSelection(selection: number) {
    // Pour naviguer dans les avis, on utilise cette fonction
    let result = this.opinionIndex + selection;
    // On vérifie d'abord qu'on ne va pas sortir des limites du tableau des avis
    if (result >= 0 && result < this.film.opinionsId.length) {
      this.opinionIndex = result;
      this.selectedOpinion = this.opinions[this.opinionIndex];
      this.opinionCheck();
    }
  }

  opinionCheck(){
    // Si l'utilisateur est connecté, on vérifie s'il a déjà aimé cet avis
    if (this.isLogged){
      this.isOpinionLiked = (this.user.likedOpinionsId.includes(this.selectedOpinion._id)) ? true : false;
    }
    // Dans tous les cas, l'API renvoie un id dans le champ "author". Ici, on récupère donc le pseudo afin de l'afficher
    this.service.getOneUser(this.selectedOpinion.author).subscribe((user:User)=>{
      this.opinionAuthor = user.nickname;
    });
  }

  likeOpinion(id:string){
    this.service.likeOpinion(this.user._id,id).subscribe(res=>{
      this.user.likedOpinionsId = res.user.likedOpinionsId;
      this.selectedOpinion.likes = res.opinion.likes;
      this.isOpinionLiked = (this.user.likedOpinionsId.includes(this.selectedOpinion._id)) ? true : false;
    });
  }

  eraseOpinion(id:string){
    this.service.eraseOpinion(id,this.film._id,this.user._id).subscribe((res:{user:User,film:Film})=>{
      this.user.opinionsId = res.user.opinionsId;
      this.user.likedOpinionsId = res.user.likedOpinionsId;
      this.film.opinionsId = res.film.opinionsId;
      this.getOpinions();
    });
  }

}
