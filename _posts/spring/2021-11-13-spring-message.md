---
title: 스프링 메시지 소스 & 국제화
categories:
- spring
tags: 
- 2021년 11월

last_modified_at: 2021-11-13T14:00:00+09:00
toc: true
---

스프링은 기본적인 메시지 관리 기능을 제공한다.  
메시지 관리 기능을 사용하려면 스프링이 제공하는 `MessageSource`를 스프링 빈으로 등록하면 되는데, `MessageSource는 인터페이스`이다.  
따라서 **구현체인 ResourceBundleMessageSource 를 스프링 빈으로 등록**하면 된다.

## <span style="color:MediumSeaGreen">스프링 메시지 소스 직접 등록</span>

```java
@Bean
public MessageSource messageSource() {
	ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
	messageSource.setBasenames("messages", "errors");
	messageSource.setDefaultEncoding("utf-8");
	return messageSource;
}
```
- `basenames` : 설정 파일의 이름을 지정한다.
    - `messages`로 지정하면 `messages.properties`파일을 읽어서 사용한다.
    - 추가로 국제화 기능을 적용하려면 `messages_en.properties`, `messages_ko.properties`와 같이 파일명 마지막에 언어 정보를 주면된다. 만약 찾을 수 있는 국제화 파일이 없으면 `messages.properties`(언어정보가 없는 파일명)를 기본으로 사용한다.
    - 파일의 위치는 `/resources/messages.properties`에 두면 된다.
    - 여러 파일을 한번에 지정할 수 있다. 위에서는 `messages`, `errors` 둘을 지정했다.
- `defaultEncoding` : 인코딩 정보를 지정한다. `utf-8`을 사용하면 된다.

***

## <span style="color:MediumSeaGreen">스프링부트 메시지 소스 사용하기</span>
스프링 부트를 사용하면 `application.properties`파일에 메시지 소스를 설정할 수 있다.
```java
spring.messages.basename=messages,config.i18n.messages
```

<br>

**스프링 부트 메시지 소스 기본 값**  
`spring.messages.basename=messages`  

`MessageSource`를 스프링 빈으로 등록하지 않고, 스프링 부트와 관련된 별도의 설정을 하지 않으면 `messages`라는 이름으로 **기본 등록**된다.  
따라서 `messages_en.properties`, `messages_ko.properties`, `messages.properties`파일만 등록하면 자동으로 인식된다.

***

## <span style="color:MediumSeaGreen">메시지 파일 만들기</span>

- `messages.properties` : 기본 값으로 사용(한글)
- `messages_en.properties` : 영어 국제화 사용

- **파일명은 massage가 아니라 messages다. 마지막 s에 주의하자**
`/resources/messages.properties`  

**messages.properties**
```java
hello=안녕
hello.name=안녕 {0}
```  

**messages_en.properties**
```java
hello=hello
hello.name=hello {0}
```

***

## <span style="color:MediumSeaGreen">스프링 메시지 소스 사용</span>

**MessageSource 인터페이스**
```java
public interface MessageSource {
    String getMessage(String code, @Nullable Object[] args, @Nullable String defaultMessage Locale locale);
    String getMessage(String code, @Nullable Object[] args, Locale locale) throws NoSuchMessageException;
```
`MessgaeSource`인터페이스를 보면 코드를 포함한 일부 파라미터로 메시지를 읽어오는 기능을 제공한다.  

<br>

**메시지 소스 테스트 코드**
```java
package hello.itemservice.message;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.MessageSource;

@SpringBootTest
public class MessageSourceTest {

  @Autowired
  MessageSource messageSource; // 스프링부트 자동 등록

  @Test
  void helloMessage() {
    String result = messageSource.getMessage("hello", null, null);
    assertThat(result).isEqualTo("안녕");
  }

}

```

**테스트 결과**
![img.png](/assets/images/spring/messages1.png)  

- ms.getMessage("hello", null, null)

테스트는 메시지 코드로 hello를 입력하고 나머지 값은 null을 입력했다.  
`locale`정보가 없으면 `basename`에서 설정한 기본 이름 메시지 파일을 조회한다.  
`basename`으로 `messages`를 지정 했으므로 `messages.properties`파일에서 데이터를 조회한다.  

<br>

**메시지 소스 테스트 코드(매개변수 사용)**
```java
@Test
void argumentMessage() {
    String result = messageSource.getMessage("hello.name", new Object[]{"Spring"}, null);
    assertThat(result).isEqualTo("안녕 Spring");
}
```

**테스트 결과**
![img.png](/assets/images/spring/messages2.png)  

- 다음 메시지의 {0} 부분은 매개변수를 전달해서 치환할 수 있다.
- hello.name=안녕 -> {0} Spring 단어를 매개변수로 전달 -> 안녕 Spring

***

## <span style="color:MediumSeaGreen">국제화</span>
- locale정보를 기반으로 국제화 파일을 선택한다.
- Locale이 `en_US`의 경우 `messages_en_US` -> `messages_en` -> `messages` 순서로 찾는다.
- Locale에 맞추어 구체적인 것이 있으면 구체적인 것을 찾고, 없으면 디폴트를 찾는다.  
<br>

**Default 국제화 테스트 코드**
```java
@Test
void defaultLang() {
    assertThat(messageSource.getMessage("hello", null, null)).isEqualTo("안녕");
    assertThat(messageSource.getMessage("hello", null, Locale.KOREA)).isEqualTo("안녕");
}
```

**테스트 결과**
![img.png](/assets/images/spring/messages3.png)  

- ms.getMessage("hello", null, null) : **locale 정보가 없으므로 messages를 사용**
- ms.getMessage("hello", null, Locale.KOREA) : locale 정보가 있지만, message_ko가 없으므로 messages 를 사용  

<br>

**en 국제화 테스트 코드**
```java
@Test
void enLang() {
    assertThat(ms.getMessage("hello", null, Locale.ENGLISH)).isEqualTo("hello");
}
```

**테스트 결과**
![img.png](/assets/images/spring/messages4.png)  

- ms.getMessage("hello", null, Locale.ENGLISH) : locale 정보가 `Locale.ENGLISH`이므로 `messages_en`을 찾아서 사용

