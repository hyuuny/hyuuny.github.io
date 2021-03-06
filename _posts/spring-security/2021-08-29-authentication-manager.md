---
title: Authentication Manager
categories:
- spring-security
tags: 
- 2021년 08월

last_modified_at: 2021-08-29T14:00:00+09:00
toc: true
---


## Spring Security에서 인증(Authentication)은 AuthenticationManager가 한다.


```java
Authentication authenticate(Authentication authentication) throws AuthenticationException
```

- **인자로 받은 Authentication이 유효한 인증인지 확인**하고, 
  **Authentication객체를 리턴**한다.
- 인증을 확인하는 과정에서 비활성 계정, 잘못된 비밀번호, 잠긴 계정 등의 에러를 던질 수 있다.


## 인자로 받은 Authentication


- 사용자가 입력한 인증에 필요한 정보(username, password)로 만든 객체다. (폼 인증의 경우)
- Authentication
    - Principal : "hyuuny"
    - Credentials : "secret"
    

## 유효한 인증인지 확인


- 사용자가 입력한 password가 UserDetailsService를 통해 읽어온 UserDatails객체에 들어 있는
password와 일치하는지 확인한다.
  - 해당 사용자 계정이 잠겨 있지는 않은지, 비활성 계정은 아닌지 등 확인한다.
    

## Authentication 객체를 리턴


- Authentication
    - Principal : UserDetailsService에서 리턴한 객체 (User) 
    - Credentials
    - GrantedAuthorities
