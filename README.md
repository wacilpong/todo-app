# Kakaoix Todo

### 개발환경

- mac OS catalina v10.15.4
- node v13.2.0
- npm v6.14.4

### 설치

```sh
git clone https://github.com/wacilpong/kakaoix-todo.git
cd kakaoix-todo
npm i
```

### 실행 (로컬)

```sh
npm run start:dev
```

### 사용기술

- **프론트엔드**

  - react :
    - `react v16.13.1`
    - `react-dom v16.13.1`
    - `react-router-dom v5.1.2`
    - `react-scripts v3.4.0`
  - sass(scss) : `node-sass v4.13.1`
  - typescript : `v3.7.5`
  - axios : `v0.19.2`
  - classnames : `v2.2.6`
  - qs : `v6.9.1`

- **백엔드**
  - express (서버) : `v4.17.1`
  - sqlite3 (DB) : `v4.1.1`
    <br />

### 요구사항 구현

1. 사용자는 문자열로 된 todo 항목을 추가 할 수 있다.<br />
   -> `Add Todo`버튼 혹은 텍스트창에서 엔터키를 눌러 추가

2. todo 는 다른 todo 들을 참조할 수 있다.<br />
   -> Todo 카드를 드래그하여 다른 카드로 드롭하는 방식으로 참조

3. 사용자는 todo 목록을 조회할 수 있다.<br />
   -> 추가, 삭제, 수정 및 페이징할 때마다 목록 조회

4. 작성 일자, 최종 수정 일자, 내용, 참조하고 있는 todo 들의 id 가 표시되어야 한다.<br />
   -> Todo 카드 레이아웃 참고

5. 작성일과 최종수정일은 YYYY-MM-DD 형태로 출력된다.<br />
   -> Todo 카드 레이아웃 참고

6. 사용자는 todo 를 수정할 수 있다.<br />
   -> Todo 카드의 텍스트창에서 문자열 수정 후 커서가 blur되면 자동으로 수정

7. 사용자는 todo 를 삭제할 수 있다.<br />
   -> Todo 카드의 오른쪽 `X`버튼을 눌러 삭제

8. 사용자는 todo 를 완료 또는 미완료로 상태변경을 할 수 있다.<br />
   -> Todo 카드의 왼쪽 체크박스를 눌러 상태변경

9. 참조하고 있는 todo들이 모두 완료 상태가 아니라면 todo를 완료할 수 없다.<br />
   -> 참조된 Todo의 완료상태를 수정할 때 자신을 참조시킨 Todo들의 완료여부를 체크

10. 페이지네이션 기능<br />
    -> 한 페이지에 5개의 row를 보여주고, 그 이상은 페이징되도록 처리

11. 검색 기능 (text, 완료여부, 날짜 등)<br />
    -> Todo의 제목과 id번호를 검색 (참조된 id로 검색하기 편하도록 id도 포함)

12. 검색 결과를 필터 및 정렬하는 기능<br />
    -> 완료여부 및 삭제여부를 필터링, 작성일을 기준으로 최신순과 오래된순 정렬
