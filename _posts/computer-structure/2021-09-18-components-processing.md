---
title: 처리장치의 구성요소
categories:
- computer-science
tags: 
- 2021년 09월

last_modified_at: 2021-09-18T14:00:00+09:00
toc: true
---

## <span style="color:MediumSeaGreen">처리장치의 구성요소</span>
처리장치는 여러 가지 마이크로연산을 수행할 수 있도록 레지스터와 ALU(산술/논리연산장치), 레지스터와 ALU는 연결선로인 버스(bus)로 연결된다.  
따라서 **처리장치는 여러 개의 레지스터, ALU, 내부버스로 구성**된다.

![img.png](/assets/images/computer-structure/InternalComposition.png)  
위 그림은 처리장치의 내부 구성도로 **레지스터와 ALU, 시프터(shifer), 디지털 논리회로로 구성**되어 있다.  
**처리장치의 동작원리는** 우선 하나의 마이크로연산이 실행되기 위해서 지정된 출발 레지스터의 내용이 ALU의 입력으로 전달되고, ALU에서 그 연산을 실행한 후 그 결과가 도착 레지스터에 전송된다. 처리장치에 있는 각 레지스터는 ALU와 연결된 버스를 통해 2개의 멀티플렉서와 연결된다. 각 멀티플렉서는 선택신호를 이용하여 특정 레지스터를 선택한다. 2개의 멀티플렉서에 의해 선택된 데이터는 ALU에 의해 산술 및 논리연산을 실행한다. 즉, ALU에 있는 선택신호에 의해 실행되어야 할 특정 마이크로연산이 선택되는 것이다. ALU에서 실행된 마이크로연산의 결과는 시프트 레지스터를 거치게 된다. 스프트 레지스터에서 선택신호는 특정 마이크로연산을 선택할 수 있게하고, 그 결과는 연결된 버스를 통해 레지스터들의 입력으로 전달된다. 여기서 디코더는 처리장치의 각 레지스터와 연결되어 있으며, 선택신호에 따라 도착 레지스터를 결정하게 된다. 따라서 결정된 도착 레지스터에는 지금까지 수행된 마이크로연산의 결과가 저장된다.  
<br>

이 과정을 요약하면 다음과 같다.  
1. 지정된 **출발 레지스터의 내용을 ALU의 입력으로 전달**
2. ALU에서 그 **연산을 실행**
3. 그 결과가 **도착 레지스터에 전송**

***

## <span style="color:MediumSeaGreen">내부버스</span>
내부버스란 **중앙처리장치 내부의 연산장치와 레지스터 사이의 정보 전송 경로**를 말하며, 외부버스는 **중앙처리장치와 중앙처리장치 외부의 장치 사이에 정보를 전송하는 경로**를 말한다.  
**외부버스는 시스템버스로서, 컴퓨터 시스템의 각 구성요소 간의 통신이 가능하도록 하는 기능**을 하는데, 주기억장치와 중앙처리장치 사이의 주기억장치버스, 입출력장치와 중앙처리장치 사이의 입출력버스 등이 있다.  
**내부버스는 처리장치 내부에 있는 레지스터 간의 통신이 가능하도록 하는 기능**을 하는데, 처리장치 내부에 각 레지스터는 그 안에 저장된 정보를 입력버스를 통해 연산장치로 전송하고, 연산장치에서의 연산 결과는 출력버스를 통해 해당 목적지 레지스터로 전송된다. 이러한 내부버스는 멀티플렉서와 디코더를 이용하여 구성하는데, 멀티플렉서는 출발 레지스터를 선택하고, 디코더는 버스로부터 정보를 받아들이는 도착 레지스터를 선택한다.  

내부버스를 구성하는 방법은 멀티플렉서와 디코더를 이용한다.
- **멀티플렉서는 출발 레지스터** 선택
- **디코더는 도착 레지스터** 선택
![img.png](/assets/images/computer-structure/internalBus.png)  

***

###### <span style="color:DodgerBlue">내부버스의 구성 및 동작</span>
- 마이크로 연산 : R1 <- R0(R0, R1이 4비트 레지스터인 경우)
    - 내부버스 구성을 위해 : **2x1 MUX 4개, 1x2 디코더 1개** 필요
    - 마이크로 연산을 위해 : MUX의 선택신호 0(2진수), 디코더의 선택신호는 1(2진수) 부여
![img.png](/assets/images/computer-structure/internalBus2.png)  


***
<span style="color:DarkOrange">reference</span>  
김형근·손진곤 (공저). (2021). 컴퓨터구조. 한국방송통신대학교출판문화원