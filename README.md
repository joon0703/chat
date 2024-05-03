# 넥스트론과 파이어베이스를 사용하여 채팅앱 만들기

## 회원가입
![회원가입](https://user-images.githubusercontent.com/80582578/166716969-0447718c-a1e0-4488-abf0-43a77d0d1acf.gif)
회원가입 페이지입니다. 따로 사이드바에 배치는 안시키고 로그인 화면에서만 넘어갈 수 있게 구성했습니다.

회원가입과 동시에 로그인이 됩니다.

## 로그인
![로그인](https://user-images.githubusercontent.com/80582578/166717062-a5bb53bf-c51f-47bd-81d5-ee48c48b98b7.gif)
로그인 페이지입니다. 이메일과 비밀번호를 받으며 로그인성공시에 홈화면으로 넘어갑니다. 

## 유저목록
![유저목록](https://user-images.githubusercontent.com/80582578/166717311-fefa8447-6766-4843-8e8f-49d20a169456.gif)
유저목록입니다. <나>라는 표시는 따로 안했고 본인아이디 누를시에 아무동작 안하게 설계했습니다.

## 1:1채팅
![개인톡입장](https://user-images.githubusercontent.com/80582578/166717446-aadef9f3-b360-4e86-822e-7795bf58675d.gif)
이메일을 클릭하면 대화방이 생성되고 즉시 채팅할 수 있습니다.

![대화방삭제](https://user-images.githubusercontent.com/80582578/166717522-29173f91-fc96-4eb5-98f7-40169dbae048.gif)
대화방은 둘중에 한명이라도 나가면 대화방이 사라지도록 구현했습니다.

## 그룹채팅
![그룹채팅만들기](https://user-images.githubusercontent.com/80582578/166717653-24bb68d6-710b-41c9-b869-34a73065663a.gif)
햄버거 모양의 그룹채팅 생성창에 생성하고싶은 방이름을 입력하면 생성됩니다.

![방삭제](https://user-images.githubusercontent.com/80582578/166717711-46e5c36a-3fd3-4d52-ac93-8cf63c2f30a7.gif)
대화방의 마지막 한명이 대화방을 삭제할 권리를 갖게됩니다.

## 소감
개인적으로 재밌게 만든 프로젝트였습니다. 엄청 어렵지도 않았고 뭔가 제대로 하나 만든 기분이였습니다. 파이어베이스를 처음 며칠 써봤을때 수신대기 함수로 채팅을 만들수는 있을것 같은데 느려서 써먹지 못하겠구나라고 단정지었었습니다. 막상 만들고나니 하나도 안느렸습니다. 일렉트론으로는 간단하게 빌드밖에 못해봤습니다. 처음에는 특히 잘모를때는 보일러플레이트를 자주 애용하곤 합니다. 나보다 잘아는 개발자가 환경구성도 잘해놨을꺼라는 믿음으로 가는편인데요. 처음으로 꼭 그렇지만도 않다고 느끼게 되었습니다. 지금은 버전이슈때문에 잘 동작하지 않았지만 그럼에도 불구하고 결국 불필요하게된 코드더미들이 많다는걸 알게되었습니다. 그래서 빌드후 용량도 생각외로 커졌구요. 거기다가 초기구성 셋팅이 한참달라져서 공식문서만 보고서는 도저히 수정이 안되기도 하더라구요. 다음에 만들게되면 초기셋팅을 이해하거나 처음부터 만들어보면서 만들어야겠다는 생각을 했습니다.

### 이슈

- Module parse failed: The keyword 'interface' is reserved (3:0)(solved)
    
    renderer라는 폴더 밖에서 컴포넌트 디렉토리를 만들어서 인식을 못했던거였습니다.
    
    ---
    
- log가 안찍히는 이슈가 있었습니다 혹은 찍혀도 터미널에만 나왔습니다(solved)
    
    npm i electron-log
    
    사용했는데 이거 깔고나니 콘솔로그도 잘찍혔습니다
    
    ---
    
- antd 메뉴 누르긴 하는데 이벤트를 어떻게 걸지 모르겠습니다(solved)
    
    최근에 업데이트 되서 사용법이 달라진거였습니다
    
    ---
    
- 일렉트론 로고 문제(not solved)
    
    이쁜게 문제, 개인적으로 이쁜것 같아서 그냥 쓰기로 했습니다
    
    ---
    
- FirebaseError: Firebase: Error (auth/invalid-api-key)(solved)
    
    env를 root에 놔야한다고 해서 최상단에다가 가져다 놨는데 안됐습니다.
    
    알고보니 이것 역시 renderer가 root 였습니다
    
    ---
    
- auth/internal-error(solved)
    
    실수로 input에 프로퍼티를 추가 안했습니다. 그래서 비밀번호 없이 로그인 시도가 된거였습니다.
    
    ---
    
- firebase auth 유저리스트 어떻게 가져오는지 모르겠습니다(solved)
    
    [How to add firebase authentication data to a firestore collection in React?](https://stackoverflow.com/questions/67636121/how-to-add-firebase-authentication-data-to-a-firestore-collection-in-react)
    
    [How do I store firebase Auth data in firestore?](https://stackoverflow.com/questions/67651893/how-do-i-store-firebase-auth-data-in-firestore)
    
    [Firebase list all users](https://stackoverflow.com/questions/67903927/firebase-list-all-users)
    
    결론적으로 말하자면 유저리스트 못가져오는게 맞았습니다
    
    [firebase v9 I am storing the User UID from firebase auth into firestore, help me retrieve it for sign in comparison](https://stackoverflow.com/questions/70585122/firebase-v9-i-am-storing-the-user-uid-from-firebase-auth-into-firestore-help-me)
    
    현재 사용자리스트 from firestore
    
    [React.js how can i get subcollecion datas in firestore](https://stackoverflow.com/questions/68048924/react-js-how-can-i-get-subcollecion-datas-in-firestore)
    
    보안규칙 꿀팁
    
    [firebase v9 문법 정리, firebase, storage, real time database, firestore, hosting](https://kyounghwan01.github.io/blog/etc/firebase/#firestore-database-crud)
    
    [[Firebase] Firebase로 Realtime Chat Application 만들기 [1]](https://velog.io/@blissful-y0/firebase)
    
    해결책: uid로 firestore에 users db를 따로하나 팜 그리고 거기서 디비조회해서 가져오면 모든 유저 목록을 받아 올 수 있습니다
    
    의문점: 현재 접속유저를 판별해서 리스트를 어떻게 가져올것인가? onAuthStateChanged는 본인의 접속기록만 보는것 같았습니다. 개발서버라 나혼자 접속해서 그런걸수도 있는데 비슷한 함수 많은데 아무래도 원하는 내용은 아닌것 같습니다.
    
    의문의 해결1: 본인 접속기록을 알수있으니 디비에 접속중인걸 업데이트 시켜줄순 있을것 같지만 로그아웃 여부나 브라우저 창만 닫았을경우 판별이 애매합니다. 리액트는 기본적으로 보안상 close 이벤트를 받을 수 없습니다.
    
    사실 현재 접속유저와 모든 유저중에 찾아서 대화시도하는게 둘다 큰의미가 없다고 생각합니다. 오히려 실효성은 모든유저에 대해서 연락 방법을 취할수 있게 열어놓는게 맞습니다. 카톡도 접속중인 상태에서만 받는게 아니기 때문 입니다. 그러나 기왕 공부하면서 만들거면 탐구정신으로 이렇게 해보는건 어떨지? 고민해보는 의도였습니다.
    
    배포후 알게된것: 일렉트론에 클로즈 이벤트 받는게 있었습니다. 데스크톱 앱 한정이라면 이걸 이용해볼 수 있을것 같습니다.
    
    ---
    
- Could not reach Cloud Firestore backend. PERMISSION_DENIED: Permission denied on resource project(solved)
    
    ```jsx
    rules_version = '2';
    service cloud.firestore {
    match /databases/{database}/documents {
    match /{document=**} {
    allow read, write: if true;
    		}
    	}
    }
    ```
    
    모두 허용이라는 규칙을 주어 혹시 모를 변수를 차단했습니다(완성하고 다시 바꿔놓을 예정)
    
    배포후: deploy가 안되서 룰은 계속 이대로 가야될것 같습니다.
    
    [여씨의 개발이야기](https://yeoossi.tistory.com/6)
    
    env에 따옴표 없애고 오류가 사라졌습니다 ⇒ 그러나 전에 했던 프로젝트는 전혀 문제가 없었습니다. 업데이트가 있었는지 원인을 모르겠습니다
    
    ---
    
- 채팅 입력창을 바닥에 붙이기(solved)
    
    absolute나 fixed를 적용하면 인풋길이 조절이 안되는 버그가 있어서
    
    height 100%로 인풋창을 바닥으로 밀려고 했는데 이건또 적용시키려면 부모까지 프롭스처럼 옵션을 줘야 한다고 합니다. 확인해보니 antd 내부에도 태그가 있어서 여기도 다적용 시켜야 하는데 많이 복잡해보여서 다른방법을 찾아야 겠습니다.
    
    다안되서 css는 진짜 피로를 많이 느꼈습니다. 레이아웃 구성 다잡아놓고 100vh줘서 해결했습니다.
    
    추가로 `react-viewport-height`  라는 라이브러리의 도움을 받았습니다.
    
    ---
    
- 유저,그룹 리스트 간헐적으로 사라지는 현상(solved)
    
    오류가 났다던지 어떤 이유간에 사라질때가 있습니다. 단순히 값에 할당해놔서 그렇다고 생각합니다.
    
    리렌더는 페이지이동시에 일어나기 때문에 화면전환을 해주면 해결됩니다. 스토리지에도 값을 담아두는 방법도 있습니다.
    
    추가로 손을 봤는데 파이어베이스 로직안에 담아두면 바로 처리가 됩니다.
    
    ---
    
- 새로고침시 로그인이 풀리는 현상(not solved)
    
    새로고침이 없다는 전제하에 진행했습니다
    
    ---
    
- antd Search input 컨트롤 모르겠습니다(unsolved)
    
    ~~조금 복잡하긴 하지만 돌아가긴 합니다.~~
    
    삭제했습니다.
    
    입력하지 않은 마지막 글자가 추가로 입력됩니다.
    
    ---
    
- 채팅입력시 한글 마지막글자 입력이 한번더 발생합니다(solved)
    
    [JavaScript Events Handlers - Keyboard and Load Events](https://levelup.gitconnected.com/javascript-events-handlers-keyboard-and-load-events-1b3e46a6b0c3)
    
    파이어베이스가 문제인줄 알았는데 키입력 문제였습니다
    
    문제가 antd의 Search를 사용중인데 해결방법을 전혀 모르겠습니다
    
    이것만 아니면 렌더만 하면 채팅기능 구현이 끝나는데 아쉽습니다.
    
    만들어둔게 아쉽지만 새로 만들기로 했습니다.
    
    ---
    
- antd layout 활용이 쉽지가 않았습니다(solved)
    
    처음엔 그냥 가져다 쓰는거니까 만드는 노력보다 싸지 않을까 생각했습니다.
    
    모든 화면에 필요할 거라 생각해서 _app에도 적용시켜 놨습니다.
    
    한번 구성하면 계속 layout이 요구하는데로 작성해주지 않으면 화면에 나타나지 않았습니다.
    
    _app > children 구성으로 사용하는데 문제는 Footer에서 문제가 발생했습니다.
    
    home,login,singup 화면에는 footer를 출력하고 싶었습니다.
    
    login || home || signup 따로따로 조건을 달아야하나 고민했습니다.
    
    맘데로 안되서 고민고민하다가 규칙하나를 발견했는데
    
    ```jsx
    {router.pathname.length < 8 && (
              <Footer style={{ textAlign: "center" }}>
                Tera ChatApp ©2022 Created by LazyJun
              </Footer>
            )}
    ```
    
    어짜피 채팅방에는 uid를 라우터로 주기때문에 무조건 8자이상으로 uid가 형성됩니다.
    
    ---
    
- 채팅입력창을 정확하게 바닥에 놓을 수 없었습니다(solved)
    
    fixed를 쓰면 layout의 값에 영향받아 화면에 딱맞게 사용할수가 없었고
    
    full이나 vh를 사용시에 역시 모니터 해상도에 영향을 받기 때문에 채팅창을 바닥에 딱 고정시킬 방법이 아니였습니다.
    
    브라우저 높이를 받아오면 좋겠다 생각했습니다. 찾아보니 `react-viewport-height` 라는 라이브러리가 있어 도움을 받기로 했습니다.
    
    ```jsx
    style={{ height: `calc(100vh - 100px)` }}
    ```
    
    ---
    
- 시간이 제대로 안받아와졌습니다(solved)
    
    `.toDate()` 의 존재를 몰라가지고 초랑 밀리초로 받아왔었습니다.
    
    초랑 밀리초를 받았을때 dayjs로 변환을 시도했더니 1970년 기준으로 계산되었습니다.
    
    `.toDate()` 를 알고나서 무난하게 처리되었습니다.
    
    ---
    
- 채팅창 새로운 채팅마다 바닥으로 스크롤을 보내줘야 했습니다(solved)
    
    [[React] React scroll to bottom](https://blog.qvil.dev/react/react-scroll-to-bottom-with-messages-effect)
    
    ---
    
- strict true(solved)
    
    분명히 처음에 strict: true로 바꿔놓고 개발시작했는데
    
    매개변수 넣을때 any라도 꼭 명시해줬어야 했던걸로 알고 있었습니다.
    
    strict가 꺼진채로 개발한건 처음이었기 때문에 넥스트론은 뭔가 다른가? 이생각을 했었습니다.
    
    개발도 거의다 끝난시점에 타입스크립트 스터디를 시작했습니다.
    
    호기심에 noImplicitAny strictNullChecks 옵션 두개를 넣어봤더니 여기저기 타입에러가 막나기 시작했습니다.
    
    지우고 난후에도 계속 유지가 되더라구요.
    
    그때 알게된건 strict가 적용이 되고있지 않았다는것과 strict안의 옵션에는 noImplicitAny strictNullChecks 두가지 옵션이 포함되어 있다는것을 알게 되었습니다.
    
    분명히 넣기 애매하고 막막한 타입이 있기때문에 만약 중간에 너무 힘들면 strict를 끌것같습니다
    
    ...
    
    현재 개발된것 까지는 수정을 다해놨고
    
    이런경우는 처음이라 코드가 정해진 상태에서 타입을 정하려니 너무 힘들었습니다.
    
    정말 하다하다 안되서 치트키를 쓴 구간이 있었습니다
    
    ```tsx
    //GroupList.tsx
    ...
    {group.map((groupItem: GroupItemProps, index) => {
            return (
              <div
                key={index}
                className="p-1 cursor-pointer hover:text-blue-700"
                onClick={() => enterGroup(groupItem as any)}
              >{`${groupItem.title}`}</div>
            );
          })}
    ...
    ```
    
    GroupItemProps는 key:item 모양의 타입입니다. 이렇게 하지않으면 돌아가지 않더라구요.
    
    GroupProps는 item모양의 타입입니다. 요구되는 타입이 이런모양인데 타입스크립트 초보라 공부를 좀더 해야겠습니다.
    
    ---
    
- To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.(unsolved)
    
    관련 경고가 뜨지만 언제 왜 뜨는지 발견을 못했습니다.
    
     useEffect위주로 찾아보려 했으나 찾으려고 하면 안뜨고 가끔 보여서 포기했습니다.
    
    현재는 안뜨는것 같지만 안뜨는것인지 해결된것인지 모르겠습니다.
    
    ---
    
- Electron Security Warning (Insecure Content-Security-Policy)(unsolved)
    
    [CSP (Content Security Policy)](https://velog.io/@niyu/Content-Security-Policy)
    
    플러그인을 깔아봤고 meta태그도 써봤지만 안사라졌습니다
    
    최고수준의 보안으로 셋팅해봤지만 안사라졌습니다. 켜지는 시간만 오래걸려서 지웠습니다.
    
    ---
    
- deploy(unsolved)
    
    deploy 세팅이 되어있어 디플로이까지 해주려고 했는데
    
    아쉽게도 라이브러리중 하나가 v9를 지원을 안한다고 합니다.
    
    그이상은 잘모르기도 하고 시간이 너무 많이 걸릴것 같습니다.
    
    ---
