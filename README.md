# Kakaoix Todo

## 개발환경

- mac OS catalina v10.15.4
- node v13.2.0
- npm v6.14.4

## 설치

```sh
git clone https://github.com/wacilpong/kakaoix-todo.git
cd kakaoix-todo
npm i
```

## 실행 (로컬)

```sh
npm run start:dev
```

<br />
<hr />

## 요구사항 구현

- 사용자는 문자열로 된 todo 항목을 추가 할 수 있다.
- todo 는 다른 todo 들을 참조할 수 있다.
- 사용자는 todo 목록을 조회할 수 있다.
- 작성 일자, 최종 수정 일자, 내용, 참조하고 있는 todo 들의 id 가 표시되어야 한다.
- 날작성일과 최종수정일은 YYYY-MM-DD 형태로 출력된다.
- 사용자는 todo 를 수정할 수 있다.
- 사용자는 todo 를 삭제할 수 있다.
- 사용자는 todo 를 완료 또는 미완료로 상태변경을 할 수 있다.
- 참조하고 있는 todo들이 모두 완료 상태가 아니라면 todo를 완료할 수 없다.
- 페이지네이션 기능
- 검색 결과를 필터 및 정렬하는 기능
