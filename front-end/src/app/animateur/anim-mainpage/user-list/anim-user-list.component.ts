import { Component, OnInit } from "@angular/core";
import { User} from "src/models/user.model";
import { UserService } from "src/services/user.service";
import {HandicapToString} from "../../../../models/handicap.enum";
import {UserAndQuizService} from "../../../../services/user-and-quiz.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {serverUrl} from "../../../../configs/server.config";
import {UserAndQuizModel} from "../../../../models/user-and-quiz.model";

@Component({
    selector: 'app-anim-main-user-list',
    templateUrl: './anim-user-list.component.html',
    styleUrls: ['./anim-user-list.component.scss']
})
export class AnimMainUserListComponent implements OnInit {

    userList: User[] = [];
    userQuiz: UserAndQuizModel[] = [];
    handicapToString = HandicapToString;
    userSelected: User[];

    constructor(private userService: UserService, private userAndQuizService: UserAndQuizService, private router: Router,
                private http: HttpClient) {
    }

    ngOnInit() {
        this.userSelected = [];
        this.userAndQuizService.initializeUserAndQuiz(-1);
        this.userAndQuizService.getUserAndQuizzesAsObservable().subscribe(value => {
            this.userQuiz = value;
            this.userService.users$.subscribe(users => {
                this.userList = users;
            })
        });
    }

    getQuizFinishCount(user: User): number {
        return this.userQuiz.filter(value => value.id_user == user.id)?.length || 0;
    }

    onConfigFontSizeChange(user: User): void {
        if(!this.userSelected.includes(user))
            this.userSelected.push(user);
        else
            this.userSelected = this.userSelected.filter(value => value !== user);
    }

    deleteSelectedFontSizeConfig(): void {
        console.log(this.userSelected);
        this.userSelected.forEach(value => this.userService.deleteUser(value));
        this.userList = this.userList.filter(value => !this.userSelected.includes(value));
        this.userSelected.forEach(value => this.http.delete(serverUrl+"/user/"+value.id).subscribe(value1 => console.log(value1)))
        this.userSelected = [];
    }

    modifyUserPage(user: User) {
        this.router.navigate(['animateur', 'user-add-edit', user.id]);
    }

    createUser() {
        const user = {id: this.getNextId(), name: '', surname: '', handicap: 0, font_size: 20, birthday: new Date(),
            note: 'Aucune', image_url: '', size_font_configs: []} as User;
        this.userService.addUser(user);
        this.router.navigate(['animateur', 'user-add-edit', user.id]);
    }

    private getNextId(): number {
        return this.userList[this.userList.length - 1].id + 1;
    }

}
