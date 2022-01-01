---
title: Spring - Thread Local
categories:
- spring
tags: 
- 2022년 01월

last_modified_at: 2022-01-01T14:00:00+09:00
toc: true
---

## <span style="color:MediumSeaGreen">Thread Local</span>
쓰레드 로컬은 해당 쓰레드만 접근할 수 있는 특별한 저장소를 말한다.  
쉽게 이야기해서 물건 보관 창구를 떠올리면 된다. 여러 사람이 같은 물건 보관 창구를 사용하더라도 창구 직원은 사용자를 인식해서 사용자별로 확실하게 물건을 구분해준다.  
사용자A, 사용자B 모두 창구 직원을 통해서 물건을 보관하고, 꺼내지만 창구 지원이 사용자에 따라 보관한 물건을 구분해주는 것이다.

***

**일반적인 필드 변수**  
여러 쓰레드가 같은 인스턴스의 필드에 접근하면 처음 쓰레드가 보관한 데이터가 사라질 수 있다.  

![img.png](/assets/images/spring/threadlocal1.png)  
- thread-A 가 userA 라는 값을 저장하고  

![img.png](/assets/images/spring/threadlocal2.png)  
- thread-B 가 userB 라는 값을 저장하면 직전에 thread-A 가 저장한 userA 값은 사라진다.  

***

**쓰레드 로컬**  
쓰레드 로컬을 사용하면 각 쓰레드마다 별도의 내부 저장소를 제공한다. 따라서 같은 인스턴스의 쓰레드 로컬 필드에 접근해도 문제 없다.  

![img.png](/assets/images/spring/threadlocal3.png)  
- thread-A 가 userA 라는 값을 저장하면 쓰레드 로컬은 thread-A 전용 보관소에 데이터를 안전하게 보관한다.  

![img.png](/assets/images/spring/threadlocal4.png)  
- thread-B 가 userB 라는 값을 저장하면 쓰레드 로컬은 thread-B 전용 보관소에 데이터를 안전하게 보관한다.  

![img.png](/assets/images/spring/threadlocal5.png)  
- 쓰레드 로컬을 통해서 데이터를 조회할 때도 thread-A 가 조회하면 쓰레드 로컬은 thread-A 전용 보관소에서 userA 데이터를 반환해준다.  물론 thread-B 가 조회하면 thread-B 전용 보관소에서 userB 데이터를 반환해준다.

***

## <span style="color:MediumSeaGreen">Thread Local Test Code</span>
```java
package com.hyuuny.advanced.trace.threadlocal.code;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ThreadLocalService {

  private ThreadLocal<String> nameStore = new ThreadLocal<>();

  public String logic(String name) {
    log.info("저장 name={} -> nameStore={}", name, nameStore.get());
    nameStore.set(name);
    sleep(1000);
    log.info("조회 nameStore={}", nameStore.get());
    return nameStore.get();
  }

  private void sleep(int millis) {
    try {
      Thread.sleep(millis);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
  }

}
```

>> 해당 쓰레드가 쓰레드 로컬을 모두 사용하고 나면 ThreadLocal.remove() 를 호출해서 쓰레드 로컬에
저장된 값을 제거해주어야 한다.

```java
package com.hyuuny.advanced.trace.threadlocal;

import com.hyuuny.advanced.trace.threadlocal.code.ThreadLocalService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

@Slf4j
public class ThreadLocalServiceTest {

  private ThreadLocalService service = new ThreadLocalService();

  @Test
  void field() {
    log.info("main start");
    Runnable userA = () -> {
      service.logic("userA");
    };
    Runnable userB = () -> {
      service.logic("userB");
    };

    Thread threadA = new Thread(userA);
    threadA.setName("thread-A");
    Thread threadB = new Thread(userB);
    threadB.setName("thread-B");

    threadA.start();
    sleep(100);
    threadB.start();

    sleep(3000);
    log.info("main exit");
  }

  private void sleep(int millis) {
    try {
      Thread.sleep(millis);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
  }

}
```

**결과**  
![img.png](/assets/images/spring/threadlocal-test-code.png)  
쓰레드 로컬 덕분에 쓰레드 마다 각각 별도의 데이터 저장소를 가지게됨으로써, 동시성 문제가 해결되었다.