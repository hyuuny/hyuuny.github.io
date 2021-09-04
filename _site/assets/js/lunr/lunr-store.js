var store = [{
        "title": "Authentication Manager",
        "excerpt":"Spring Security에서 인증(Authentication)은 AuthenticationManager가 한다. Authentication authenticate(Authentication authentication) throws AuthenticationException 인자로 받은 Authentication이 유효한 인증인지 확인하고, Authentication객체를 리턴한다. 인증을 확인하는 과정에서 비활성 계정, 잘못된 비밀번호, 잠긴 계정 등의 에러를 던질 수 있다. 인자로 받은 Authentication 사용자가 입력한 인증에 필요한 정보(username, password)로 만든 객체다. (폼 인증의 경우) Authentication Principal : “hyuuny”...","categories": ["Spring Security"],
        "tags": ["2021년 08월"],
        "url": "/spring%20security/AuthenticationManager/",
        "teaser": null
      },{
        "title": "Spring Security Holder",
        "excerpt":"Security Context Holder SecurityContext 제공, 기본적으로 TreadLocal을 사용한다. SecurityContext Authentication 제공 Authentication Principal과 GrantAuthority 제공 Principal “누구”에 해당하는 정보 UserDetailsService에서 리턴한 객체 객체의 타입은 UserDetail GrantAuthority “ROLE_USER”, “ROLE_ADMIN”등 Principal이 가지고 있는 “권한”을 나타낸다. 인증 이후, 인가 및 권한 확인할 때 이 정보를 참조한다. UserDatails 애플리케이션이 가지고 있는 유저 정보와 스프링...","categories": ["Spring Security"],
        "tags": ["2021년 08월"],
        "url": "/spring%20security/SpringContextHolder/",
        "teaser": null
      },{
        "title": "Thread Local",
        "excerpt":"java.lang 패키지에서 제공하는 쓰레드 범위 변수. 즉, 쓰레드 수준의 데이터 저장소. 같은 쓰레드 내에서만 공유. 따라서 같은 쓰레드라면 해당 데이터를 메소드 매개변수로 넘겨줄 필요 없음. SecurityContextHolder의 기본 전략. public class AccountContext { private static final ThreadLocal&lt;Account&gt; ACCOUNT_THREAD_LOCAL = new ThreadLocal&lt;&gt;(); public static void setAccount(Account account) { ACCOUNT_THREAD_LOCAL.set(account); } public static...","categories": ["Spring Security"],
        "tags": ["2021년 08월"],
        "url": "/spring%20security/Thread-Local/",
        "teaser": null
      },{
        "title": "영속성 컨텍스트",
        "excerpt":"영속성 컨텍스트 영속성 컨텍스트란, 엔티티를 영구 저장하는 환경이라는 뜻이다. EntityManager의 persist()를 사용하여, Entity를 저장하고 영속성 컨텍스트로 관리한다. 영속성 컨텍스트는 논리적인 개념으로 눈에 보이지 않는다. EntityManager를 통해서 영속성 컨텍스트에 접근한다. 엔티티의 생명주기 엔티티의 생명주기는 다음과 같이 총 4단계로 구성됩니다. 비영속(new/transient) 영속성 컨텍스트와 전혀 관계가 없는 새로운 상태 // 객체만 생성하였으므로, 비영속...","categories": ["JPA"],
        "tags": ["2021년 08월"],
        "url": "/jpa/%EC%98%81%EC%86%8D%EC%84%B1-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8/",
        "teaser": null
      },{
        "title": "플러시(flush)",
        "excerpt":"플러시(flush) 플러시(flush)는 영속성 컨텍스트의 변경 내용을 데이터베이스에 반영하는 것이다. 데이터베이스 transaction commit이 발생하면 자동 플러시(flush) 됨 영속성 컨텍스트의 변경 내용을 데이터베이스에 동기화하는 것이지 영속성 컨텍스트를 비우는 것이 아니다. transaction이라는 작업 단위가 있기 때문에 플러시(flush)가 동작 가능하다. commit 직전에만 동기화 하면 됨 플러시(flush) 발생 플러시(flush)가 발생하면 다음과 같은 일이 발생한다. 변경...","categories": ["JPA"],
        "tags": ["2021년 09월"],
        "url": "/jpa/%ED%94%8C%EB%9F%AC%EC%8B%9C/",
        "teaser": null
      },{
        "title": "준영속 상태",
        "excerpt":"준영속 상태 준영속 상태란, 영속상태의 엔티티가 영속성 컨텍스트에서 분리된 것이다. 준영속 상태가 되면 영속성 컨텍스트가 제공하는 기능(변경 감지)을 사용하지 못한다. 준영속 상태로 만드는 방법 em.detach(entity) 특정 엔티티만 준영속 상태로 전환 Member findMember = em.find(Member.class, 2L); findMember.setName(\"hyuuny\"); // findMember를 준영속 상태로 변경한다. em.detach(findMember); System.out.println(\"member : \" + findMember); tx.commit(); findMember의 name을...","categories": ["JPA"],
        "tags": ["2021년 09월"],
        "url": "/jpa/%EC%A4%80%EC%98%81%EC%86%8D-%EC%83%81%ED%83%9C/",
        "teaser": null
      },{
        "title": "객체와 테이블 매핑",
        "excerpt":"@Entity @Entity가 붙은 클래스는 JPA가 관리하게 된다. JPA를 사용해서 테이블과 매핑할 클래스는 @Entity를 필수로 선언해야 한다. @Entity를 사용할 때는 다음과 같은 주의사항이 있다. 하이버네이트는 프록시 DB 연산 결과를 상속한 클래스의 기본 생성자를 호출하여 매핑한다. 이때, 알맞게 결과 값을 넣어주기 위해서는 public 또는 protected 레벨의 기본 생성자가 필요하다. final 클래스, enum,...","categories": ["JPA"],
        "tags": ["2021년 09월"],
        "url": "/jpa/%EC%97%94%ED%8B%B0%ED%8B%B0-%EB%A7%A4%ED%95%91/",
        "teaser": null
      },{
        "title": "mappedBy",
        "excerpt":"mappedBy mappedBy를 알아보기에 앞서 객체와 테이블이 관계를 맺는 차이를 알아보자 객체의 서로 단방향으로 관계를 맺기 때문에 2개의 연관관계가 존재하게 된다. 회원 -&gt; 팀 : 연관관계 1개(단방향) 팀 -&gt; 회원 : 연관관계 1개(단방향) 반면 테이블은 한쪽이 다른 쪽 pk를 참조하는 방식으로 1개의 연관관계가 존재하게 된다. 회원 &lt;-&gt; 팀 : 연관관계 1개(양방향)...","categories": ["JPA"],
        "tags": ["2021년 09월"],
        "url": "/jpa/mappedBy/",
        "teaser": null
      }]
