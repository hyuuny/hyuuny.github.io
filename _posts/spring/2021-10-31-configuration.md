---
title: Configuration과 Singleton
categories:
- spring
tags: 
- 2021년 10월

last_modified_at: 2021-10-31T14:00:00+09:00
toc: true
---

```java
 @Configuration
  public class AppConfig {

      @Bean
      public MemberService memberService() {
          return new MemberServiceImpl(memberRepository());
      }

      @Bean
      public OrderService orderService() {
          return new OrderServiceImpl(memberRepository(), discountPolicy());
      }

      @Bean
      public MemberRepository memberRepository() {
          return new MemoryMemberRepository();
      }
    ... 

}
```

- memberService 빈을 만드는 코드를 보면 `memberRepository()`를 호출한다.
- orderService 빈을 만드는 코드도 동일하게 `memberRepository()`를 호출한다.

`new연산자`를 통해 각각 다른 2개의 `MemoryMemberRepository`가 생성되면서 싱글톤이 깨지는 것 처럼 보이는데, 스프링 컨테이너는 `@Bean`이 붙은 메서드를 한 번만 호출해서 등록하고 이를 재사용한다.

***

## <span style="color:MediumSeaGreen">@Configuration과 바이트코드 조작</span>
스프링 컨테이너는 싱글톤 레지스트리다. 따라서 스프링 빈이 싱글톤이 되도록 보장해주어야 한다. 그런데 스프링이 자바 코드까지 어떻게 하기는 어렵다. 위 코드를 보면 분명 3번 호출되어야 하는 것이 맞다. 그래서 스프링은 클래스의 바이트코드를 조작하는 라이브러리를 사용한다.  
모든 비밀은 **@Configuration 을 적용한 AppConfig**에 있다.  

```java
@Test
void configurationDeep() {
    ApplicationContext ac = new
    AnnotationConfigApplicationContext(AppConfig.class);

    //AppConfig도 스프링 빈으로 등록된다.
    AppConfig bean = ac.getBean(AppConfig.class);
    System.out.println("bean = " + bean.getClass());
    //출력: bean = class hello.core.AppConfig$$EnhancerBySpringCGLIB$$bd479d70
}
```
- `AnnotationConfigApplicationContext`에 파라미터로 넘긴 값은 스프링 빈으로 등록된다. 그래서 AppConfig도 스프링 빈이 된다.

순수한 클래스라면 **`class hello.core.AppConfig`**와 같이 출력되어야 하지만,  

AppConfig 스프링 빈을 조회해서 클래스 정보를 출력해보면  
**`class hello.core.AppConfig$$EnhancerBySpringCGLIB$$bd479d70`**와 같이 출력된다.

스프링 빈을 조회해서 출력한 클래스 명에 xxxCGLIB가 붙은 것을 확인 할 수 있는데, 이것은 내가 만든 클래스가 아니라 **스프링이 CGLIB라는 바이트코드 조작 라이브러리를 사용해서 AppConfig 클래스를 상속받은 임의의 다른 클래스를 만들고, 이를 스프링 빈으로 등록했기 때문이다.**

![img.png](/assets/images/spring/configuration.png)  
- **AppConfig를 상속받은 임의의 클래스가 싱글톤이 보장되도록 해준다.**  
<br>

**AppConfig@CGLIB 예상 코드**

```java
@Bean
    public MemberRepository memberRepository() {

        if (memoryMemberRepository가 이미 스프링 컨테이너에 등록되어 있으면?) { 
            return 스프링 컨테이너에서 찾아서 반환;
        } else { //스프링 컨테이너에 없으면
            기존 로직을 호출해서 MemoryMemberRepository를 생성하고 스프링 컨테이너에 등록
            return 반환
        } 

}
```
- @Bean이 붙은 메서드마다 이미 스프링 빈이 존재하면 존재하는 빈을 반환하고, 스프링 빈이 없으면 생성해서 스프링 빈으로 등록하고 반환하는 코드가 동적으로 만들어진다.
    - 그로 인해 싱글톤이 보장 됨 
- AppConfig@CGLIB는 AppConfig의 자식 타입이므로, AppConfig 타입으로 조회 할 수 있다.  
<br>

**@Configuration을 적용하지 않고, @Bean만 적용한 경우**
- 스프링 빈으로 등록되지만, 매번 객체를 생성한다.(싱글톤을 보장하지 않음)