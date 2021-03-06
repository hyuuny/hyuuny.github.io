---
title: 영속성 컨텍스트
categories:
- JPA
tags: 
- 2021년 08월

last_modified_at: 2021-08-30T14:00:00+09:00
toc: true
---

## <span style="color:MediumSeaGreen">영속성 컨텍스트</span>
- 영속성 컨텍스트란, **엔티티를 영구 저장하는 환경이라는 뜻**이다.
- EntityManager의 persist()를 사용하여, Entity를 저장하고 **영속성 컨텍스트로 관리**한다.
- 영속성 컨텍스트는 **논리적인 개념**으로 눈에 보이지 않는다. 
- EntityManager를 통해서 영속성 컨텍스트에 접근한다.

![img.png](/assets/images/jpa/entity-manager-factory.png)

## <span style="color:MediumSeaGreen">엔티티의 생명주기</span>
엔티티의 생명주기는 다음과 같이 총 4단계로 구성됩니다.

- 비영속(new/transient)
    - 영속성 컨텍스트와 전혀 **관계가 없는** 새로운 상태

```java
// 객체만 생성하였으므로, 비영속 상태
Member member = new Member();
member.setEmail("shyune@knou.ac.kr");
member.setUsername("hyuuny");
```

- 영속(managed)
    - 영속성 컨텍스트에 **관리되는** 상태

```java
// 아직은 비영속 상태
Member member = new Member();
member.setEmail("shyune@knou.ac.kr");
member.setUsername("hyuuny");

EntityManager em = emf.createEntityManager();
em.getTransaction().begin(); // 트랜잭션 시작!

// 객체를 저장한 상태(영속)
// 영속성 컨텍스트가 관리하는 객체가 된다.
em.persist(member);
```

- 준영속(detached)
    - 영속성 컨텍스트에 저장되었다가 **분리된** 상태

```java
// 회원 엔티티를 영속성 컨텍스트에서 분리, 준영속 상태
em.detach(member);
```

- 삭제(removed)
    - 말 그대로 **삭제**된 상태

```java
// 객체를 삭제한 상태(삭제)
em.remove(member);
```


![img.png](/assets/images/jpa/entity-life.png)

## <span style="color:MediumSeaGreen">영속성 컨텍스트</span>

###### <span style="color:DodgerBlue">1차 캐시</span>
- 영속성 컨텍스트는 내부에 1차 캐시를 갖고 있다.
- **1차 캐시는 Transaction내에서만** 효과가 있다.(Transaction이 끝나면 사라짐)

![img.png](/assets/images/jpa/cache0.png)

```java
// 엔티티를 생성한 상태(비영속)
Member member = new Member();
member.setId("member1");
member.setUsername("hyuuny");

// 엔티티를 영속화
em.persist(member);
```   

-  **객체를 저장하면 영속성 컨텍스트에 의해 관리**된다.

* * *

![img.png](/assets/images/jpa/cache1.png)

```java
Member member = new Member();
member.setId("member1");
member.setUsername("hyuuny");

// 1차 캐시에 저장됨
em.persist(member);

// 1차 캐시에서 조회
Member findMember = em.find(Member.class, "member1");
```

- member 객체를 **조회(find)하면 1차캐시에서 조회**한다.

* * *

```java
Member findMember = em.find(Member.class, "member2");
```

![img.png](/assets/images/jpa/cache2.png)

- member2는 **1차 캐시에 없으므로, DB에서 값을 조회**한다.

* * *

###### <span style="color:DodgerBlue">동일성(identity) 보장</span>
- JPA는 **식별자(pk)가 같으면 항상 true**
- 1차 캐시로 반복 가능한 읽기(REPEATABLE READ) 등급의 트랜잭션 격리 수준을 데이터베이스가 아닌 애플리케이션 차원에서 제공

```java
Member m1 = em.find(Member.class, "member1");
Member m2 = em.find(Member.class, "member1");

System.out.println(m1 == m2); // true
```
* * *

###### <span style="color:DodgerBlue">트랜잭션을 지원하는 쓰기 지연(transaction write-behind)</span>
- JPA는 **엔티티를 등록할 때**, Insert Query를 보내지 않고 **모아두었다가 transaction.commit하는 순간 데이터베이스에 Insert Query를 보낸다.**

```java 
EntityManager em = emf.createEntityManager();
EntityTransaction transaction = em.getTransaction();

// 엔티티 매니저는 데이터 변경시 트랜잭션을 시작해야 한다.
transaction.begin(); // 트랜잭션 시작

em.persist(memberA);
em.persist(memberB);
// 여기까지 Insert Query를 DB에 보내지 않는다.

// 커밋하는 순간, DB에 Insert Query를 보낸다.
transaction.commit(); // 트랜잭션 커밋
```

![img.png](/assets/images/jpa/write1.png)
- Insert Query를 바로 보내지 않고 **쓰기 지연 SQL 저장소에 모아둔다.**   

![img.png](/assets/images/jpa/write2.png)
- **쓰기 지연 SQL 저장소**에 저장된 Query를 **commit** 시점에 DB에 보낸다.

* * *

###### <span style="color:DodgerBlue">변경 감지(Dirty Checking)</span>
- JPA는 Transaction commit 시점에 **엔티티(커밋 시점 객체)와 스냅샷(최초에 DB에서 읽어온 객체)을 비교**하여 서로 **다를 경우, Update Query를 DB에 반영**한다.

```java
EntityManager em = emf.createEntityManager();
EntityTransaction transaction = em.getTransaction();
transaction.begin(); // 트랜잭션 시작

// 영속 엔티티 조회
Member memberA = em.find(Member.class, "memberA");

// 영속 데이터 수정
memberA.setUsername("Lee");
memberA.setAge(10);

// commit 시점에 DB에 Update Query를 보낸다.
transaction.commit(); // 트랜잭션 커밋
```

![img.png](/assets/images/jpa/dirty-checking.png)

* * *

###### <span style="color:DodgerBlue">지연 로딩(Lazy Loading)</span>


* * *


