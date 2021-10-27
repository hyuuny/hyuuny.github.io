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

***

## <span style="color:MediumSeaGreen">스프링 컨테이너 생성 과정</span>
- 스프링 컨테이너는 XML(거의 사용 안 함)을 기반으로 만들 수 있고, 애노테이션 기반의 자바 설정 클래스로 만들 수 있다.
- 더 정확하게는 스프링 컨테이너를 부를 때 BeanFactory , ApplicationContext 로 구분하지만,  BeanFactory 를 직접 사용하는 경우는 거의 없으므로 일반적으로 ApplicationContext 를 스프링 컨테이너라 한다.  
<br>

**1. 스프링 컨테이너 생성**
![img.png](/assets/images/spring/application-context1.png) 
- 스프링 컨테이너를 생성할 때는 구성 정보(여기서는 AppConfig.class)를 지정해줘야 한다.  
<br>

**2. 스프링 빈 등록**
![img.png](/assets/images/spring/application-context2.png) 
- 스프링 컨테이너는 파라미터 넘어온 설정 클래스 정보를 읽어, @Bean 으로 등록된 메서드의 반환 타입을 스프링의 빈으로 등록한다.  
<br>

**3. 스프링 빈 의존관계 설정 - 준비**
![img.png](/assets/images/spring/application-context3.png)  
<br>

**4. 스프링 빈 의존관계 설정 - 완료**
![img.png](/assets/images/spring/application-context4.png) 
- 스프링 컨테이너는 설정 정보를 참고하여 의존관계를 주입(DI)한다.  
<br>

***

## <span style="color:MediumSeaGreen">BeanFactory와 ApplicationContext</span>
![img.png](/assets/images/spring/application-context5.png)  

###### **BeanFactory**
- 스프링 컨테이너의 최상위 인터페이스다.
- 스프링 빈을 관리하고 조회하는 역할을 담당한다.
- getBean() 을 제공한다.
- 지금까지 우리가 사용했던 대부분의 기능은 BeanFactory가 제공하는 기능이다.  

***

![img.png](/assets/images/spring/application-context6.png)  

###### **ApplicationContext**
- BeanFactory 기능을 모두 상속받아서 제공한다.  

- **메시지소스를 활용한 국제화 기능(MessageSource)**
  - 한국에서 들어오면 한국어로, 영어권에서 들어오면 영어로 출력
- **환경변수(EnvironmentCapable)**
  - 로컬, 개발, 운영등을 구분해서 처리
- **애플리케이션 이벤트(ApplicationEventPublisher)**
  - 이벤트를 발행하고 구독하는 모델을 편리하게 지원
- **편리한 리소스 조회(ResourceLoader)**
  - 파일, 클래스패스, 외부 등에서 리소스를 편리하게 조회
