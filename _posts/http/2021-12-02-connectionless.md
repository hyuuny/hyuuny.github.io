---
title: 비 연결성
categories:
- HTTP
tags: 
- 2021년 12월

last_modified_at: 2021-12-02T14:00:00+09:00
toc: true
---


## <span style="color:MediumSeaGreen">비 연결성</span>
- HTTP는 기본이 **연결을 유지하지 않는** 모델
- 일반적으로 초 단위 이하의 빠른 속도로 응답한다.
- 서버 자원을 효율적으로 사용할 수 있다.
- TCP/IP **연결을 매번 새로** 맺어야 한다.
    - 3 way handshake 시간 소요
- 웹 브라우저로 사이트를 요청하면 HTML 뿐만 아니라, JS, CSS, 이미지 등 수많은 자원을 함께 다운로드
![img.png](/assets/images/http/connectionless10.png)  
    - 현재는 HTTP 지속 연결로 문제 해결

***

**TCP/IP는 연결을 유지**한다.  
만약 서버가 계속 연결을 유지한다면, 클라이언트가 서버에 요청을 보내지 않아도, 서버는 자원을 지속적으로 소모하게 된다.  
![img.png](/assets/images/http/connectionless1.png)  

***

![img.png](/assets/images/http/connectionless2.png)  

***

![img.png](/assets/images/http/connectionless3.png)  

***

![img.png](/assets/images/http/connectionless4.png)  

***

<br>

서버가 클라이언트의 요청마다 TCP/IP 연결을 맺고, 응답과 동시에 연결을 끊는다면 최소한의 자원으로 유지할 수 있다.  

![img.png](/assets/images/http/connectionless5.png)  

***


![img.png](/assets/images/http/connectionless6.png)  

***

![img.png](/assets/images/http/connectionless7.png)  

***

![img.png](/assets/images/http/connectionless8.png)  

***

![img.png](/assets/images/http/connectionless9.png)  

***


