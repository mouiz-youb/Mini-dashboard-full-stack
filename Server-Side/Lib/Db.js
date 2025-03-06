
import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient({log : ['info', 'warn', 'error', 'query']});

// const x = db.post.findMany({
//     where : {
//        content : {contains : "hello"} 
//     }, 
//     include : {
//         user : {include : {posts : true}}
//     }
// })

// x.then((data) => {
//     data[0].user.posts[0]
// })