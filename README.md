# Lecture Script

---

## Project Overview

---

> **강의를 실시간으로 녹음하고, PDF 파일로 변환하고, 복습을 쉽게 합시다.**

매번 강의 목록을 찾고, Time Bar를 옮기고 옮겨 겨우겨우 복습을 시작했다면, Lecture Script를 사용하여 편리하고 효율적으로 복습을 해봅시다.

- **Framework & Library & API**

    : 클릭하면 공식 문서로 이동합니다.

    - [Django](https://docs.djangoproject.com/ko/3.2/intro/)
    - [DRF](https://www.django-rest-framework.org), [Django Rest Auth](https://django-rest-auth.readthedocs.io/en/latest/)
    - [React.JS](https://ko.reactjs.org), [Redux](https://ko.redux.js.org/introduction/getting-started/)
    - [Google Cloud Speech-To-Text](https://cloud.google.com/speech-to-text/docs/basics?hl=ko), [Google Cloud Storage](https://cloud.google.com/storage/docs/samples?hl=ko)
    - [Styled-Component](https://styled-components.com/docs), [Open-Color](https://yeun.github.io/open-color/)

![https://user-images.githubusercontent.com/72953899/120222155-76cee000-c27a-11eb-970d-6903fe57a783.png](https://user-images.githubusercontent.com/72953899/120222155-76cee000-c27a-11eb-970d-6903fe57a783.png)

---

## Usage

![https://user-images.githubusercontent.com/72953899/120222175-7e8e8480-c27a-11eb-83fc-f3edb2889451.png](https://user-images.githubusercontent.com/72953899/120222175-7e8e8480-c27a-11eb-83fc-f3edb2889451.png)

> 회원가입 및 로그인

Email 타입의 ID, 8자 이상의 password

![https://user-images.githubusercontent.com/72953899/120222168-7b939400-c27a-11eb-8799-064a77cc55c6.png](https://user-images.githubusercontent.com/72953899/120222168-7b939400-c27a-11eb-8799-064a77cc55c6.png)

> 메인 메뉴의 녹음 기능

버튼을 눌러서 녹음 시작 및 강의명, 강의자 정보 입력 후 데이터 생성

![https://user-images.githubusercontent.com/72953899/120222180-81897500-c27a-11eb-8dcd-6216eda82069.png](https://user-images.githubusercontent.com/72953899/120222180-81897500-c27a-11eb-8dcd-6216eda82069.png)

> PDF 생성 기능

강의 날짜를 입력 후(생략 가능) 표지에 강의 수강일을 표시하여 PDF 파일 생성, 다운로드

![https://user-images.githubusercontent.com/72953899/120222187-83533880-c27a-11eb-964f-4c86cdabdab4.png](https://user-images.githubusercontent.com/72953899/120222187-83533880-c27a-11eb-964f-4c86cdabdab4.png)

> 내 수강 목록

여태 수강한 강의의 Script를 Board 형태로 확인 및 재출력

---

## Feature

1. 강의 녹음 및 녹음 파일 Script로 변환 후 PDF로 생성, 다운로드
2. 이전의 기록 관리

---

## Upcoming - Feature

1. 회원 프로필 정보 설정
2. 정확도 향상

---

## Getting Started

1. git clone

```html
git clone https://github.com/Park-KwonSoo/LectureScript.git
```

2. module install

```html
#Directory : client
npm install
```

3. key export

```html
#Directory : server/lectureScript
export GOOGLE_APPLICATION_CREDENTIALS="KEY PATH"
```

4. server, client on

```html
#Directory : client
npm start
```

```html
#Directory : server/lectureScript
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
```

---

## License

---