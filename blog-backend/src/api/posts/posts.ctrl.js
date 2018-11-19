const Post = require('models/post');
const Joi = require('joi');
const { ObjectId } = require('mongoose').Types;

exports.checkObjectId = (ctx, next) => {
    const { id } = ctx.params;

    // 검증 실패
    if(!ObjectId.isValid(id)) {
        ctx.status = 400; //400 Bad Request
        return null;
    }

    return next(); // next를 리턴해야 ctx.body가 제대로 설정됩니다.
}

exports.write = async (ctx) => {
    // 객체가 지닌 값들을 검증
    const schema = Joi.object().keys({
        title: Joi.string().required(), // 뒤에 required를 붙여 주면 필수 항목이라는 의미
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required() // 문자열 배열
    })

    // 첫 번째 파라미터는 검증할 객체, 두번째는 스키마
    const result = Joi.validate(ctx.request.body, schema);
    if(result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { title, body, tags } = ctx.request.body;

    // 새 Post 인스턴스를 만듭니다.
    const post = new Post({
        title, body, tags
    })

    try{
        await post.save(); // 데이터베이스에 등록합니다.
        ctx.body = post; // 저장된 결과를 반환합니다.
    } catch(e) {
        // 데이터베이스의 오류가 발생합니다.
        ctx.throw(e, 500);
    }
}
exports.list = async (ctx) => {
    // page가 주어지지 않았다면 1로 설정.
    // query로 받으면 문자열이기 때문에 숫자로 변환.
    const page = parseInt(ctx.query.page || 1, 10);
    const { tag } = ctx.query;

    const query = tag ? {
        tags: tag // tags 배열에 tag를 가진 포스트 추가
    } : {};

    // 잘못된 페이지가 주어졌다면 오류
    if(page < 1) {
        ctx.status = 400;
        return;
    }

    try{
        const posts = await Post.find(query)
            .sort({_id: -1})
            .limit(10)
            .skip((page-1)*10)
            .lean()
            .exec();


        const pageCount = await Post.count(query).exec();
        const limitBodyLength = post => ({
            ...post,
            body: post.body.length < 200 ? post.body : `${post.body.slice(0, 50)}...ㅎㅎ by pbw`
        })
        ctx.body = posts.map(limitBodyLength);

        
        // 마지막 페이지 알려주기
        // ctx.set은 response header를 설정
        ctx.set('Last-Page', Math.ceil(pageCount / 10));

        // ctx.body = posts;
    } catch(e) {
        ctx.throw(e, 500);
    }
}
exports.read = async (ctx) => {
    const { id } = ctx.params;
    try {
        const post = await Post.findById(id).exec();
        // 포스트가 존재하지 않을 경우
        if(!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch(e) {
        ctx.throw(e, 500);
    }
}
exports.remove = async (ctx) => {
    const { id } = ctx.params;
    try {
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204;
    } catch(e) {
        ctx.throw(e, 500);
    }
}
exports.update = async (ctx) => {
    const { id } = ctx.params;
    try {
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true
            // 이 값을 설정해야 업데이트된 객체를 반환합니다.
            // 설정하지 않으면 업데이트되기 전의 객체를 반환합니다.
        }).exec();
        // 포스트가 존재하지 않을 경우
        if(!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch(e) {
        ctx.throw(e, 500);
    }
}


























// let postId = 1; // id의 초깃값 입니다.

// const posts = [
//     {
//         id: 1,
//         title: '제목',
//         body: '내용',
//     }
// ]

// /* 
//     포스트 작성
//     POST /api/posts
//     { title, body }
// */

// exports.write = (ctx) => {
//     const {
//         title,
//         body
//     } = ctx.request.body;

//     postId += 1;

//     const post = { id: postId, title, body };
//     posts.push(post);

//     ctx.body = post;
// }

// /* 
//     포스트 목록  조회
//     GET /api/posts
// */
// exports.list = (ctx) => {
//     ctx.body = posts;
// }

// /* 
//     특정 포스트 조회
//     GET /api/posts/:id
// */
// exports.read = (ctx) => {
//     const { id } = ctx.params;

//     const post = posts.find(p => p.id.toString() === id);

//     if(!post) {
//         ctx.status = 404;
//         ctx.body = {
//             message: '포스트가 존재하지 않습니다.'
//         }
//         return;
//     }

//     ctx.body = post;
// }

// /* 
//     특정 포스트 제거
//     DELETE /api/posts/:id
// */
// exports.remove = (ctx) => {
//     const { id } = ctx.params;

//     const index = posts.findIndex(p => p.id.toString() === id);

//     if(index === -1) {
//         ctx.status = 404;
//         ctx.body = {
//             message: '포스트가 존재하지 않습니다.'
//         }
//         return;
//     }

//     posts.splice(index, 1);
//     ctx.status = 204; // No Content
// }

// /* 
//     포스트 수정(교체)
//     PUT /api/posts/:id
//     { title, body }
// */
// exports.replace = (ctx) => {
//     const { id } = ctx.params;

//     const index = posts.findIndex(p => p.id.toString() === id);

//     if(index === -1) {
//         ctx.status = 404;
//         ctx.body = {
//             message: '포스트가 존재하지 않습니다.'
//         }
//         return;
//     }

//     posts[index] = {
//         id,
//         ...ctx.request.body
//     }
//     ctx.body = posts[index];
// }

// /* 
//     포스트 수정(특정 필드 변경)
//     PATCH /api/posts/:id
//     { title, body }
// */
// exports.update = (ctx) => {
//     const { id } = ctx.params;

//     const index = posts.findIndex(p => p.id.toString() === id);

//     if(index === -1) {
//         ctx.status = 404;
//         ctx.body = {
//             message: '포스트가 존재하지 않습니다.'
//         }
//         return;
//     }

//     posts[index] = {
//         ...posts[index],
//         ...ctx.request.body
//     }

//     ctx.body = posts[index];
// }