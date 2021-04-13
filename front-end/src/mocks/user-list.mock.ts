import {User} from "../models/user.model";

export const USER_LIST: User[] = [
    {
        id: 1,
        surname: "Arcil",
        name: "Alexandre",
        font_size: 30,
        birthday: new Date("2000-03-27"),
        handicap: 0,
        image_url: "",
        note: "rien",
        size_font_configs: [
            {
                id: 0,
                name: "ConfigOne",
                size: 30,
                default: true
            },
            {
                id: 1,
                name: "ConfigTwo",
                size: 40,
                default: false
            },
            {
                id: 2,
                name: "ConfigThree",
                size: 50,
                default: false
            },
        ]
    }
]
