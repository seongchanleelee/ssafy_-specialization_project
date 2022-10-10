# 우리!어디가?

**하둡을 이용한 여행지 추천 챗봇 서비스**

## UCC

클릭하면 영상으로 이동됩니다.

<a href="https://youtu.be/VZCF5isKfSs"><img src="https://i.ibb.co/SR9gkVn/VZCF5is-Kf-Ss-sddefault.jpg" alt="UCC" border="0"></a>

</br>

## 프로젝트 개요

### 1. 진행 기간

2022.08.29 ~ 2022.10.06 (6주)

</br>

### 2. 목표

- 챗봇 형식을 가진 여행지 추천 웹 서비스
- 여행 관련 글을 크롤링을 모아 Hadoop MapReduce를 이용해 분석하고 Sqoop을 사용하여 RDBMS에 옮기기
- 대화하는 듯한  관광지 찾기
- 연속된 대화로 더 세분화된 추천기능
- 모바일 반응형
- 카카오 챗봇   

</br>

### 3. 주요 기술

- 멀티프로세싱을 활용한 크롤링
- MapReduce를 활용한 데이터 처리(형태소 분석)
- Sqoop를 활용한 데이터 저장
- 사용자 질의에 따른 추천지 제공
- 회원이 입력한 데이터를 추천 시스템에 반영하여 답변 질 향상
- 반응형 웹으로 높은 접근성 제공

</br>

### 4. 화면

#### 초기화면

<img src = "https://user-images.githubusercontent.com/86655589/194227333-a41e9925-d39b-485c-85cb-ef3e3f10d929.png">

#### 메인화면

<img src = "https://user-images.githubusercontent.com/86655589/194223726-97ac0a1c-7ce7-4421-a5f2-0eedfd0cd9e5.jpg">



#### 모바일화면 [초기 / 메인 / 피드]

<img src = "https://user-images.githubusercontent.com/86655589/194229696-79776c94-018a-4bb9-b7d6-28a4c092e622.jpg" width="30%" height="30%">    <img src = "https://user-images.githubusercontent.com/86655589/194228948-9ca140fa-1f90-4b63-83be-915b9d399bcd.jpg" width="30%" height="30%">    <img src = "https://user-images.githubusercontent.com/86655589/194228952-ac3cd750-6d0a-40af-ba0b-7386ddf74cc2.jpg" width="30%" height="30%">



#### 카카오 챗봇

<img src = "https://user-images.githubusercontent.com/86655589/194228955-63ccf26e-125b-4d88-ba32-7c967eb2b426.jpg" width="30%" height="30%">

</br>

## 프로젝트 구조

### 1. 아키텍처

<img src = "https://user-images.githubusercontent.com/86655589/194224291-ab82d65c-b039-4328-b6e1-692bef909eb8.png">

### 2. 와이어 프레임

<img src = "https://user-images.githubusercontent.com/86655589/194224886-d6fce603-dcfc-4c1d-99cc-89e309c2361b.png">

### 3. ERD

<img src = "https://user-images.githubusercontent.com/86655589/194224437-763f8b2d-0b50-463b-adf1-fc35f9c932cf.png">



</br>

## 기술 스택

### 1. 개발 환경

- Notion
- Jira
- Git
- Intellij Community Edition v2021.3.3
- Spring Tool Suite v3.9.14.RELEASE
- VS Code v1.69.2
- GitHub Desktop
- Postman
- MobaXterm
- MySQL WorkBench 8.0 CE

</br>

### 2. 기술 스택

1. FrontEnd

- React v18.2.0
- Redux v4.2.0
- Cloudinary 1.5.0
- node.js v16.16.0
- Javascript
- HTML / CSS

2. BackEnd

- Java v1.8(zulu8)
- SpringBoot v2.7.1

3. DataBase

- MySQL v8.0.30-0ubuntu0.20.04.2

4. Server

- Docker v20.10.17
- Jenkins v2.346.3
- Nginx v1.18.0(Ubuntu)

5. Hadoop

- MapReduce v3.2.1
- Sqoop v1.4.7

</br>

## 팀원

- [홍성준]([yiso22 · GitHub](https://github.com/yiso22)) 팀장 Frontend
- [김희주]([heeejoo0518 · GitHub](https://github.com/heeejoo0518)) Backend
- [이성찬]([seongchanleelee · GitHub](https://github.com/seongchanleelee)) Frontend
- [이승진]([lapera00 · GitHub](https://github.com/lapera00)) Backend
- [이주영]([jyoungl · GitHub](https://github.com/jyoungl)) Backend
- [허은지]([hxxejx · GitHub](https://github.com/hxxejx)) Backend
