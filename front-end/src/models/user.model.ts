
export interface ConfigSizeFont {
    id: number;
    name: string;
    size: number;
    default: boolean;
}

export interface User {
    name: string;
    surname: string;
    id: number;
    handicap: number;
    font_size: number;
    birthday: Date;
    image_url: string;
    note: string;
    size_font_configs: ConfigSizeFont[];
}
