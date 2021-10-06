---
title: 주소지정방식
categories:
- computer-science
tags: 
- 2021년 09월

last_modified_at: 2021-09-12T14:00:00+09:00
toc: true
---

## <span style="color:MediumSeaGreen">주소지정방식</span>
명령어 내의 연산코드 필드는 수행할명령어의 종류를 지정하고, 컴퓨터 레지스터나 기억장치에 저장되어 있는 항목을 대상으로 수행된다. 프로그램 수행 시 오퍼랜드를 지정하는 방법은 명령어 내에 있는 주소지정방식에 의해 결정된다. **주소지정방식(addressing mode)이란, 오퍼랜드를 실제로 참조하기 전에 명령어의 오퍼랜드를 변경하거나 해석하는 규칙을 지정하는 형식이다.**  
이러한 규칙을 적용하여 만들어진 오퍼랜드 주소를 **유효주소(effective address)**라고 한다.  
명령어의 주소지정방식은 컴퓨터에 따라 별도의 2진 코드로 정의되기도 하고, 연산방식과 공통으로 사용하는 2진 코드로 정의되기도 한다. 연산코드 필드는 수행할 연산의 종류를 지정하며, 주소지정방식 필드는 연산에 필요한 오퍼랜드의 주소를 알아내는 데 사용된다. 주소 필드는 존재할 수도 있고 안 할수도 있는데, 주소 필드가 존재한다면 그 필드는 기억장치주소 혹은 레지스터 주소를 나타낸다.
- 프로그램 수행시 오퍼랜드를 지정하는 방식
- 명령어의 주소 필드를 변경하거나 해석하는 규칙을 지정하는 형식
- 주소지정방식을 사용하면 **명령어의 수를 줄일 수 있는** 효과적인 프로그래밍 가능

![img.png](/assets/images/computer-structure/addressingMode.png)

***

###### <span style="color:DodgerBlue">의미주소지정(implied mode)</span>
대부분의 주소지정방식은 명령어에서 주소 필드를 표현하지만, **주소 필드가 필요 없는 방식이 하나 있는데 이 방식을 의미방식(implied mode)**이라고 한다.  
이 방식에서는 **연산코드 필드에 지정된 묵시적인 의미의 오퍼랜드를 지정**한다.
- 명령어 형식에서 주소 필드를 필요로 하지 않는 방식
- 연산코드 필드에 지정된 묵시적 의미의 오퍼랜드를 지정

![img.png](/assets/images/computer-structure/impliedMode.png)
- 기억장치 스택에서 ADD와 같은 명령어는 스택의 맨 위 항목과 그 아래 항목을 더하여 스택의 맨위에 저장하는 명령어로서, **오퍼랜드가 스택의 맨 위에 있다는 것을 묵시적으로 가정**함

***
###### <span style="color:DodgerBlue">즉치주소지정(immediate mode)</span>
즉치방식(immediate mode)에서는 **오퍼랜드를 명령어 자체 내에서 지정**하고 있다. 즉, 명령어의 오퍼랜드 필드에 저장된 내용이 명령어에서 사용될 실제 데이터라는 것이다.  
이 방식은 주로 프로그램에서 **레지스터나 변수의 초깃값을 특정 상숫값으로 초기화하는데 매우 유용**하다.
- 명령어 자체 내에 오퍼랜드를 지정하고 있는 방식
- **오퍼랜드 필드의 내용이 실제 사용될 데이터**
- **레지스터나 변수의 초기화에 유용**

![img.png](/assets/images/computer-structure/immediateMode.png)

***

###### <span style="color:DodgerBlue">직접주소지정(direct-addressing mode)</span>
직접주소지정방식(direct-addressing mode)은 **명령어의 주소 필드에 직접 오퍼랜드의 주소를 지정하는 방식**이다.  
이 방식은 명령어의 대상이 되는 데이터에 접근되는 데 기억장치를 한 번만 접근하면 되는 장점이 있으나, 오퍼랜드 필드 길이에 따라 접근할 수 있는 기억장치의 주소공간에 한계가 있다는 단점이 있다.
- 명령어의 주소필드에 **직접 오퍼랜드의 주소를 저장**시키는 방식
- 기억장치에의 접근이 한번에 이루어짐

![img.png](/assets/images/computer-structure/directAddressingMode.png)

***

###### <span style="color:DodgerBlue">간접주소지정(indirect-addressing mode)</span>
간접주소지정방식(indirect-addressing mode)은 **명령어의 주소 필드에 유효주소가 저장되어 있는 기억장치주소를 기억시키는 방식**으로, 제어는 기억장치로부터 명령어를 가져온 후 주소 부분을 이용하여 다시 기억장치에 접근하여 유효 주소를 읽어낸다.  
간접주소지정방식은 접근할 수 있는 기억장치 주소공간이 중앙처리장치가 한 번에 접근할 수 있는 단어의 길이로 결정되는 장점이 있으나, 실행 사이클 동안 두 번의 기억장치 접근이 필요하다는 단점이 있다.
- 명령어의 주소필드에 유효주소가 저장되어있는 기억장치 주소를 기억시키는 방식

![img.png](/assets/images/computer-structure/indirectAddressingMode.png)

***

###### <span style="color:DodgerBlue">레지스터 주소지정(register-addressing mode)</span>
레지스터 주소지정방식(register addressing mode)은 **오퍼랜드 필드에서 지정한 레지스터에 실제 피연산자가 들어있는 것**이다. 따라서 오퍼랜드에는 레지스터 번호가 저장되며 유효주소는 존재하지 않는다.  
이 방식은 오퍼랜드 필드가 레지스터들의 번호를 나타내기 때문에 오퍼랜드 필드의 비트가 적어도 되고, 데이터 인출을 위해 기억장치에 접근하지 않고 중앙처리장치의 레지스터로 접근하므로 속도가 빠르다는 장점이 있으나, 오퍼랜드가 중앙처리장치의 레지스터 수로 제한되어 있으므로 무한정 사용할 수 없다.
- 오퍼랜드 필드에 레지스터가 기억되는 방식
- 레지스터에 오퍼랜드가 들어있음(**유효주소가 없음**)

![img.png](/assets/images/computer-structure/registerMode.png)

***

###### <span style="color:DodgerBlue">레지스터 간접주소지정(register-indirect mode)</span>
레지스터 간접주소지정방식(register-indirect mode)에서는 **명령어 내의 주소 필드가 레지스터 중 하나를 지정하고, 지정된 레지스터의 내용은 실제 오퍼랜드가 저장된 기억장치주소를 지정**한다. 즉, 지정된 레지스터는 오퍼랜드 그 자체가 아니라 **오퍼랜드가 저장된 기억장치주소를 가지고 있는 것**이다. 따라서 레지스터 간접주소지정방식에서 유효주소는 지정된 레지스터에 있는 주소가 된다.
- 레지스터가 **실제 오퍼랜드가 저장된 기억장치의 주소 값을 갖고 있는** 방식

![img.png](/assets/images/computer-structure/registerIndirectMode.png)

***

###### <span style="color:DodgerBlue">상대주소지정(relative-addressing mode)</span>
상대주소지정방식(relative-addressing mode)은 **유효주소를 계산하기 위해 처리장치 내에 있는 특정 레지스터의 내용에 명령어 오퍼랜드값을 더하는 방식**이다.  
자주 사용되는 레지스터는 PC로서 상대주소지정방식에서 유효주소는 **유효주소=명령어 주소 부분의 내용 + PC의 내용**과 같이 계산된다.  
- 유효주소를 계산하기 위해 처리장치 내에 있는 특정 레지스터의 내용에 명령어 주소필드 값을 더하는 방식
- 특정 레지스터로 프로그램카운터(PC)가 주로 사용

![img.png](/assets/images/computer-structure/relativeAddressingMode.png)

***

###### <span style="color:DodgerBlue">인덱스된 주소지정(indexed-addressing mode)</span>
인덱스된 주소지정방식(indexed-addressing mode)에서는 인덱스 레지스터의 내용을 **명령어 주소 부분에 더해서** 유효주소를 얻는다. 인덱스 레지스터는 특정한 CPU 레지스터나 레지스터 파일에 있는 레지스터가 될 수 있다.  
인덱스된 주소지정방식은 주로 배열을 인덱싱(indexing)할 때 많이 사용되며, 유효주소는 **유효주소=명령어 주소 부분의 내용 + 인덱스 레지스터의 내용**과 같이 계산된다.
- 인덱스 레지스터의 내용을 명령어 주소 부분에 더해서 유효주소를 얻는 방식

![img.png](/assets/images/computer-structure/indexedAddressingMode.png)

*** 

###### <span style="color:DodgerBlue">주소지정방식 요약(Summary)</span>

![img.png](/assets/images/computer-structure/Summary1.png)
![img.png](/assets/images/computer-structure/Summary2.png)

***
<span style="color:DarkOrange">reference</span>  
김형근·손진곤 (공저). (2021). 컴퓨터구조. 한국방송통신대학교출판문화원
