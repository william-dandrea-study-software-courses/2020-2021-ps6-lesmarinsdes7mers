import { Component, OnInit } from "@angular/core";
import {ConfigSizeFont, User} from "src/models/user.model";
import { UserService } from "src/services/user.service";
import {HandicapToString} from "../../../../models/handicap.enum";
import {UserAndQuizService} from "../../../../services/user-and-quiz.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-anim-main-user-list',
    templateUrl: './anim-user-list.component.html',
    styleUrls: ['./anim-user-list.component.scss']
})
export class AnimMainUserListComponent implements OnInit {

    userList: User[] = [];
    handicapToString = HandicapToString;
    userSelected: User[];

    constructor(private userService: UserService, private userAndQuizService: UserAndQuizService, private router: Router) {
    }

    ngOnInit() {
        this.userSelected = [];
        this.userService.users$.subscribe(value => this.userList = value);

        /*this.userService.users$.subscribe(users => {
            users.forEach(user => this.userList.push(user));
        })*/
    }

    getQuizFinishCount(user: User): number {
        this.userAndQuizService.setOneUserQuizzes(user);
        return this.userAndQuizService.getUserAndQuizs().length;
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
        this.userSelected = [];
    }

    modifyUserPage(user: User) {
        this.router.navigate(['animateur', 'user-add-edit', user.id]);
    }

    createUser() {
        const user = {"id": this.getNextId(), name: '', surname: '', handicap: 0, font_size: 20, birthday: new Date(),
            note: 'Aucune', image_url: '', size_font_configs: []} as User;
        this.userService.addUser(user);
        this.router.navigate(['animateur', 'user-add-edit', user.id]);
    }

    private getNextId(): number {
        return this.userList[this.userList.length - 1].id + 1;
    }

}
