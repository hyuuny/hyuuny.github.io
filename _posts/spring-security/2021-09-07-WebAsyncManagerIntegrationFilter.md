---
title: WebAsyncManagerIntegrationFilter
categories:
- Spring Security
tags: 
- 2021년 09월

last_modified_at: 2021-09-07T14:00:00+09:00
toc: true
---

## <span style="color:MediumSeaGreen">WebAsyncManagerIntegrationFilter</span>
WebAsyncManagerIntegrationFilter는 스프링 MVC의 **Async 기능(핸들러에서 Callable을 리턴할 수 있는 기능)을 사용할 때에도 SecurityContext를 공유**하도록 도와주는 필터.

``` java
  @GetMapping("/async-handler")
  @ResponseBody 
  public Callable<String> asyncHandler() {
    SecurityLogger.log("MVC"); // thread = http-nio-8080-exec-5
    return () -> {
      SecurityLogger.log("Callable"); // thread = tesk-1
      return "Async Handler";
    };
  }
  
  // logger 
  public static void log(String message) {
    System.out.println(message);
    Thread thread = Thread.currentThread();
    System.out.println("thread = " + thread.getName());
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    System.out.println("principal = " + principal);
  }
```   

![img.png](/assets/images/spring-security/async-img.png)   

Async 기능을 사용할 때, 서로 다른 쓰레드이지만 **SecurityContext를 공유하기 때문에 동일한 Principal을 참조**한 것을 확인할 수 있다.   

- PresProcess : 새로 만든 Thread에 Integration해준다.
- Callable : **Callable안에서는 Thread가 달라도 동일한 SecurityContext를 참조**할 수 있다.
- PostProcess : SecurityContext의 요청을 마친 뒤, Clean Up 작업을 한다.