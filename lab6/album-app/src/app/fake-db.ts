import { Album } from "./model";

export const POSTS: Album[] = [];

for(let i: number = 0; i < 10;  i++){
    POSTS.push(
    {
        userId: i, 
        id: i,
        title: `Body ${i}`,
    }
)
}