export interface Advert {
    id: string;
    name: string;
    age: number;
    race: string;
    sex: string;
    personallity: string;
    rentPeriod: number;
    grade: number;
    review: string;
    imageUrls: string;
    userId: string;
}
export interface AdvertDto extends Omit<Advert, "id" | "review" | "grade" | "userId"> {};