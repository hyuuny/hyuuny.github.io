var store = [{
        "title": "Authentication Manager",
        "excerpt":"Spring Security에서 인증(Authentication)은 AuthenticationManager가 한다. Authentication authenticate(Authentication authentication) throws AuthenticationException 인자로 받은 Authentication이 유효한 인증인지 확인하고, Authentication객체를 리턴한다. 인증을 확인하는 과정에서 비활성 계정, 잘못된 비밀번호, 잠긴 계정 등의 에러를 던질 수 있다. 인자로 받은 Authentication 사용자가 입력한 인증에 필요한 정보(username, password)로 만든 객체다. (폼 인증의 경우) Authentication Principal : “hyuuny”...","categories": ["Spring Security"],
        "tags": ["Spring Security"],
        "url": "/spring%20security/AuthenticationManager/",
        "teaser": null
      },{
        "title": "Spring Security Holder",
        "excerpt":"Security Context Holder SecurityContext 제공, 기본적으로 TreadLocal을 사용한다. SecurityContext Authentication 제공 Authentication Principal과 GrantAuthority 제공 Principal “누구”에 해당하는 정보 UserDetailsService에서 리턴한 객체 객체의 타입은 UserDetail GrantAuthority “ROLE_USER”, “ROLE_ADMIN”등 Principal이 가지고 있는 “권한”을 나타낸다. 인증 이후, 인가 및 권한 확인할 때 이 정보를 참조한다. UserDatails 애플리케이션이 가지고 있는 유저 정보와 스프링...","categories": ["Spring Security"],
        "tags": ["Spring Security"],
        "url": "/spring%20security/SpringContextHolder/",
        "teaser": null
      },{
        "title": "Thread Local",
        "excerpt":"java.lang 패키지에서 제공하는 쓰레드 범위 변수. 즉, 쓰레드 수준의 데이터 저장소. 같은 쓰레드 내에서만 공유. 따라서 같은 쓰레드라면 해당 데이터를 메소드 매개변수로 넘겨줄 필요 없음. SecurityContextHolder의 기본 전략. public class AccountContext { private static final ThreadLocal&lt;Account&gt; ACCOUNT_THREAD_LOCAL = new ThreadLocal&lt;&gt;(); public static void setAccount(Account account) { ACCOUNT_THREAD_LOCAL.set(account); } public static...","categories": ["Spring Security"],
        "tags": ["Spring Security"],
        "url": "/spring%20security/Thread-Local/",
        "teaser": null
      },{
        "title": "영속성 컨텍스트",
        "excerpt":"영속성 컨텍스트 영속성 컨텍스트란, 엔티티를 영구 저장하는 환경이라는 뜻이다. EntityManager의 persist()를 사용하여, Entity를 저장하고 영속성 컨텍스트로 관리한다. 영속성 컨텍스트는 논리적인 개념으로 눈에 보이지 않는다. EntityManager를 통해서 영속성 컨텍스트에 접근한다. 엔티티의 생명주기 엔티티의 생명주기는 다음과 같이 총 4단계로 구성됩니다. 비영속(new/transient) 영속성 컨텍스트와 전혀 관계가 없는 새로운 상태 // 객체만 생성하였으므로, 비영속...","categories": ["JPA"],
        "tags": ["JPA"],
        "url": "/jpa/%EC%98%81%EC%86%8D%EC%84%B1-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8/",
        "teaser": null
      }]
