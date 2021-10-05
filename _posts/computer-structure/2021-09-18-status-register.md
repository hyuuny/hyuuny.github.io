---
title: 상태 레지스터와 시프터
categories:
- Computer Science
tags: 
- 2021년 09월

last_modified_at: 2021-09-18T14:00:00+09:00
toc: true
---

## <span style="color:MediumSeaGreen">상태 레지스터</span>
상태 레지스터는 **ALU에서 산술연산을 수행한 후 연산 결과에 의해 상태 레지스터를 세트**한다. 
상태 레지스터들은 **C(carry bit)**, **S(sign bit)**, **Z(zero bit)**, **V(overflow bit)**로 구성되어 있으며, **1개 상태가 1개 비트씩 기억될 수 있도록 비트 단위로 구성**되어 있다.
- ALU에서 **산술연산이 수행된 후 연산결과에 의해 나타나는 상태값을 저장**
- 상태 레지스터는 C(carry bit), S(sign bit), Z(zero bit), V(overflow bit)로 구성
![img.png](/assets/images/computer-structure/flagRegister.png)  



<span style="color:DodgerBlue">캐리비트(carry bit)</span>  
캐리비트는 **두 수를 가산하여 캐리가 발생하면 비트가 1로 세트되고, 아니면 0**이된다. 따라서 캐리비트는 산술연산장치의 최상위 비트의 전가산기 캐리 아웃(carry out) 신호를 받아서 세트된다. 또한 감산에서 자리내림(borrow)이 발생했을 때도 1로 세트된다.

<span style="color:DodgerBlue">부호비트(sign bit)</span>  
부호비트는 산술연산장치의 출력 최상위 비트와 연결되어 있으며, **최상위 비트가 0이면 양수를 나타내고, 1이면 음수**를 나타낸다.

<span style="color:DodgerBlue">제로비트(zero bit)</span>  
제로비트는 **두 수를 연산한 후 결과값이 0이며 1로 세트**된다. 따라서 산술연산장치의 출력비트들을 논리게이트 NOR에 연결하여 모든 비트가 0이면 출력밧이 1이 되도록 구성한다.

<span style="color:DodgerBlue">오버플로 비트(overflow bit)</span>  
오버플로는 산술연산에서 **두 수를 가산할 때 결과를 저장할 수 있는 레지스터의 자릿수가 모자라는 경우에 발생**하는 에러로서, 오버플로가 발생하면 오버플로 비트가 1로 세트된다.

***

## <span style="color:MediumSeaGreen">시프터(shifter)</span>
ALU에는 데이터를 비트 단위로 이동시키는 시프트(shift) 기능이 없다. 따라서 **ALU 출력 단에 시프터(shifter)를 연결하여 시프터 연산을 수행**한다. 시프트 연산은 입력 데이터의 모든 비트를 각각 서로 이웃한 비트로 자리를 옮기는 연산을 말하여, 왼쪽 시프트와 오른쪽 시프트가 있다.
- 입력 데이터의 모든 비트들을 각각 서로 이웃한 비트로 자리를 옮기는 시프트 연산을 수행
![img.png](/assets/images/computer-structure/shifter.png)  

시프터에 대한 연산표는 다음과 같다.
![img.png](/assets/images/computer-structure/shifter2.png)  

***
<span style="color:DarkOrange">reference</span>  
김형근·손진곤 (공저). (2021). 컴퓨터구조. 한국방송통신대학교출판문화원