
export interface IUnsplashRequest {
    total: number;
    results: IUnsplashResults[];
}

export interface IUnsplashResults {
    id: string;
    urls: IUnsplashUrls[];
}

export interface IUnsplashUrls {
    raw: string;
    regular: string;
    small: string;
}
