---
title: JPA - primitive error(Null value was assigned to a property ~~~ of primitive type setter of)
categories:
- JPA
tags: 
- 2021년 12월

last_modified_at: 2021-12-27T14:00:00+09:00
toc: true
---
<br>

스프링으로 JPA를 사용해서 개발하다보면 아래와 같은 에러를 마주치곤 한다.  


```java
Null value was assigned to a property ~~~ of primitive type setter of
```

<br>

**이유**  
하이버네이트는 내부적으로 setter메소드를 사용해서 `조회 결과와 객체(Dto 또는 Entity)를 Mapping`하게 되는데, 조회 결과의 `null값을 primitive 타입의 변수에 저장하려 할 때 발생`하는 것이다.
<br>

**해결 방법**  
위 문제는 아래와 같은 방법으로 해결할 수 있다.
- 매핑될 변수를 reference타입으로 변경
- DB에 default 값 할당