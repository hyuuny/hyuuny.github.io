---
title: 의존성 주입(Dependency Injection)
categories:
- spring
tags: 
- 2021년 11월

last_modified_at: 2021-11-06T14:00:00+09:00
toc: true
---

DI는 디자인 패턴으로 크게 다음과 같이 4가지 방법이 있다.
- 생성자 주입
- setter 주입
- 필드 주입(@Autowired)
- 일반 메서드 주입

## <span style="color:MediumSeaGreen">생성자 주입</span>
- 이름 그대로 생성자를 통해서 의존 관계를 주입 받는 방법
- 생성자 호출 시점에 **단 1번만 호출**되는 것이 보장된다.
- **불변, 필수** 의존 관계에 사용

```java
@Component
public class OrderServiceImpl implements OrderService {

    private final MemberRepository memberRepository;
    private final DiscountPolicy discountPolicy;

    @Autowired
    public OrderServiceImpl(MemberRepository memberRepository, DiscountPolicy discountPolicy) {
        this.memberRepository = memberRepository;
        this.discountPolicy = discountPolicy;
    }

}
```  
<br>
**생성자가 1개만 있으면 `@Autowired`를 생략해도 자동 주입 된다.** (스프링 빈에만 해당)

```java
@Component
public class OrderServiceImpl implements OrderService {

    private final MemberRepository memberRepository;
    private final DiscountPolicy discountPolicy;

    // 생성자가 1개일 경우, @Autowired 생략 가능
    public OrderServiceImpl(MemberRepository memberRepository, DiscountPolicy discountPolicy) {
        this.memberRepository = memberRepository;
        this.discountPolicy = discountPolicy;
    }

}
```  

***

## <span style="color:MediumSeaGreen">setter 주입</span>
- 필드의 값을 변경하는 수정자 메서드(setter)를 통해서 의존관계를 주입하는 방법
- **선택, 변경** 가능성이 있는 의존 관계에 사용

```java
@Component
public class OrderServiceImpl implements OrderService {
    
    private MemberRepository memberRepository;
    private DiscountPolicy discountPolicy;

    @Autowired
    public void setMemberRepository(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Autowired
    public void setDiscountPolicy(DiscountPolicy discountPolicy) {
        this.discountPolicy = discountPolicy;
    }

}
```
- **`@Autowired`의 기본 동작은 주입할 대상이 없으면 오류가 발생**하므로, 주입할 대상이 없어도 동작하게 하려면 `@Autowired(required = false)`로 지정해야 한다.

***

## <span style="color:MediumSeaGreen">필드 주입(@Autowired)</span>
- 이름 그대로 필드에 바로 주입하는 방법
- 코드가 간결해서 많은 개발자들을 유혹하지만, 외부에서 변경이 불가능해서 테스트 하기 힘들다.
- DI 프레임워크가 없으면 아무것도 할 수 없다.
- **아래 두 경우를 제외하곤, 사용하지 말자!**
    - 애플리케이션의 실제 코드와 관계 없는 **테스트 코드**
    - 스프링 설정을 목적으로 하는 @Configuration 같은 곳에서만 특별한 용도로 사용

```java
@Component
public class OrderServiceImpl implements OrderService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private DiscountPolicy discountPolicy;
}
```
- 순수한 자바 테스트 코드에는 `@Autowired`가 동작하지 않는다. `@SpringBootTest`처럼 스프링 컨테이너를 테스트에 통합한 경우에만 가능

***

## <span style="color:MediumSeaGreen">일반 메서드 주입</span>
- 일반 메서드를 통해서 주입 받는 방법
- 한번에 **여러 필드**를 주입 받을 수 있다.
- **일반적으로 잘 사용하지 않는다.**

```java
@Component
public class OrderServiceImpl implements OrderService {

    private MemberRepository memberRepository;
    private DiscountPolicy discountPolicy;

    @Autowired
    public void init(MemberRepository memberRepository, DiscountPolicy discountPolicy) {
        this.memberRepository = memberRepository;
        this.discountPolicy = discountPolicy;
    }

}
```

