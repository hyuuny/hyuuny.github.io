---
title: 멱등성
categories:
- HTTP
tags: 
- 2021년 12월

last_modified_at: 2021-12-06T14:00:00+09:00
toc: true
---

## <span style="color:MediumSeaGreen">멱등성</span>
멱등은 한 번 호출하든 두 번 호출하든 백 번 호출하든 **결과가 항상 똑같다.**  
- f(f(x)) = f(x)

###### <span style="color:DodgerBlue">멱등 메서드</span>
- GET : 한 번 조회하든, 두 번 조회하든 같은 결과가 **조회**된다.
- PUT : 결과를 **대체**한다. 따라서 같은 요청을 여러번 해도 최종 결과는 같다.
- DELETE : 결과를 **삭제**한다. 같은 요청을 여러번 해도 삭제된 결과는 똑같다.
- POST : **멱등이 아니다!** 두 번 호출하면 같은 결제가 중복해서 발생할 수 있다.

###### <span style="color:DodgerBlue">특징</span>
재요청 하는 중간에 다른 곳에서 리소스를 변경했다면?
- 사용자 A : GET -> username:A, age:20
- 사용자 B : PUT -> username:A, age:30
- 사용자 A : GET -> username:A, age:30

**멱등은 외부 요인으로 중간에 리소스가 변경되는 것 까지는 고려하지 않는다.**





