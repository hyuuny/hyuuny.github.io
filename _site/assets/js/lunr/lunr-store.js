var store = [{
        "title": "Authentication Manager",
        "excerpt":"Spring Security에서 인증(Authentication)은 AuthenticationManager가 한다. Authentication authenticate(Authentication authentication) throws AuthenticationException 인자로 받은 Authentication이 유효한 인증인지 확인하고, Authentication객체를 리턴한다. 인증을 확인하는 과정에서 비활성 계정, 잘못된 비밀번호, 잠긴 계정 등의 에러를 던질 수 있다. 인자로 받은 Authentication 사용자가 입력한 인증에 필요한 정보(username, password)로 만든 객체다. (폼 인증의 경우) Authentication Principal : “hyuuny”...","categories": ["spring-security"],
        "tags": ["2021년 08월"],
        "url": "/spring-security/authentication-manager/",
        "teaser": null
      },{
        "title": "Spring Security Holder",
        "excerpt":"Security Context Holder SecurityContext 제공, 기본적으로 TreadLocal을 사용한다. SecurityContext Authentication 제공 Authentication Principal과 GrantAuthority 제공 Principal “누구”에 해당하는 정보 UserDetailsService에서 리턴한 객체 객체의 타입은 UserDetail GrantAuthority “ROLE_USER”, “ROLE_ADMIN”등 Principal이 가지고 있는 “권한”을 나타낸다. 인증 이후, 인가 및 권한 확인할 때 이 정보를 참조한다. UserDatails 애플리케이션이 가지고 있는 유저 정보와 스프링...","categories": ["spring-security"],
        "tags": ["2021년 08월"],
        "url": "/spring-security/spring-context-holder/",
        "teaser": null
      },{
        "title": "Thread Local",
        "excerpt":"java.lang 패키지에서 제공하는 쓰레드 범위 변수. 즉, 쓰레드 수준의 데이터 저장소. 같은 쓰레드 내에서만 공유. 따라서 같은 쓰레드라면 해당 데이터를 메소드 매개변수로 넘겨줄 필요 없음. SecurityContextHolder의 기본 전략. public class AccountContext { private static final ThreadLocal&lt;Account&gt; ACCOUNT_THREAD_LOCAL = new ThreadLocal&lt;&gt;(); public static void setAccount(Account account) { ACCOUNT_THREAD_LOCAL.set(account); } public static...","categories": ["spring-security"],
        "tags": ["2021년 08월"],
        "url": "/spring-security/thread-local/",
        "teaser": null
      },{
        "title": "영속성 컨텍스트",
        "excerpt":"영속성 컨텍스트 영속성 컨텍스트란, 엔티티를 영구 저장하는 환경이라는 뜻이다. EntityManager의 persist()를 사용하여, Entity를 저장하고 영속성 컨텍스트로 관리한다. 영속성 컨텍스트는 논리적인 개념으로 눈에 보이지 않는다. EntityManager를 통해서 영속성 컨텍스트에 접근한다. 엔티티의 생명주기 엔티티의 생명주기는 다음과 같이 총 4단계로 구성됩니다. 비영속(new/transient) 영속성 컨텍스트와 전혀 관계가 없는 새로운 상태 // 객체만 생성하였으므로, 비영속...","categories": ["JPA"],
        "tags": ["2021년 08월"],
        "url": "/jpa/persistent-context/",
        "teaser": null
      },{
        "title": "플러시(flush)",
        "excerpt":"플러시(flush) 플러시(flush)는 영속성 컨텍스트의 변경 내용을 데이터베이스에 반영하는 것이다. 데이터베이스 transaction commit이 발생하면 자동 플러시(flush) 됨 영속성 컨텍스트의 변경 내용을 데이터베이스에 동기화하는 것이지 영속성 컨텍스트를 비우는 것이 아니다. transaction이라는 작업 단위가 있기 때문에 플러시(flush)가 동작 가능하다. commit 직전에만 동기화 하면 됨 플러시(flush) 발생 플러시(flush)가 발생하면 다음과 같은 일이 발생한다. 변경...","categories": ["JPA"],
        "tags": ["2021년 09월"],
        "url": "/jpa/flush/",
        "teaser": null
      },{
        "title": "준영속 상태",
        "excerpt":"준영속 상태 준영속 상태란, 영속상태의 엔티티가 영속성 컨텍스트에서 분리된 것이다. 준영속 상태가 되면 영속성 컨텍스트가 제공하는 기능(변경 감지)을 사용하지 못한다. 준영속 상태로 만드는 방법 em.detach(entity) 특정 엔티티만 준영속 상태로 전환 Member findMember = em.find(Member.class, 2L); findMember.setName(\"hyuuny\"); // findMember를 준영속 상태로 변경한다. em.detach(findMember); System.out.println(\"member : \" + findMember); tx.commit(); findMember의 name을...","categories": ["JPA"],
        "tags": ["2021년 09월"],
        "url": "/jpa/detach/",
        "teaser": null
      },{
        "title": "객체와 테이블 매핑",
        "excerpt":"@Entity @Entity가 붙은 클래스는 JPA가 관리하게 된다. JPA를 사용해서 테이블과 매핑할 클래스는 @Entity를 필수로 선언해야 한다. @Entity를 사용할 때는 다음과 같은 주의사항이 있다. 하이버네이트는 프록시 DB 연산 결과를 상속한 클래스의 기본 생성자를 호출하여 매핑한다. 이때, 알맞게 결과 값을 넣어주기 위해서는 public 또는 protected 레벨의 기본 생성자가 필요하다. final 클래스, enum,...","categories": ["JPA"],
        "tags": ["2021년 09월"],
        "url": "/jpa/entity-mapping/",
        "teaser": null
      },{
        "title": "mappedBy",
        "excerpt":"mappedBy mappedBy를 알아보기에 앞서 객체와 테이블이 관계를 맺는 차이를 알아보자 객체의 서로 단방향으로 관계를 맺기 때문에 2개의 연관관계가 존재하게 된다. 회원 -&gt; 팀 : 연관관계 1개(단방향) 팀 -&gt; 회원 : 연관관계 1개(단방향) 반면 테이블은 한쪽이 다른 쪽 pk를 참조하는 방식으로 1개의 연관관계가 존재하게 된다. 회원 &lt;-&gt; 팀 : 연관관계 1개(양방향)...","categories": ["JPA"],
        "tags": ["2021년 09월"],
        "url": "/jpa/mapped-by/",
        "teaser": null
      },{
        "title": "컴퓨터 구조",
        "excerpt":"컴퓨터 시스템 우리는 일반적으로 컴퓨터를 말할 때, “시스템”이란 용어를 덧 붙여서 “컴퓨터 시스템”이라고 부른다. 시스템이란 그 시스템에 부여된 목적을 달성하기 위하여 상호작용하는 구성요소들의 집합으로 정의된다. 이러한 컴퓨터 시스템의 원리는 인체와 비슷하다. 인체는 눈, 귀, 피부, 혀, 코와 같은 감각기관을 통해 데이터를 받아들이고, 수집된 데이터는 뇌에 전달된다. 신경망은 뇌에 저장된 데이터를...","categories": ["computer-science"],
        "tags": ["2021년 09월"],
        "url": "/computer-science/computer-system/",
        "teaser": null
      },{
        "title": "ignoring()",
        "excerpt":"ignoring WebSecurity의 ignoring()을 사용해서 요청(request)시 시큐리티 필터 적용을 제외하도록 설정할 수 있다. 스프링 부트가 제공하는 PathRequest를 사용하면 정적(static) 자원 요청에 대하여 스프링 시큐리티 필터가 적용되지 않도록 설정할 수 있는데, 이경우 FilterChain을 거치지 않는다. public void configure(WebSecurity web) throws Exception { web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations()); } 또 다른 설정방법 이와 같이 하나에 설정할수도 있지만,...","categories": ["spring-security"],
        "tags": ["2021년 09월"],
        "url": "/spring-security/ignoring/",
        "teaser": null
      },{
        "title": "WebAsyncManagerIntegrationFilter",
        "excerpt":"WebAsyncManagerIntegrationFilter WebAsyncManagerIntegrationFilter는 스프링 MVC의 Async 기능(핸들러에서 Callable을 리턴할 수 있는 기능)을 사용할 때에도 SecurityContext를 공유하도록 도와주는 필터. @GetMapping(\"/async-handler\") @ResponseBody public Callable&lt;String&gt; asyncHandler() { SecurityLogger.log(\"MVC\"); // thread = http-nio-8080-exec-5 return () -&gt; { SecurityLogger.log(\"Callable\"); // thread = tesk-1 return \"Async Handler\"; }; } // logger public static void log(String message) {...","categories": ["spring-security"],
        "tags": ["2021년 09월"],
        "url": "/spring-security/web-async-managerIntegration-filter/",
        "teaser": null
      },{
        "title": "주소지정방식",
        "excerpt":"주소지정방식 명령어 내의 연산코드 필드는 수행할명령어의 종류를 지정하고, 컴퓨터 레지스터나 기억장치에 저장되어 있는 항목을 대상으로 수행된다. 프로그램 수행 시 오퍼랜드를 지정하는 방법은 명령어 내에 있는 주소지정방식에 의해 결정된다. 주소지정방식(addressing mode)이란, 오퍼랜드를 실제로 참조하기 전에 명령어의 오퍼랜드를 변경하거나 해석하는 규칙을 지정하는 형식이다. 이러한 규칙을 적용하여 만들어진 오퍼랜드 주소를 유효주소(effective address)라고 한다....","categories": ["computer-science"],
        "tags": ["2021년 09월"],
        "url": "/computer-science/addressing-method/",
        "teaser": null
      },{
        "title": "산술/논리연산장치",
        "excerpt":"산술/논리연산장치 ALU는 기본적인 산술연산과 논리연산을 실행하는 조합논리회로다. ALU에는 특정한 연산을 선택하기 위하여 몇 개의 선택입력선이 주어진다. 선택입력선은 ALU 내에서 디코드되는데, k개의 선택입력으로 최대 2^k에 해당하는 서로 다른 연산을 표시할 수 있다. 또한, 산술연산회로와 논리연산회로를 결합하여 하나의 ALU를 만들어 낼 수 있다. ALU에 대한 연산표는 다음과 같다. 산술연산회로 산술연산회로의 가장 기본적인...","categories": ["computer-science"],
        "tags": ["2021년 09월"],
        "url": "/computer-science/alu/",
        "teaser": null
      },{
        "title": "처리장치의 구성요소",
        "excerpt":"처리장치의 구성요소 처리장치는 여러 가지 마이크로연산을 수행할 수 있도록 레지스터와 ALU(산술/논리연산장치), 레지스터와 ALU는 연결선로인 버스(bus)로 연결된다. 따라서 처리장치는 여러 개의 레지스터, ALU, 내부버스로 구성된다. 위 그림은 처리장치의 내부 구성도로 레지스터와 ALU, 시프터(shifer), 디지털 논리회로로 구성되어 있다. 처리장치의 동작원리는 우선 하나의 마이크로연산이 실행되기 위해서 지정된 출발 레지스터의 내용이 ALU의 입력으로 전달되고,...","categories": ["computer-science"],
        "tags": ["2021년 09월"],
        "url": "/computer-science/components-processing/",
        "teaser": null
      },{
        "title": "상태 레지스터와 시프터",
        "excerpt":"상태 레지스터 상태 레지스터는 ALU에서 산술연산을 수행한 후 연산 결과에 의해 상태 레지스터를 세트한다. 상태 레지스터들은 C(carry bit), S(sign bit), Z(zero bit), V(overflow bit)로 구성되어 있으며, 1개 상태가 1개 비트씩 기억될 수 있도록 비트 단위로 구성되어 있다. ALU에서 산술연산이 수행된 후 연산결과에 의해 나타나는 상태값을 저장 상태 레지스터는 C(carry bit),...","categories": ["computer-science"],
        "tags": ["2021년 09월"],
        "url": "/computer-science/status-register/",
        "teaser": null
      },{
        "title": "HTTP",
        "excerpt":"월드 와이드 웹을 지탱하는 가장 중요한 기술 두 가지는 HTML과 HTTP이다. 이 두 기술은 팀 버너스 리가 웹을 발명할 때 함께 만들어졌다. 전 세계의 웹 브라우저, 서버, 웹 애플리케이션은 모두 HTTP(Hyper Text Tranfer Protocol)를 통해 서로 대화한다. 인터넷의 멀티미디어 배달부 수십억 개의 JPEG 이미지, HTML 페이지, 텍스트 파일, MPEG 동영상,...","categories": ["HTTP"],
        "tags": ["2021년 09월"],
        "url": "/http/opening/",
        "teaser": null
      },{
        "title": "URL과 리소스",
        "excerpt":"URL은 브라우저가 정보를 찾는데 필요한 리소스의 위치를 가리키며, URL을 이용해 사람과 애플리케이션이 인터넷상의 수십억 개의 리소스를 찾고 사용하며 공유할 수 있다. 그리고 URL을 통해 사람이 HTTP 및 다른 프로토콜을 통해 접근할 수 있다. 사용자는 브라우저에 URL을 입력하고 브라우저는 화면 뒤에서 사용자가 원하는 리소스를 얻기 위해서 적절한 프로토콜을 사용하여 메시지를 전송한다....","categories": ["HTTP"],
        "tags": ["2021년 09월"],
        "url": "/http/url-and-resource/",
        "teaser": null
      },{
        "title": "HTTP 메시지",
        "excerpt":"HTTP가 인터넷의 배달원이라면, HTTP 메시지는 무언가를 담아 보내는 소포와 같다. 이번에는 어떻게 메시지를 만들고 이해하는지에 대해 알아보자 메시지의 흐름 HTTP 메시지는 HTTP 애플리케이션 간에 주고받은 데이터의 블록들이다. 이 데이터의 블록들은 메시지의 내용과 의미를 설명하는 텍스트 메타 정보로 시작하고 그 다음에 선택적으로 데이터가 올 수 있다. 이 메시지는 클라이언트, 서버, 프락시...","categories": ["HTTP"],
        "tags": ["2021년 09월"],
        "url": "/http/message/",
        "teaser": null
      },{
        "title": "HTTP 메서드",
        "excerpt":"안전한 메서드(Safe Method) HTTP는 안전한 메서드라 불리는 메서드의 집합을 정의한다. GET과 HEAD 메서드는 안전하다고 할 수 있는데, 이는 GET이나 HEAD 메서드는 HTTP 요청의 결과로 서버에 어떤 작용도 없음을 의미한다. 안전한 메서드가 서버에 작용을 유발하지 않는 다는 보장은 없지만(웹 개발자가 어떻게 구현하냐에 달림), 안전한 메서드의 목적은 서버에 어떤 영향을 줄 수...","categories": ["HTTP"],
        "tags": ["2021년 09월"],
        "url": "/http/method/",
        "teaser": null
      },{
        "title": "상태 코드",
        "excerpt":"HTTP 상태 코드는 크게 다섯가지로 나뉘는데, 아래에서 자세히 살펴보자 100-199: 정보성 상태 코드 정보성 상태 코드는 HTTP/1.1에서 도입되었다. 상태 코드 사유 구절 의미 100 Continue 요청의 시작 부분 일부가 받아들여졌으며, 클라이언트는 나머지는 계속 이어서 보내야 함을 의미한다. 서버는 반드시 요청을 받아 응답해야 한다. 101 Swiching Protocols 클라이언트가 Upgrade 헤더에 나열한...","categories": ["HTTP"],
        "tags": ["2021년 09월"],
        "url": "/http/status-code/",
        "teaser": null
      },{
        "title": "인프라 환경",
        "excerpt":"컨테이너 인프라 환경은 컨테이너를 중심으로 구성된 인프라 환경이다. 컨터이너(container)는 하나의 운영체제 커널에서 다른 프로세스에 영향을 받지 않고 독립적으로 실행되는 프로세스 상태를 의미한다. 이렇게 구현된 컨테이너는 가상화 상태에서 동작하는 프로세스보다 가볍고 빠르게 동작한다. 모놀리식 아키텍쳐(Monolithic Architecture) 모놀리식 아키텍처는 하나의 큰 목적이 있는 서비스 또는 애플리케이션에 여러 기능이 통합돼 있는 구조를 의미한다....","categories": ["Docker-Kubernetes"],
        "tags": ["2021년 10월"],
        "url": "/docker-kubernetes/infra/",
        "teaser": null
      },{
        "title": "쿠버네티스(Kubernetes)",
        "excerpt":"컨테이너 인프라 환경이란 리눅스 운영 체제의 커널 하나에서 여러 개의 컨테이너가 격리된 상태로 실행되는 인프라 환경을 말한다. 여기서 컨테이너는 하나 이상의 목적을 위해 독립적으로 작동하는 프로세스를 뜻한다. 컨테이너 오케스트레이션 실제로 쿠버네스트는 컨테이너 오케스트레이션을 위한 솔루션으로, 오케스트레이션이란 복잡한 단계를 관리하고 요소들의 유기적인 관계를 미리 정의해 손쉽게 사용하도록 서비스를 제공하는 것을 뜻한다....","categories": ["Docker-Kubernetes"],
        "tags": ["2021년 10월"],
        "url": "/docker-kubernetes/kuberbetes/",
        "teaser": null
      },{
        "title": "OSI 7계층",
        "excerpt":"과거에는 통신용 규약이 표준화되지 읺았고 각 벤더에서 별도로 개발했기 때문에 호환되지 않는 시스템이나 애플리케이션이 많았고 통신이 불가능했다. 이를 하나의 규약으로 통합하려는 노력이 현재의 OSI 7계층으로 남게 되었고 대부분의 프로토콜이 TCP/IP 프로토콜 스택 기반으로 되어 있다. OSI 7계층은 두 가지 계층으로 나눌 수 있다. 1~4 계층 : 데이터 플로 계층(Data Flow...","categories": ["network"],
        "tags": ["2021년 10월"],
        "url": "/network/osi7layer/",
        "teaser": null
      },{
        "title": "REST API란",
        "excerpt":"REST는 Representational State Transfer의 약자로 아키텍처 스타일이다. 아키텍처 스타일은 아키텍처 패턴과는 조금 다른데 아키텍처 패턴은 어떤 반복되는 문제 상황을 해결하는 도구이고, 아키텍처 스타일은 반복되는 아키텍처 디자인을 의미한다. REST 아키텍처 스타일은 6가지 제약조건으로 구성되며, 이 가이드 라인을 따르는 API를 RESTfull API라고 한다. REST 제약 조건 클라이언트-서버(Client-Server) 상태가 없는(stateless) 캐시되는 데이터(Cacheable) 일관적인...","categories": ["spring"],
        "tags": ["2021년 10월"],
        "url": "/spring/rest-api/",
        "teaser": null
      },{
        "title": "SOLID 원칙",
        "excerpt":"클린코드로 유명한 로버트 마틴이 좋은 객체 지향 설계의 5가지 원칙을 정리하였다. SRP: 단일 책임 원칙(Single Responsibility Principle) OCP: 개방-폐쇄 원칙(Opne Closed Principle) LSP: 리스코프 치환 원칙(Liskov Substitution Principle) ISP: 인터페이스 분리 원칙(Interface Segregation Principle) DIP: 의존관계 역전 원칙(Dependency Inversion Principle) SRP 단일 책임 원칙(Single Responsibility Principle) 한 클래스는 하나의 책임을...","categories": ["spring"],
        "tags": ["2021년 10월"],
        "url": "/spring/SOLID/",
        "teaser": null
      },{
        "title": "ApplicationContext",
        "excerpt":"Config 기반 Bean 설정 @Configuration public class AppConfig { @Bean public MemberService memberService() { return new MemberServiceImpl(memberRepository()); } @Bean public MemberRepository memberRepository() { return new MemoryMemberRepository(); } @Bean public OrderService orderService() { return new OrderServiceImpl(memberRepository(), discountpolicy()); } @Bean public DiscountPolicy discountpolicy() { return new RateDiscountPolicy(); } } AppConfig에 설정을 구성한다는...","categories": ["spring"],
        "tags": ["2021년 10월"],
        "url": "/spring/ApplicationContext/",
        "teaser": null
      },{
        "title": "IoC, DI, Container",
        "excerpt":"제어의 역전(Inversion of Control) 기존 프로그램은 클라이언트 구현 객체가 스스로 필요한 서버 구현 객체를 생성하고, 연결하고, 실행했다. 한마디로 구현 객체가 프로그램의 제어 흐름을 스스로 조종했다. AppConfig가 등장한 이후에 구현 객체는 자신의 로직을 실행하는 역할만 담당한다. 프로그램의 제어 흐름은 이제 AppConfig가 가져간다. 예를 들어서 OrderServiceImpl 은 필요한 인터페이스들(repository와 같은)을 호출하지만 어떤...","categories": ["spring"],
        "tags": ["2021년 10월"],
        "url": "/spring/IoC-DI-Container/",
        "teaser": null
      },{
        "title": "Singleton, SingletonContainer",
        "excerpt":"싱글톤(Sigleton) 클래스의 인스턴스가 딱 1개만 생성되는 것을 보장하는 디자인 패턴이다. 객체 인스턴스를 2개 이상 생성하지 못하도록 막아야 한다. private 생성자를 사용해서 외부에서 임의로 new 키워드를 사용하지 못하도록 막아야 한다. 싱글톤 패턴의 문제점 싱글톤 패턴을 구현하는 코드 자체가 많이 들어간다. 의존관계상 클라이언트가 구체 클래스에 의존한다. DIP를 위반한다. 클라이언트가 구체 클래스에 의존해서...","categories": ["spring"],
        "tags": ["2021년 10월"],
        "url": "/spring/sington/",
        "teaser": null
      },{
        "title": "Configuration과 Singleton",
        "excerpt":"@Configuration public class AppConfig { @Bean public MemberService memberService() { return new MemberServiceImpl(memberRepository()); } @Bean public OrderService orderService() { return new OrderServiceImpl(memberRepository(), discountPolicy()); } @Bean public MemberRepository memberRepository() { return new MemoryMemberRepository(); } ... } memberService 빈을 만드는 코드를 보면 memberRepository()를 호출한다. orderService 빈을 만드는 코드도 동일하게 memberRepository()를 호출한다. new연산자를...","categories": ["spring"],
        "tags": ["2021년 10월"],
        "url": "/spring/configuration/",
        "teaser": null
      },{
        "title": "컴포넌트 스캔(@ComponentScan)",
        "excerpt":"스프링은 설정 정보가 없어도 없어도 자동으로 스프링 빈을 등록하는 컴포넌트 스캔이라는 기능을 제공한다. 또 의존 관계도 자동으로 주입하는 @Autowired도 제공한다. @Configuration public class AutoAppConfig { } 컴포넌트 스캔을 사용하려면 먼저 @ComponentScan을 설정 정보에 붙여주면 된다. 기존의 AppConfig와는 다르게 @Bean으로 등록한 클래스가 하나도 없다. @Configuration이 컴포넌트 스캔의 대상이 된 이유도 @Configuration...","categories": ["spring"],
        "tags": ["2021년 11월"],
        "url": "/spring/component-scan/",
        "teaser": null
      },{
        "title": "의존성 주입(Dependency Injection)",
        "excerpt":"DI는 디자인 패턴으로 크게 다음과 같이 4가지 방법이 있다. 생성자 주입 setter 주입 필드 주입(@Autowired) 일반 메서드 주입 생성자 주입 이름 그대로 생성자를 통해서 의존 관계를 주입 받는 방법 생성자 호출 시점에 단 1번만 호출되는 것이 보장된다. 불변, 필수 의존 관계에 사용 @Component public class OrderServiceImpl implements OrderService { private...","categories": ["spring"],
        "tags": ["2021년 11월"],
        "url": "/spring/dependency-injection/",
        "teaser": null
      },{
        "title": "조회 빈이 2개 이상일 때 문제 해결",
        "excerpt":"@Autowired는 타입(Type)으로 조회한다. 이때 선택된 빈이 2개 이상일 때 문제가 발생한다. 예제를 위해 DiscountPolicy의 하위 타입인 FixDiscountPolicy와 RateDiscountPolicy를 스프링 빈으로 선언해보자. @Component public class FixDiscountPolicy implements DiscountPolicy { } @Component public class RateDiscountPolicy implements DiscountPolicy { } 여기서 다음과 같이 의존관계 자동 주입을 실행하면 @Autowired private DiscountPolicy discountPolicy NoUniqueBeanDefinitionException 예외가...","categories": ["spring"],
        "tags": ["2021년 11월"],
        "url": "/spring/bean-error/",
        "teaser": null
      },{
        "title": "웹 스코프(Web Scope)",
        "excerpt":"웹 스코프(Web Scope)의 특징 웹 스코프는 웹 환경에서만 동작한다. 웹 스코프는 프로토타입과 다르게 스프링이 해당 스코프의 종료시점까지 관리한다. 따라서 종료 메서드가 호출된다. 웹 스코프(Web Scope) 종류 request : HTTP 요청 하나가 들어오고 나갈 때 까지 유지되는 스코프, 각각의 HTTP 요청마다 별도의 빈 인스턴스가 생성되고, 관리된다. session : HTTP Session과 동일한...","categories": ["spring"],
        "tags": ["2021년 11월"],
        "url": "/spring/web-scope/",
        "teaser": null
      },{
        "title": "Web Scope - request 예제",
        "excerpt":"동시에 여러 HTTP 요청이 오면 정확히 어떤 요청이 남긴 로그인지 구분하기 어렵다. 이럴때 사용하기 좋은것이 바로 request 스코프이다. request 스코프를 이용해서 다음과 같은 로그를 남겨보자. [1085cefa-e6ae-4c2e-b639-c3750fd58945] request scope bean create : hello.core.common.MyLogger@32d1aada [1085cefa-e6ae-4c2e-b639-c3750fd58945] [http://localhost:8080/log-demo] controller test [1085cefa-e6ae-4c2e-b639-c3750fd58945] [http://localhost:8080/log-demo] service id : testId [1085cefa-e6ae-4c2e-b639-c3750fd58945] request scope bean close : hello.core.common.MyLogger@32d1aada 로그를...","categories": ["spring"],
        "tags": ["2021년 11월"],
        "url": "/spring/request-exam/",
        "teaser": null
      },{
        "title": "스프링 메시지 소스 & 국제화",
        "excerpt":"스프링은 기본적인 메시지 관리 기능을 제공한다. 메시지 관리 기능을 사용하려면 스프링이 제공하는 MessageSource를 스프링 빈으로 등록하면 되는데, MessageSource는 인터페이스이다. 따라서 구현체인 ResourceBundleMessageSource 를 스프링 빈으로 등록하면 된다. 스프링 메시지 소스 직접 등록 @Bean public MessageSource messageSource() { ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource(); messageSource.setBasenames(\"messages\", \"errors\"); messageSource.setDefaultEncoding(\"utf-8\"); return messageSource; } basenames :...","categories": ["spring"],
        "tags": ["2021년 11월"],
        "url": "/spring/spring-message/",
        "teaser": null
      },{
        "title": "Bean Validation",
        "excerpt":"Bean Validation은 특정한 구현체가 아니라 Bean Validation 2.0(JSR-380)이라는 기술 표준이다. 쉽게 이야기해서 검증 애노테이션과 여러 인터페이스의 모음이다. 마치 JPA가 표준 기술이고 그 구현체로 하이버네이트가 있는 것과 같다. Bean Validation을 구현한 기술중에 일반적으로 사용하는 구현체는 하이버네이트 Validator이다. 이름이 하이버네이트가 붙어서 그렇지 ORM과는 관련이 없다. 하이버네이트 Validator 공식사이트 의존관계 추가 Bean Validation을...","categories": ["spring"],
        "tags": ["2021년 11월"],
        "url": "/spring/bean-validation/",
        "teaser": null
      },{
        "title": "비 연결성",
        "excerpt":"비 연결성 HTTP는 기본이 연결을 유지하지 않는 모델 일반적으로 초 단위 이하의 빠른 속도로 응답한다. 서버 자원을 효율적으로 사용할 수 있다. TCP/IP 연결을 매번 새로 맺어야 한다. 3 way handshake 시간 소요 웹 브라우저로 사이트를 요청하면 HTML 뿐만 아니라, JS, CSS, 이미지 등 수많은 자원을 함께 다운로드 현재는 HTTP 지속...","categories": ["HTTP"],
        "tags": ["2021년 12월"],
        "url": "/http/connectionless/",
        "teaser": null
      },{
        "title": "멱등성",
        "excerpt":"멱등성 멱등은 한 번 호출하든 두 번 호출하든 백 번 호출하든 결과가 항상 똑같다. f(f(x)) = f(x) 멱등 메서드 GET : 한 번 조회하든, 두 번 조회하든 같은 결과가 조회된다. PUT : 결과를 대체한다. 따라서 같은 요청을 여러번 해도 최종 결과는 같다. DELETE : 결과를 삭제한다. 같은 요청을 여러번 해도...","categories": ["HTTP"],
        "tags": ["2021년 12월"],
        "url": "/http/idempotent/",
        "teaser": null
      },{
        "title": "HTTP 쿠키(Cookie)",
        "excerpt":"Cookie 로그인 상태를 유지하기 위해 서버에서 로그인에 성공하면 HTTP 응답에 쿠키를 담아서 브라우저에 전달하고, 브라우저는 서버와 통신할 때 마다 해당 쿠키를 서버에게 지속적으로 보내준다. 영속쿠키 &amp; 세션쿠키 영속 쿠키: 만료 날짜를 입력하면 해당 날짜까지 유지 세션 쿠키: 만료 날짜를 생략하면 브라우저 종료시 까지만 유지 브라우저를 종료했을 때, 로그아웃이 되길 원하면...","categories": ["HTTP"],
        "tags": ["2021년 12월"],
        "url": "/http/cookie/",
        "teaser": null
      },{
        "title": "Spring - Session 구현",
        "excerpt":"Session 중요한 정보를 쿠키에 담아 보관하는 방법은 여러가지 보안 이슈가 있었다. 이 문제를 해결하기 위해 서버에 중요한 정보를 모두 저장하고, 클라이언트는 서버와 임의의 식별자로 연결한다. 이렇게 서버에 중요한 정보를 보관하고 연결을 유지하는 방법을 세션이라 한다. 세션 기능 개발 개발할 세션 기능(회원과 관련된 정보는 일절 클라이언트에 전달하지 않음)은 아래와 같다. 사용자가...","categories": ["spring"],
        "tags": ["2021년 12월"],
        "url": "/spring/session/",
        "teaser": null
      },{
        "title": "Spring - filter를 이용한 로그인 확인 기능 구현",
        "excerpt":"Servlet Filter 필터는 서블릿이 지원하는 수문장이다. 만약 로그인한 회원만 게시판의 글 쓰기, 수정, 삭제 기능을 사용할 수 있다면, 해당 로직마다 로그인을 확인하는 기능을 추가해야 할 것이다. 추후 이 기능이 수정되었다면, 일일이 다 찾아서 수정도 해야 한다. 이러한 공통 관심사는 스프링의 AOP로 해결할 수 있지만, 웹과 관련된 공통 관심사는 서블릿 필터...","categories": ["spring"],
        "tags": ["2021년 12월"],
        "url": "/spring/filter/",
        "teaser": null
      },{
        "title": "Spring - interceptor를 이용한 로그인 확인 기능 구현",
        "excerpt":"Interceptor 스프링 인터셉터도 서블릿 필터와 같이 웹과 관련된 공통 관심 사항을 효과적으로 해결할 수 있는 기술이다. 서블릿 필터가 서블릿이 제공하는 기술이라면, 스프링 인터셉터는 스프링 MVC가 제공하는 기술이다. 둘다 웹과 관련된 공통 관심 사항을 처리하지만, 적용되는 순서와 범위, 그리고 사용방법이 다르다. 인터셉터의 흐름은 다음과 같다. HTTP 요청 -&gt;WAS-&gt; 필터 -&gt; 디스패처...","categories": ["spring"],
        "tags": ["2021년 12월"],
        "url": "/spring/interceptor/",
        "teaser": null
      },{
        "title": "JPA - primitive error(Null value was assigned to a property ~~~ of primitive type setter of)",
        "excerpt":"스프링으로 JPA를 사용해서 개발하다보면 아래와 같은 에러를 마주치곤 한다. Null value was assigned to a property ~~~ of primitive type setter of 이유 하이버네이트는 내부적으로 setter메소드를 사용해서 조회 결과와 객체(Dto 또는 Entity)를 Mapping하게 되는데, 조회 결과의 null값을 primitive 타입의 변수에 저장하려 할 때 발생하는 것이다. 해결 방법 위 문제는 아래와...","categories": ["JPA"],
        "tags": ["2021년 12월"],
        "url": "/jpa/primitive-error/",
        "teaser": null
      },{
        "title": "Spring - Thread Local",
        "excerpt":"Thread Local 쓰레드 로컬은 해당 쓰레드만 접근할 수 있는 특별한 저장소를 말한다. 쉽게 이야기해서 물건 보관 창구를 떠올리면 된다. 여러 사람이 같은 물건 보관 창구를 사용하더라도 창구 직원은 사용자를 인식해서 사용자별로 확실하게 물건을 구분해준다. 사용자A, 사용자B 모두 창구 직원을 통해서 물건을 보관하고, 꺼내지만 창구 지원이 사용자에 따라 보관한 물건을 구분해주는...","categories": ["spring"],
        "tags": ["2022년 01월"],
        "url": "/spring/ThreadLocal/",
        "teaser": null
      }]
