# React-blog

<!-- TODO: 목차 만들기 -->

## 개요

-   마크다운 에디터로 작성하는 블로그

## 제작과정

-   프로젝트 명 : blog
-   수행기간 : 2018년 9월 ~ 2018년 12월
-   프로젝트 인원 : 1명

## 개발 환경

-   **OS** : Windows 10
-   **IDE** : Visual Studio Code
-   **Browser** : Chrome
-   **Programming Languages**
    - HTML
    - css
        - CSS Module, Sass
    - JavaScript
        - ES6
        - node.js (ver 8.12.0)
        - koa.js (ver 2.6.2)
        - React.js (ver 16.6.3)
            - create-react-app v2
    - MongoDB (ver 4.0)
        - Robo 3T (ver 1.2)

## 주요 기술

- 다양한 library 사용
    - axios (ver 0.18.0)
    - immutable.js (ver 4.0.0)
    - classNames (ver 2.2.6)
    - dotenv (ver 6.0.0)
    - codemirror (ver 5.42.0)
    - marked (ver 0.5.2)
    - moment (ver 2.22.2)
    - open-color (ver 1.6.3)
    - prismjs (ver 1.15.0)
    - query-string (ver 5.1.1)
    - react-helmet (ver 5.2.0)
    - redux (ver 4.0.1)
    - react-redux (ver 5.1.1)
    - redux-actions (ver 2.6.4)
    - redux-pender (ver 1.2.1)
- Redux를 이용한 상태 관리
- Single Page Application
- Pagination

## 세부내용

### 웹 사이트 구조

![Website Architecture](./etc/website-architecture.JPG)

### 전체 Process

![process](./etc/process.gif)

### 주요 기능

- **Login**

> 세션 어쩌구를 이용한 로그인 방식  
> 비 로그인 상태에서는 게시글 조회만 가능  
> 정해둔 비밀번호로 관리자 로그인을 하면 포스트 생성, 수정, 삭제 가능

- **Pagination**

> 어떠한걸 이용하였고 요청할 때 offset과 limit

- **tag**

> 포스트를 생성, 수정 할 시에 태그 설정 가능  
> 태그를 클릭 시 해당 태그로 포스트 목록 조회

- **포스트 내용 미리보기**

> 200자 만큼만 잘라서 보여준다.  
> 마지막에 ㅎㅎ by pbw는 실험적으로 붙여보았다.

- **markdown editor**

> 어떤 라이브러리를 사용하여 markdown editor와 preview 기능 구현


## 실행 방법

1.   DownLoad Zip
2.   Execute `project/door/door.htm`