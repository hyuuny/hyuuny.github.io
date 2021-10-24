---
title: ApplicationContext
categories:
- spring
tags: 
- 2021년 10월

last_modified_at: 2021-10-25T14:00:00+09:00
toc: true
---

## <span style="color:MediumSeaGreen">Config 기반 Bean 설정</span>
```java
@Configuration
public class AppConfig {

  @Bean
  public MemberService memberService() {
    return new MemberServiceImpl(memberRepository());
  }

  @Bean
  public MemberRepository memberRepository() {
    return new MemoryMemberRepository();
  }

  @Bean
  public OrderService orderService() {
    return new OrderServiceImpl(memberRepository(), discountpolicy());
  }

  @Bean
  public DiscountPolicy discountpolicy() {
    return new RateDiscountPolicy();
  }

}
```  

- AppConfig에 설정을 구성한다는 뜻의 `@Configuration`을 붙여준다.
- 각 메서드에 `@Bean`을 붙여준다. 이렇게 하면 **메서드에서 반환하는 객체를 스프링 컨테이너에 스프링 빈으로 등록**한다.

***

## <span style="color:MediumSeaGreen">스프링 컨테이너에 등록한 Bean 꺼내서 사용하기</span>
```java
// parameter : @Coufiguration이 붙은 구성 클래스
 ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfig.class); 
// parameter : 빈이름, 반환타입
MemberService memberService = applicationContext.getBean("memberService", MemberService.class);/

Member member = new Member(1L, "memberA", Grade.VIP);
memberService.join(member);
```

- **ApplicationContext를 스프링 컨테이너**라 한다.
- 기존에는 개발자가 AppConfig 를 사용해서 직접 객체를 생성하고 DI를 했지만, 이제부터는 스프링 컨테이너를 통해서 사용한다.
- 스프링 컨테이너는 `@Configuration`이 붙은 AppConfig 를 설정(구성) 정보로 사용한다. 여기서 `@Bean`이라 적힌 메서드를 모두 호출해서 반환된 객체를 스프링 컨테이너에 등록한다. 이렇게 **스프링 컨테이너에 등록된 객체를 스프링 빈**이라 한다.
- 스프링 빈은 `@Bean`이 붙은 **메서드의 명을 스프링 빈의 이름으로 사용**한다.
- 이전에는 개발자가 필요한 객체를 AppConfig 를 사용해서 직접 조회했지만, 이제부터는 스프링 컨테이너를 통해서 필요한 스프링 빈(객체)를 찾아야 한다. 스프링 빈은 `applicationContext.getBean()` 메서드를 사용해서 찾을 수 있다.
- 기존에는 개발자가 직접 자바코드로 모든 것을 했다면 이제부터는 스프링 컨테이너에 객체를 스프링 빈으로 등록하고, 스프링 컨테이너에서 스프링 빈을 찾아서 사용하도록 변경되었다.  
<br>

![img.png](/assets/images/spring/spring-context.png)  
- 스프링 부트 실행 시, `@Bean`이 만들어지는 모습