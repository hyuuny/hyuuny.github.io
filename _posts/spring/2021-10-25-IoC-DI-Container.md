---
title: IoC, DI, Container
categories:
- spring
tags: 
- 2021년 10월

last_modified_at: 2021-10-25T14:00:00+09:00
toc: true
---

## <span style="color:MediumSeaGreen">제어의 역전(Inversion of Control)</span>
- 기존 프로그램은 클라이언트 구현 객체가 스스로 필요한 서버 구현 객체를 생성하고, 연결하고, 실행했다. 한마디로 구현 객체가 프로그램의 제어 흐름을 스스로 조종했다. 
- AppConfig가 등장한 이후에 구현 객체는 자신의 로직을 실행하는 역할만 담당한다. 프로그램의 제어 흐름은 이제 AppConfig가 가져간다. 
    - 예를 들어서 `OrderServiceImpl` 은 필요한 인터페이스들(`repository`와 같은)을 호출하지만 어떤 구현 객체들이 실행될지 모른다.
- 프로그램에 대한 제어 흐름에 대한 권한은 모두 AppConfig가 가지고 있다. 심지어 `OrderServiceImpl`도 AppConfig가 생성한다. 
    - AppConfig는 `OrderServiceImpl` 이 아닌 `OrderService` 인터페이스의 다른 구현 객체를 생성하고 실행할 수 도 있다. 
- 이렇듯 프로그램의 **제어 흐름을 직접 제어하는 것이 아니라 외부에서 관리하는 것을 제어의 역전(IoC)**이라 한다.  
<br>

<span style="color:DodgerBlue">프레임워크와 라이브러리</span>
- 프레임워크가 내가 작성한 코드를 제어하고, 대신 실행하면 프레임워크이다.
- 내가 작성한 코드가 직접 제어의 흐름을 담당한다면 프레임워크가 아니라 라이브러리다.

***

## <span style="color:MediumSeaGreen">의존관계 주입 DI(Dependency Injection)</span>
```java
public class OrderServiceImpl implements OrderService {
  private final DiscountPolicy discountPolicy;
}
```
- `OrderServiceImpl`은 `DiscountPolicy` 인터페이스에 의존한다. 실제 어떤 구현 객체가 사용될지는
모른다.
- 의존관계는 **정적인 클래스 의존 관계**와, **실행 시점에 결정되는 동적인 객체(인스턴스) 의존 관계** 둘을 분리해서 생각해야 한다.  
<br>

<span style="color:DodgerBlue">정적인 클래스 의존관계</span>
- 클래스가 사용하는 import 코드만 보고 의존관계를 쉽게 판단할 수 있다. 정적인 의존관계는 애플리케이션을 실행하지 않아도 분석할 수 있다.
- `OrderServiceImpl`은 `MemberRepository` , `DiscountPolicy`에 의존한다는 것을 알 수 있다.
그런데 이러한 클래스 의존관계 만으로는 실제 어떤 객체가 `OrderServiceImpl`에 주입 될지 알 수 없다.  

![img.png](/assets/images/spring/di1.png)  

<br>

<span style="color:DodgerBlue">동적인 객체 인스턴스 의존 관계</span>  
- **애플리케이션 실행 시점에** 실제 생성된 객체 인스턴스의 참조가 연결된 의존 관계다.  

![img.png](/assets/images/spring/di2.png)  

- 애플리케이션 **실행 시점(런타임)**에 외부에서 실제 구현 객체를 생성하고 클라이언트에 전달해서 클라이언트와 서버의 실제 의존관계가 연결 되는 것을 **의존관계 주입**이라 한다.
- 객체 인스턴스를 생성하고, 그 참조값을 전달해서 연결된다.
- 의존관계 주입을 사용하면 클라이언트 코드를 변경하지 않고, 클라이언트가 호출하는 대상의 타입 인스턴스를 변경할 수 있다.
- 의존관계 주입을 사용하면 **정적인 클래스 의존관계를 변경하지 않고, 동적인 객체 인스턴스 의존관계를 쉽게 변경**할 수 있다.

***

## <span style="color:MediumSeaGreen">IoC 컨테이너, DI 컨테이너</span>
- AppConfig 처럼 **객체를 생성하고 관리하면서 의존관계를 연결해 주는 것을 IoC 컨테이너 또는 DI 컨테이너**라 한다.
- 의존관계 주입에 초점을 맞추어 **최근에는 주로 DI 컨테이너**라 한다.
