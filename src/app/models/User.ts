export interface User {
    userId:string,
    nickname:string,
    likedFilmsId:[string],
    dislikedFilmsId:[string],
    opinionsId:[string],
    likedOpinionsId:[string],
    isAdmin:boolean,
    token:string
}