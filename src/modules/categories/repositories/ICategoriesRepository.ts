import { Category } from "../typeDefs/Category";

export type ICreateCategoryDTO = {
    name: string;
    description: string;
    image_id: string;
    image_url: string;
    inactive: boolean;
}
export interface ICategoriesRepository {
    create(
        {
            name,
            description,
            image_id,
            image_url,
            inactive,
        }: ICreateCategoryDTO): Promise<Category>;

    list({ skip, take }: { skip: number; take: number }): Promise<Category[]>;
}