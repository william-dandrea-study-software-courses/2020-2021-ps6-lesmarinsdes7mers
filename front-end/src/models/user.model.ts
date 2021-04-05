export interface ConfigSizeFont {
    name: string;
    size: number;
    default: boolean;
}

export interface User {
    id: number;
    surname: string;
    name: string;
    handicap: string;
    font_size: number;
    birthday: Date;
    size_font_configs: ConfigSizeFont[];
}
