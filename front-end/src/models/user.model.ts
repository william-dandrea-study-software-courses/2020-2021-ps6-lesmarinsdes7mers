export interface ConfigSizeFont {
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
    size_font_configs: ConfigSizeFont[];
}
