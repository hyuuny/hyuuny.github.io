---
title: 조회 빈이 2개 이상일 때 문제 해결
categories:
- spring
tags: 
- 2021년 11월

last_modified_at: 2021-11-07T14:00:00+09:00
toc: true
---

`@Autowired`는 타입(Type)으로 조회한다. 이때 선택된 빈이 **2개 이상**일 때 문제가 발생한다.  

예제를 위해 `DiscountPolicy`의 하위 타입인 `FixDiscountPolicy`와 `RateDiscountPolicy`를 스프링 빈으로 선언해보자.

```java
@Component
public class FixDiscountPolicy implements DiscountPolicy {

}
```

```java
@Component
public class RateDiscountPolicy implements DiscountPolicy {

}
```
<br>
여기서 다음과 같이 의존관계 자동 주입을 실행하면 
```java
@Autowired
private DiscountPolicy discountPolicy
```
`NoUniqueBeanDefinitionException` 예외가 발생한다.

```
NoUniqueBeanDefinitionException: No qualifying bean of type
'hello.core.discount.DiscountPolicy' available: expected single matching bean
but found 2: fixDiscountPolicy,rateDiscountPolicy
```
오류메시지를 읽어보면 하나의 빈을 기대했는데 fixDiscountPolicy, rateDiscountPolicy **2개가 발견**되었다고 알려준다.  

이때 직접 하위 타입으로 지정할 수 도 있지만, 하위 타입으로 지정하는 것은 DIP를 위배하고 유연성이 떨어진다. 그리고 이름만 다르고, 완전히 똑같은 타입의 스프링 빈이 2개 있을 때 해결이 안된다.  

스프링 빈을 수동 등록해서 문제를 해결해도 되지만, 의존 관계 자동 주입에서 해결하는 다음과 같이 3가지가 있다.
- `@Autowired` 필드 명 매칭
- `@Qualifier` ->  `@Qualifier`끼리 매칭 빈 이름 매칭
-  `@Primary` 사용

***

## <span style="color:MediumSeaGreen">`@Autowired` 필드 명 매칭</span>
`@Autowired`는 **타입 매칭을 시도**하고, 타입 매칭 결과로 **여러 빈이 있으면 필드 이름, 파라미터 이름으로 빈 이름을 추가 매칭**한다.
1. 타입 매칭
2. 타입 매칭의 결과가 2개 이상일 때 필드 명, 파라미터 명으로 빈 이름 매칭  

<br>
**기존 코드**
```java
@Autowired
private DiscountPolicy discountPolicy
```  
<br>

**필드 명을 빈 이름으로 변경**
```java
@Autowired
private DiscountPolicy rateDiscountPolicy
```
- 필드 명이 rateDiscountPolicy 이므로 정상 주입된다.

***

## <span style="color:MediumSeaGreen">`@Qualifier`</span>
`@Qualifier`는 **추가 구분자를 붙여주는** 방법이다. 주입시 추가적인 방법을 제공하는 것이지 빈 이름을 변경하는 것은 아니다.
1. 빈 등록시 @Qualifier를 붙여 준다. 
2. 주입시에 @Qualifier를 붙여주고 등록한 이름을 적어준다.

```java
@Component
@Qualifier("mainDiscountPolicy")
public class RateDiscountPolicy implements DiscountPolicy {

}
```

```java
@Component
@Qualifier("fixDiscountPolicy")
public class FixDiscountPolicy implements DiscountPolicy {

}
```  
<br>

**생성자 자동 주입 예시**
```java
@Autowired
public OrderServiceImpl(MemberRepository memberRepository,
                       @Qualifier("mainDiscountPolicy") DiscountPolicy discountPolicy) {
    this.memberRepository = memberRepository;
    this.discountPolicy = discountPolicy;
}
```  
<br>

**setter 자동 주입 예시**
```java
@Autowired
public DiscountPolicy setDiscountPolicy(@Qualifier("mainDiscountPolicy") DiscountPolicy discountPolicy) {
    return discountPolicy;
}
```
`@Qualifier`로 주입할 때 `@Qualifier("mainDiscountPolicy")`를 찾지 못하면, mainDiscountPolicy라는 이름의 스프링 빈을 추가로 찾는다. 하지만 `@Qualifier`는 `@Qualifier`를 찾는 용도로만 사용하는것이 명확하고 좋다.  
<br>

**@Qualifier 정리**
1. `@Qualifier`끼리 매칭
2. 빈 이름 매칭
3. `NoSuchBeanDefinitionException` 예외 발생

***

## <span style="color:MediumSeaGreen">`@Primary`</span>
`@Primary`는 **우선순위**를 정하는 방법이다. `@Autowired`시에 여러 빈이 매칭되면 `@Primary`가 우선권을 가진다.  

```java
@Component
@Primary // @Primary를 사용하여 RateDiscountPolicy가 우선권을 갖는다.
public class RateDiscountPolicy implements DiscountPolicy {

}

@Component
public class FixDiscountPolicy implements DiscountPolicy {

}
```  
<br>

**@Primary를 이용한 생성자, setter 자동 주입 예시**
```java
//생성자 자동 주입
@Autowired
public OrderServiceImpl(MemberRepository memberRepository, DiscountPolicy discountPolicy) {
    this.memberRepository = memberRepository;
    this.discountPolicy = discountPolicy;
}

//setter 자동 주입
@Autowired
public DiscountPolicy setDiscountPolicy(DiscountPolicy discountPolicy) {
    return discountPolicy;
}

```
`@Primary`를 이용하여 생성자 자동 주입과 setter 자동주입을 해보면 문제 없이 잘 동작하는 것을 확인할 수 있다.  

***

**@Primary, @Qualifier 활용**  
코드에서 자주 사용하는 메인 데이터베이스의 커넥션을 획득하는 스프링 빈이 있고, 코드에서 특별한 기능으로 가끔 사용하는 서브 데이터베이스의 커넥션을 획득하는 스프링 빈이 있다고 생각해보자. 메인 데이터베이스의 커넥션을 획득하는 스프링 빈은 `@Primary`를 적용해서 조회하는 곳에서 `@Qualifier` 지정 없이 편리하게 조회하고, 서브 데이터베이스 커넥션 빈을 획득할 때는 `@Qualifier`를 지정해서 명시적으로 획득 하는 방식으로 사용하면 코드를 깔끔하게 유지할 수 있다. 물론 이때 메인 데이터베이스의 스프링 빈을 등록할 때 `@Qualifier`를 지정해주는 것은 상관없다.  

**우선순위**  
`@Primary`는 **기본값 처럼 동작**하는 것이고, `@Qualifier`는 **매우 상세하게 동작**한다.  
스프링은 **자동보다는 수동**이, **넒은 범위의 선택권 보다는 좁은 범위**의 선택권이 우선 순위가 높다. 따라서 `@Primary`보다 `@Qualifier`가 우선권이 **높다.**

