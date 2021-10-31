---
title: 컴포넌트 스캔(@ComponentScan)
categories:
- spring
tags: 
- 2021년 11월

last_modified_at: 2021-11-01T14:00:00+09:00
toc: true
---

스프링은 설정 정보가 없어도 없어도 자동으로 스프링 빈을 등록하는 컴포넌트 스캔이라는 기능을 제공한다. 또 의존 관계도 자동으로 주입하는 `@Autowired`도 제공한다.

```java
@Configuration
public class AutoAppConfig {

}
```

- 컴포넌트 스캔을 사용하려면 먼저 `@ComponentScan`을 설정 정보에 붙여주면 된다. 
- 기존의 AppConfig와는 다르게 `@Bean`으로 등록한 클래스가 하나도 없다.

`@Configuration`이 컴포넌트 스캔의 대상이 된 이유도 `@Configuration` 소스코드를 열어보면 `@Component` 애노테이션이 붙어있기 때문이다.
![img.png](/assets/images/spring/configuration1.png)  

***

**컴포넌트 스캔의 대상이 될 클래스에 `@Component` 애노테이션을 붙여주자.**
```java
@Component
public class MemoryMemberRepository implements MemberRepository {
}
```

```java
@Component
public class RateDiscountPolicy implements DiscountPolicy {
}
```

```java
@Component
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
}
```

```java
@Component
public class OrderServiceImpl implements OrderService {

    private final MemberRepository memberRepository;
    private final DiscountPolicy discountPolicy;

    @Autowired
    public OrderServiceImpl(MemberRepository memberRepository, 
                            DiscountPolicy discountPolicy
    ) {
        this.memberRepository = memberRepository;
        this.discountPolicy = discountPolicy;
    }
}
```

- 이전에 AppConfig에서는 `@Bean`으로 직접 설정 정보를 작성했고, 의존관계도 직접 명시했다. **이제는 이런 설정 정보 자체가 없기 때문에, 의존관계 주입도 이 클래스 안에서 해결해야 한다**.
- `@Autowired`는 의존관계를 자동으로 주입해준다

***

위 설정 정보로 테스트 해본 결과는 아래와 같다.
```java
public class AutoConfigTest {

  @Test
  void basicScan() {
    ApplicationContext ac = new AnnotationConfigApplicationContext(AutoAppConfig.class);

    MemberService memberService = ac.getBean(MemberService.class);
    Assertions.assertThat(memberService).isInstanceOf(MemberService.class);
  }

}
```

![img.png](/assets/images/spring/component-scan-test.png)  
- 로그의 3~6 번째 줄을 잘 보면 컴포넌트 스캔이 잘 동작하는 것을 확인할 수 있다.

```
ClassPathBeanDefinitionScanner - Identified candidate component class:
.. RateDiscountPolicy.class
.. MemberServiceImpl.class
.. MemoryMemberRepository.class
.. OrderServiceImpl.class
```

*** 

## <span style="color:MediumSeaGreen">컴포넌트 스캔과 자동 의존관계 주입 동작 방식</span>

**1. @ComponenetScan**
![img.png](/assets/images/spring/component-scan1-1.png)  
- `@ComponentScan`은 `@Component`가 붙은 모든 클래스를 스프링 빈으로 등록한다.
- 이때 스프링 빈의 기본 이름은 클래스명을 사용하되, 맨 앞글자만 소문자를 사용한다.
    - **빈 이름 기본 전략** : MemberServiceImpl 클래스 memberServiceImpl
    - **빈 이름 직접 지정** : 만약 스프링 빈의 이름을 직접 지정하고 싶으면 `@Component("memberService2")` 이런식으로 이름을 부여하면 된다.

<br>

**2. @Autowired 의존관계 자동 주입**
![img.png](/assets/images/spring/component-scan1-2.png)  
- 생성자에 `@Autowired`를 지정하면, 스프링 컨테이너가 자동으로 해당 스프링 빈을 찾아서 주입한다.
- 이때 기본 조회 전략은 **타입이 같은** 빈을 찾아서 주입한다.
    - `getBean(MemberRepository.class)`와 동일하다고 이해하면 된다.  
<br>

![img.png](/assets/images/spring/component-scan1-3.png)  
- 생성자에 파라미터가 많아도 다 찾아서 자동으로 주입한다.