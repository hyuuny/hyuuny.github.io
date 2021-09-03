---
title: 객체와 테이블 매핑
categories:
- JPA
tags: 
- 2021년 09월

last_modified_at: 2021-09-03T14:00:00+09:00
toc: true
---

## <span style="color:MediumSeaGreen">@Entity</span>
- @Entity가 붙은 클래스는 JPA가 관리하게 된다.
- JPA를 사용해서 테이블과 매핑할 클래스는 @Entity를 필수로 선언해야 한다.
- @Entity를 사용할 때는 다음과 같은 주의사항이 있다.
    - 하이버네이트는 `프록시 DB 연산 결과를 상속한 클래스의 기본 생성자를 호출하여 매핑한다`. 이때, 알맞게 결과 값을 넣어주기 위해서는 `public 또는 protected 레벨의 기본 생성자`가 필요하다.
    - final 클래스, enum, interface, inner 클래스 사용 X
    - 저장할 필드에 final 사용 X

```java
@Entity
public class Member{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    public Member(){
    }

    public Member(final Long id, final String name){
        this.id = id;
        this.name = name;
    }

}
```

* * *

<span style="color:DodgerBlue">name</span>
- name 속성을 사용하여 JPA에서 사용할 엔티티 이름을 지정할 수 있다.
- 기본값은 클래스의 이름을 그대로 사용한다.
- `같은 클래스 이름이 없다면 가급적 기본값을 사용`하는 것이 좋다.

```java
@Entity(name="account") // Member 클래스를 account라는 이름으로 사용하게 된다.
public class Member{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    public Member(){
    }

    public Member(final Long id, final String name){
        this.id = id;
        this.name = name;
    }
}
```

* * *

## <span style="color:MediumSeaGreen">@Table</span>
- @Table은 엔티티와 매핑할 테이블을 지정한다.

|속성|기능|기본값|
|:------:|:---:|:---:|
|name|매핑할 테이블 이름 지정|엔티티 이름을 사용|
|catalog|데이터베이스 catalog 매핑||
|schema|데이터베이스 schema 매핑||
|uniqueConstraints(DDL)|DDL 생성시에 유니크 제약 조건 생성||

```java
@Entity
@Table(name="MBR") // Table명을 MBR로 지정한다.
public class Member{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    public Member(){
    }

    public Member(final Long id, final String name){
        this.id = id;
        this.name = name;
    }

}
```

![img.png](/assets/images/jpa/entity/table.png)
- **테이블명이 MBR임을 확인**할 수 있다.

* * *

## <span style="color:MediumSeaGreen">데이터베이스 스키마 자동 생성</span>
- DDL을 애플리케이션 실행 시점에 자동 생성
- 테이블 중심 → 객체 중심
- 데이터베이스 방언을 활용해서 데이터베이스에 맞는 적절한 DDL 생성
- **이렇게 생성된 DDL은 개발 장비에서만 사용**하자
- 생성된 DDL은 운영서버에서는 사용하지 않거나, 적절히 다듬은 후 사용

###### <span style="color:DodgerBlue">데이터베이스 스키마 자동 생성 - 속성</span>

|옵션|설명|
|:------:|:---:|
|create|기존테이블 삭제 후 다시 생성(DROP + CREATE)|
|create-drop|create와 같으나, 종료시점에 테이블 DROP|
|update|변경분만 반영**(운영DB에는 사용하지 말자)**|
|validate|엔티티와 테이블이 정상 매핑되었는지만 확인|
|none|사용하지 않음|

###### <span style="color:DodgerBlue">데이터베이스 스키마 자동 생성 - 주의</span>
- **운영 장비에서는 절대 create, create-drop, update 사용하면 안됨.**
- 개발 초기 단계는 create 또는 update
- 테스트 서버는 update 또는 validate
- 스테이징과 운영 서버는 validate 또는 none

###### <span style="color:DodgerBlue">DDL 생성 기능</span>
- 제약조건 추가 : 회원 이름 필수, 10자 초과 X
    ```java
    @Column(nullable = false, length = 10)
    ```
- 유니크 제약조건 추가
    ```java
    @Table(uniqueConstraints={@UniqueConstraint(name = "NAME_AGE_UNIQUE", columnNames = {"NAME", "AGE"})})
    ```
- DDL 생성 기능은 `DDL을 자동 생성할 때만 사용되고 JPA의 실행 로직에는 영향을 주지 않는다.`


