---
title: Spring - interceptor를 이용한 로그인 확인 기능 구현
categories:
- spring
tags: 
- 2021년 12월

last_modified_at: 2021-12-18T14:00:00+09:00
toc: true
---

## <span style="color:MediumSeaGreen">Interceptor</span>
스프링 인터셉터도 서블릿 필터와 같이 웹과 관련된 공통 관심 사항을 효과적으로 해결할 수 있는 기술이다. 서블릿 필터가 서블릿이 제공하는 기술이라면, 스프링 인터셉터는 스프링 MVC가 제공하는 기술이다. 둘다 웹과 관련된 공통 관심 사항을 처리하지만, 적용되는 순서와 범위, 그리고 사용방법이 다르다.

인터셉터의 흐름은 다음과 같다.
```
HTTP 요청 ->WAS-> 필터 -> 디스패처 서블릿 -> 스프링 인터셉터 -> 컨트롤러
```
- 스프링 인터셉터는 디스패처 서블릿과 컨트롤러 사이에서 컨트롤러 호출 직전에 호출 된다.
- 스프링 인터셉터는 스프링 MVC가 제공하는 기능이기 때문에 결국 디스패처 서블릿 이후에 등장하게 된다.

아래는 인터셉터로 제한을 적용했을 때, 흐름이다.
```
HTTP 요청 -> WAS -> 필터 -> 디스패처 서블릿 -> 스프링 인터셉터 -> 컨트롤러 //로그인 사용자
HTTP 요청 -> WAS -> 필터 -> 디스패처 서블릿 -> 스프링 인터셉터(적절하지 않은 요청이라 판단, 컨트롤러 호출 X) // 미인증 사용자
```
<br>
인터셉터 역시 필터와 마찬가지로 체인을 이용하여 여러 개의 인터셉터를 사용할 수 있다.
```
HTTP 요청 -> WAS -> 필터 -> 디스패처 서블릿 -> 인터셉터1 -> 인터셉터2 -> 컨트롤러
```

***

## <span style="color:MediumSeaGreen">interceptor 호출 흐름</span>

**정상 흐름**
![img.png](/assets/images/spring/interceptor1.png)  
- **preHandle**
  - `컨트롤러 호출 전에 호출` (더 정확히는 핸들러 어댑터 호출 전에 호출)
  - `preHandle` 의 응답값이 `true`이면 다음으로 진행하고, `false`이면 더는 진행하지 않는다. `false`
인 경우 나머지 인터셉터는 물론이고, 핸들러 어댑터도 호출되지 않는다.
- **postHandle**
  - `컨트롤러 호출 후에 호출` (더 정확히는 핸들러 어댑터 호출 후에 호출) 
- **afterCompletion**
  - `뷰가 렌더링 된 이후에 호출`

<br>

**인터셉터 예외 상황** 
![img.png](/assets/images/spring/interceptor2.png)  
- **preHandle**
  - `컨트롤러 호출 전에 호출`
- **postHandle**
  - 컨트롤러에서 예외가 발생하면 `postHandle`은 호출되지 않는다.
- **afterCompletion**
  - `afterCompletion 은 항상 호출` 
  - 예외와 무관하게 공통 처리를 하려면 `afterCompletion()`을 사용
  - 예외가 발생하면 `afterCompletion()`에 예외 정보`( ex )`를 포함해서 호출된다.
  - 이 경우 예외( ex )를 파라미터로 받아서 어떤 예외가 발생했는지 로그로 출력할 수 있다.


## <span style="color:MediumSeaGreen">interceptor를 이용한 로그인 확인 기능 개발</span>

스프링의 인터셉터를 사용하려면 `HandlerInterceptor` 인터페이스를 구현하면 된다.

<br>

**- LogInterceptor 클래스**
```java
package com.login.web.interceptor;

import static org.springframework.util.ObjectUtils.isEmpty;

import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
public class LogInterceptor implements HandlerInterceptor {

  public static final String LOG_ID = "logId";

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {
    String requestURI = request.getRequestURI();
    String uuid = UUID.randomUUID().toString();

    request.setAttribute(LOG_ID, uuid); // afterCompletion에 넘길 uuid 저장

    // @RequestMapping : HandleMethod
    // 정적 리소소 : ResourceHttpRequestHandler
    if (handler instanceof HandlerMethod) {
      HandlerMethod handlerMethod = (HandlerMethod) handler;// 호출한 컨트롤러 메서드의 모든 정보가 포함되어 있음.
    }

    log.info("REQUEST [{}][{}][{}]", uuid, requestURI, handler);
    return true;

  }

  @Override
  public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
      ModelAndView modelAndView) throws Exception {
    log.info("postHandle [{}]", modelAndView);
  }

  @Override
  public void afterCompletion(
      HttpServletRequest request,
      HttpServletResponse response,
      Object handler,
      Exception ex
  ) throws Exception {
    String requestURI = request.getRequestURI();
    String uuid = (String)request.getAttribute(LOG_ID); // preHandle에서 넘긴 uuid 얻기

    log.info("RESPONSE [{}][{}][{}]", uuid, requestURI, handler);

    if (!isEmpty(ex)) {
      log.error("afterCompletion error!!", ex);
    }
  }
}

```

- **request.setAttribute(LOG_ID, uuid)**
  - 서블릿 필터의 경우 지역변수로 해결이 가능하지만, 스프링 인터셉터는 호출 시점이 완전히 분리되어 있다.
  - 따라서 `preHandle`에서 지정한 값을 `postHandle`, `afterCompletion`에서 함께 사용하려면 어딘가에 담아두어야 한다. 
  - `LogInterceptor`도 싱글톤 처럼 사용되기 때문에 맴버변수를 사용하면 위험하다. 
- **return true**
  - `true`면 정상 호출
  - 다음 인터셉터나 컨트롤러가 호출된다.

<br>

**HandlerMethod**  
핸들러 정보는 어떤 핸들러 매핑을 사용하는지에 따라 달라진다.  
스프링을 사용하면 일반적으로 `@Controller`, `@RequestMapping`을 활용한 핸들러 매핑을 사용하는데, 이 경우 핸들러 정보로 `HandlerMethod`가 넘어온다.  

**ResourceHttpRequestHandler**  
`@Controller`가 아니라 `/resources/static`과 같은 정적 리소스가 호출 되는 경우, `ResourceHttpRequestHandler`가 핸들러 정보로 넘어오기 때문에 타입에 따라서 처리가 필요하다.

***

**- LoginCheckInterceptor 클래스**

```java
package com.login.web.interceptor;

import static org.springframework.util.ObjectUtils.isEmpty;

import com.login.web.SessionConst;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
public class LoginCheckInterceptor implements HandlerInterceptor {

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {

    String requestURI = request.getRequestURI();
    log.info("인증 체크 인터셉터 실행 {}", requestURI);

    /**
     * filter는 인증이 필요없는 resource의 경우,
     * String[] whiteList = {"/", "/members/add", "/login", "/logout", "/css/*"}를 사용하여 처리했지만,
     * interceptor는 @Configuration으로 설정 가능
     */
    HttpSession session = request.getSession();
    if (isEmpty(session) || isEmpty(session.getAttribute(SessionConst.LOGIN_MEMBER))) {
      log.info("미인증 사용자 요청");
      response.sendRedirect("/login?redirectURL=" + requestURI);
      return false;
    }

    return true;
  }

}

```
- 서블릿 필터와 비교해서 코드가 매우 간결하다.
- 인증이라는 것은 컨트롤러 호출 전에만 호출되면 된다. 따라서 `preHandle`만 구현하면 된다.

*** 

**- WebConifg 클래스**  

```java
package com.login;

import com.login.web.agumentresolver.LoginMemberArgumentResolver;
import com.login.web.interceptor.LogInterceptor;
import com.login.web.interceptor.LoginCheckInterceptor;
import java.util.List;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
    resolvers.add(new LoginMemberArgumentResolver());
  }

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(new LogInterceptor())
        .order(1)
        .addPathPatterns("/**")
        .excludePathPatterns("/css/**", "/*.ico", "/error");

    registry.addInterceptor(new LoginCheckInterceptor())
        .order(2)
        .addPathPatterns("/**")
        .excludePathPatterns(
            "/", "/members/add", "/login", "/logout", "/css/**", "/*.ico", "/error");
  }

}
```

`WebMvcConfigurer`가 제공하는 `addInterceptors()`를 사용해서 인터셉터를 등록할 수 있다.

- **registry.addInterceptor()**
  - `인터셉터를 등록`
- **order()** 
  - 인터셉터는 체인으로 동작하기 때문에, 순서가 필요(낮을수록 먼저 동작)
  - `LogInterceptor`가 먼저 적용되고, `LoginCheckInterceptor`가 적용된다.
- **addPathPatterns**("/**")
  - 인터셉터를 적용할 URL 패턴을 지정
  - `/**` : 모든 요청에 인터셉터 적용
- **excludePathPatterns**("/css/**", "/*.ico", "/error")
  - 인터셉터에서 제외할 패턴을 지정
  
***

인터셉터는 스프링 MVC 구조에 특화된 필터 기능을 제공한다고 이해하면 된다.  
스프링 MVC를 사용하고, 특별히 필터를 꼭 사용해야 하는 상황이 아니라면 인터셉터를 사용하는 것이 더 편리하다.