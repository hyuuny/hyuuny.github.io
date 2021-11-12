---
title: Web Scope - request 예제
categories:
- spring
tags: 
- 2021년 11월

last_modified_at: 2021-11-09T14:00:00+09:00
toc: true
---

동시에 여러 HTTP 요청이 오면 정확히 어떤 요청이 남긴 로그인지 구분하기 어렵다.
이럴때 사용하기 좋은것이 바로 request 스코프이다.

request 스코프를 이용해서 다음과 같은 로그를 남겨보자.
```
[1085cefa-e6ae-4c2e-b639-c3750fd58945] request scope bean create : hello.core.common.MyLogger@32d1aada
[1085cefa-e6ae-4c2e-b639-c3750fd58945] [http://localhost:8080/log-demo] controller test
[1085cefa-e6ae-4c2e-b639-c3750fd58945] [http://localhost:8080/log-demo] service id : testId
[1085cefa-e6ae-4c2e-b639-c3750fd58945] request scope bean close : hello.core.common.MyLogger@32d1aada
```

<br>

***

## <span style="color:MediumSeaGreen">로그를 출력하기 위한 **MyLogger**</span>

```java
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
@Component
public class MyLogger {

  private String uuid;
  private String requestURL;

  public void setRequestURL(String requestURL) {
    this.requestURL = requestURL;
  }

  public void log(final String message) {
    System.out.println("[" + uuid + "] " + "[" + requestURL + "] " + message);
  }

  @PostConstruct
  public void init() {
    uuid = UUID.randomUUID().toString();
    System.out.println("[" + uuid + "] " + "request scope bean create : " + this);
  }

  @PreDestroy
  public void close() {
    System.out.println("[" + uuid + "] " + "request scope bean close : " + this);
  }

}
```
- `@Scope(value = "request")`를 사용해서 request 스코프로 지정했다. 이제 이 빈은 **HTTP 요청 당 하나씩 생성되고, HTTP 요청이 끝나는 시점에 소멸**된다.
- 이 빈이 생성되는 시점에 자동으로 `@PostConstruct` 초기화 메서드를 사용해서 uuid를 생성해서 저장해둔다. 이 빈은 HTTP 요청 당 하나씩 생성되므로, uuid를 저장해두면 다른 HTTP 요청과 구분할 수 있다.
- 이 빈이 소멸되는 시점에 `@PreDestroy`를 사용해서 종료 메시지를 남긴다.
- requestURL은 이 빈이 생성되는 시점에는 알 수 없으므로, 외부에서 setter로 입력 받는다.
- `proxyMode = ScopedProxyMode.TARGET_CLASS`를 추가해주자. 
    - 적용 대상이 인터페이스가 아닌 클래스면 `TARGET_CLASS`를 선택
    - 적용 대상이 인터페이스면 `INTERFACES`를 선택

***

## <span style="color:MediumSeaGreen">MyLogger 작동을 확인하기 위한 **LogDemoController**</span>
```java
@Controller
@RequiredArgsConstructor
public class LogDemoController {

  private final LogDemoService logDemoService;
  private final MyLogger myLogger;

  @RequestMapping("log-demo")
  @ResponseBody
  public String logDemo(HttpServletRequest request) {
    String requestURL = request.getRequestURL().toString();
    System.out.println("myLogger = " + myLogger.getClass());
    myLogger.setRequestURL(requestURL);

    myLogger.log("controller test");
    logDemoService.logic("testId");

    return "OK";
  }
}
```
- HttpServletRequest를 통해서 요청 URL을 받았다.
    - requestURL 값 http://localhost:8080/log-demo
- 이렇게 받은 requestURL 값을 myLogger에 저장해둔다. myLogger는 HTTP 요청 당 각각 구분되므로 다른 HTTP 요청 때문에 값이 섞이는 걱정은 하지 않아도 된다.
- 컨트롤러에서 controller test라는 로그를 남긴다.

>> requestURL을 MyLogger에 저장하는 부분은 컨트롤러 보다는 **공통 처리가 가능**한 스프링 인터셉터나 서블릿 필터 같은 곳을 활용하는 것이 좋다.

***

## <span style="color:MediumSeaGreen">비지니스 로직을 처리하는 **LogDemoService**</span>
```java
@RequiredArgsConstructor
@Service
public class LogDemoService {

  private final MyLogger myLogger;

  public void logic(final String id) {
    myLogger.log("service id : " + id);
  }

}
```
- request scope를 사용하지 않고 파라미터로 이 모든 정보를 서비스 계층에 넘긴다면, 파라미터가 많아서 지저분해진다. 더 문제는 requestURL 같은 **웹과 관련된 정보가 웹과 관련없는 서비스 계층까지 넘어가게 된다.** 웹과 관련된 부분은 컨트롤러까지만 사용해야 한다. 
    - 서비스 계층은 웹 기술에 종속되지 않고, 가급적 순수하게 유지하는 것이 유지보수 관점에서 좋다.
- request scope의 MyLogger 덕분에 이런 부분을 파라미터로 넘기지 않고, MyLogger의 멤버변수에 저장해서 코드와 계층을 깔끔하게 유지할 수 있다.

***

## <span style="color:MediumSeaGreen">로그를 출력하기 위한 **MyLogger**</span>
**myLogger 출력 결과** 
```java
myLogger = class hello.core.common.MyLogger$$EnhancerBySpringCGLIB$$b68b726d
```
- **CGLIB라는 라이브러리**로 내 클래스를 상속 받은 가짜 프록시 객체를 만들어서 주입한다.
- `@Scope`의 `proxyMode = ScopedProxyMode.TARGET_CLASS)`를 설정하면 스프링 컨테이너는 CGLIB
라는 바이트코드를 조작하는 라이브러리를 사용해서, MyLogger를 상속받은 가짜 프록시 객체를 생성한다.
- 결과를 확인해보면 우리가 등록한 순수한 MyLogger 클래스가 아니라 **MyLogger$$EnhancerBySpringCGLIB 이라는 클래스로 만들어진 객체가 대신 등록**된 것을 확인할 수 있다. 그리고 스프링 컨테이너에 "myLogger"라는 이름으로 **진짜 대신에 이 가짜 프록시 객체를 등록**한다.
- ac.getBean("myLogger", MyLogger.class) 로 조회해도 프록시 객체가 조회되는 것을 확인할 수 있다. 의존관계 주입도 이 가짜 프록시 객체가 주입된다.

![img.png](/assets/images/spring/myLogger-proxy.png)  
- 가짜 프록시 객체는 요청이 오면 그때 내부에서 진짜 빈을 요청하는 위임 로직이 들어있다.
- 클라이언트가 myLogger.logic()을 호출하면 사실은 가짜 프록시 객체의 메서드를 호출한 것이다. 가짜 프록시 객체는 request 스코프의 진짜 myLogger.logic() 를 호출한다.
- 가짜 프록시 객체는 원본 클래스를 상속 받아서 만들어졌기 때문에 이 객체를 사용하는 클라이언트 입장에서는 사실 원본인지 아닌지도 모르게, 동일하게 사용할 수 있다(다형성)

<br>

**동작 원리**  
- CGLIB라는 라이브러리로 내 클래스를 상속 받은 가짜 프록시 객체를 만들어서 주입한다.
- 이 가짜 프록시 객체는 실제 요청이 오면 그때 내부에서 실제 빈을 요청하는 위임 로직이 들어있다. 가짜 프록시 객체는 실제 request scope와는 관계가 없다. 그냥 가짜이고, 내부에 단순한 위임 로직만 있고, 싱글톤 처럼 동작한다.

<br>

**특징 요약**  
- 프록시 객체 덕분에 클라이언트는 마치 싱글톤 빈을 사용하듯이 편리하게 request scope를 사용할 수 있다.
- 사실 Provider를 사용하든, 프록시를 사용하든 핵심 아이디어는 진짜 객체 조회를 꼭 필요한 시점까지 지연처리 한다는 점이다.
단지 애노테이션 설정 변경만으로 원본 객체를 프록시 객체로 대체할 수 있다. 이것이 바로 다형성과 DI 컨테이너가 가진 큰 강점이다.
- 꼭 웹 스코프가 아니어도 프록시는 사용할 수 있다.

<br>

**주의점**  
- 마치 싱글톤을 사용하는 것 같지만 다르게 동작하기 때문에 결국 주의해서 사용해야 한다.
- 이런 특별한 scope는 꼭 **필요한 곳에만 최소화해서 사용**하자, 무분별하게 사용하면 유지보수하기 어려워진다.