const { ADMIN_PASS: adminPass } = process.env;

exports.login = (ctx) => {
    const { password } = ctx.request.body;

    if (adminPass === password) {
        // 비밀번호가 일치하면
        ctx.body = {
            success: true
        };

        // 로그인에 성공하면 logged값을 true로 변경한다.
        ctx.session.logged = true;
    }
    else {
        ctx.body = {
            success: false
        };
        ctx.status = 401; // Unauthorized
    }
}

exports.check = (ctx) => {
    ctx.body = {
        /* 
            ! 문자를 두 번 사용하여
            값이 존재하지 않을 때도 false를 반환하도록 설정한다.
        */
        logged: !!ctx.session.logged
    };
}

exports.logout = (ctx) => {
    ctx.session = null;
    ctx.status = 204; // No Content
}