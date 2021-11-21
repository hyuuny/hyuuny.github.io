---
title: Bean Validation
categories:
- spring
tags: 
- 2021년 11월

last_modified_at: 2021-11-21T14:00:00+09:00
toc: true
---


Bean Validation은 특정한 구현체가 아니라 Bean Validation 2.0(JSR-380)이라는 기술 표준이다. 쉽게 이야기해서 검증 애노테이션과 여러 인터페이스의 모음이다. 마치 JPA가 표준 기술이고 그 구현체로 하이버네이트가 있는 것과 같다.  

Bean Validation을 구현한 기술중에 일반적으로 사용하는 구현체는 하이버네이트 Validator이다. 이름이 하이버네이트가 붙어서 그렇지 ORM과는 관련이 없다.  

[하이버네이트 Validator 공식사이트](http://hibernate.org/validator/){:target="_blank"}  

**의존관계 추가**  
Bean Validation을 사용하려면 `build.gradle`에 의존관계를 추가해야 한다.  
```java
  implementation 'org.springframework.boot:spring-boot-starter-validation'
```
- 의존관계를 추가하면 라이브러리가 추가 된다.
    - `jakarta.validation-api` : Bean Validation 인터페이스
    - `hibernate-validator` : 구현체

<br>

***

**Validator를 검증하기 위한 Item 클래스를 작성해보자.**  

```java
public class Item {

  private Long id;

  @NotBlank
  private String itemName;

  @NotNull
  @Range(min = 1000, max = 1000000)
  private Integer price;

  @NotNull
  @Max(9999)
  private Integer quantity;

}
```
- `@NotBlank` : 빈값 + 공백만 있는 경우를 허용하지 않는다.
- `@NotNull` : null 을 허용하지 않는다.
- `@Range(min = 1000, max = 1000000)` : 범위 안의 값이어야 한다.
- `@Max(9999)` : 최대 9999까지만 허용한다.

>  `javax.validation.constraints.NotNull`
> `org.hibernate.validator.constraints.Range`
>
> `javax.validation`으로 시작하면 특정 구현에 관계없이 제공되는 표준 인터페이스이고,
`org.hibernate.validator` 로 시작하면 하이버네이트 `validator` 구현체를 사용할 때만 제공되는 검증 기능이다. 실무에서 대부분 하이버네이트 `validator`를 사용하므로 자유롭게 사용해도 된다.

<br>

**Item 클래스를 사용하여 Validator로 검증해보자.**

```java
@Test
void beanValidation() {
    ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    Validator validator = factory.getValidator();

    Item item = new Item();
    item.setItemName(" ");
    item.setPrice(0);
    item.setQuantity(10000);

    Set<ConstraintViolation<Item>> violations = validator.validate(item);

    for (ConstraintViolation<Item> violation : violations) {
      System.out.println("violation = " + violation);
      System.out.println("violation.getMessage() = " + violation.getMessage());
    }

}
```

<br>
**실행 결과**
![img.png](/assets/images/spring/bean-validator1.png)  

- `validation.getMessage() = 공백일 수 없습니다.`는 `Validation` 기본 에러 메시지 이다. 이를 변경하고 싶다면 `@NotBlank(message = "공백 X")` 이런식으로 어노테이션에 message를 추가하면 된다.

![img.png](/assets/images/spring/bean-validator2.png)  