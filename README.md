WH-Cinema Project
=

## ▶️ 개발 목표
<strong>
    <p>영화 예매 웹 서비스 개발</p>
</strong>
<br/>

## ▶️ 개발 환경
##### IDE : Visual Studio Code
##### Mysql Server
##### Mysql Workbench
<br/>

## ▶️ 사용 API
|용도|제공|API 문서|
|---------------|----------------|------------------------|
|결제|아임포트|[링크](https://developers.portone.io/docs/ko/readme?v=v1)|
|인증|아임포트|[링크](https://developers.portone.io/docs/ko/readme?v=v1)|
|영화 데이터|KMDB|[링크](https://www.kmdb.or.kr/eng/main)|
|영화 데이터|TMDB|[링크](https://www.themoviedb.org/?language=ko)|
<br/>

## ▶️ SKILLS
#### BE
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-373737?style=for-the-badge&logo=Express&logoColor=white)
---

#### FE
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)
---

#### DATABASE
![MySQL](https://img.shields.io/badge/Mysql-4479A1?style=for-the-badge&logo=Mysql&logoColor=white)
---

#### DEVOPS
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![Github](https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white)
![VSCode](https://img.shields.io/badge/VSCode-2C2C32.svg?style=for-the-badge&logo=visual-studio-code&logoColor=22ABF3)
<br/>

## ▶️ 주요 기능
|서비스|주요 기능|
|---------------|----------------|
|회원 서비스|<ul><li>JWT 로그인</li><li>회원가입</li></ul>|
|영화 목록|<ul><li>현재 상영작 및 상영 예정작 영화 목록 제공</li><li>영화 상세정보 제공</li></ul>|
|예매 서비스|<ul><li>영화 예매</li></ul>|
|사용자 마이페이지|<ul><li>회원정보 관리</li><li>예약 현황 관리</li></ul>|
<br/>


## ▶️ ERD
![image](https://github.com/pakms980319/ShoppingMall-SpringBoot-Mybatis/assets/114930673/2ee7465b-0b5b-476f-8096-ac8169a02274)
<br/>
---

## ▶️ 주요 END POINT DOC
### 회원 서비스
| URI           | REQUEST METHOD | DESCRIPTION            |
|---------------|----------------|------------------------|
| /user         | POST               | 회원가입을 합니다. 회원가입은 포트원 본인인증 API를 사용해서 인증된 회원만 회원가입이 가능합니다. |
| /user/findUserIdByEmail     | POST               | 회원이 가입한 이메일로 회원의 아이디를 찾는 서비스입니다. |
| /user/findUserIdByPhone     | POST               | 회원이 가입한 휴대폰번호로 회원의 아이디를 찾는 서비스입니다. |
| /user/findUserPasswordByEmailAsRandomValue     | POST               | 회원 이메일과 랜덤코드를 받아서 회원의 비밀번호를 찾는 서비스입니다. 인증에 통과한 회원에게 비밀번호 랜덤값을 전송합니다. |
| /user/findUserPasswordByAuthentication     | POST               | 포트원 본인인증 API를 사용해서 회원의 비밀번호를 찾는 서비스입니다. 본인인증에 통과한 회원에게 비밀번호 랜덤값을 전송합니다.|
| /user/duplicateUserCheck     | POST               | 회원가입시 중복된 회원인지 확인하는 서비스입니다.  |
| /myPage/user/modify     | PATCH               | 회원정보를 수정하는 서비스입니다. 회원정보 수정시 아이디, 비밀번호 체크를 한번더 통해서 인증된 회원만 수정이 가능합니다. |
| /myPage/user/delete     | DELETE               | 회원정보를 삭제하는 서비스입니다. 회원정보 삭제시 아이디, 비밀번호 체크를 한번더 통해서 인증된 회원만 수정이 가능합니다. |
| /myPage/user/searchForm     | GET               | 회원정보 조회를 합니다. 회원조회시 회원의 중요 정보(아이디, 비밀번호 등)을 제외한 개인정보(이름, 주소, 휴대폰 번호)등을 확인 할 수 있습니다.|
---
<br/>


### 상품 서비스
| URI           | REQUEST METHOD | DESCRIPTION            |
|---------------|----------------|------------------------|
| /productList | GET         | 상품 리스트를 조회합니다. | 
| /product | GET           | 상품 상세정보를 조회합니다  |
| /popularProducts | GET           | 카테고리별 인기 상품 리스트를 반환합니다. |
| /highDiscountProducts | GET         | 할인율이 높은 상품 리스트를 반환합니다.  |
| /recentProducts | GET        | 최근에 등록된 상품 리스트를 반환합니다.  |
| /admin/addProduct | GET        | 상품 등록 폼 페이지를 조회합니다.  |
| /admin/product | POST        | 상품을 등록합니다.  |
| /admin/modifyProduct | GET        | 상품 수정 폼 페이지를 조회합니다.  |
| /admin/product | PUT        | 상품을 수정합니다.  |
---
<br/>

### 게시판 서비스
| URI                | REQUEST METHOD | DESCRIPTION                  |
|--------------------|----------------|------------------------------|
| /customerInquiryBoardList       | GET                | 고객 문의 게시판을 조회합니다. |
| /customerInquiryBoard       | GET                | 고객 문의 상세 정보를 조회합니다. |
| /myCustomerInquiryBoardList       | GET                | 나의 고객 문의 게시판을 조회합니다. |
| /customerInquiryBoardComment       | GET                | 고객 문의 게시글에 작성된 댓글 리스트를 반환합니다. |
| /productInquiryBoardList       | GET                | 상품 문의 게시판을 조회합니다. |
| /productInquiryBoard       | GET                | 상품 문의 게시글을 조회합니다. |
| /productInquiryBoard/passwordCheck       | POST                | 상품 문의 게시글 비밀번호를 체크합니다. |
| /myProductInquiryBoardList      | GET                | 나의 상품 문의 게시판을 조회합니다. |
| /productInquiryBoardListAPI      | GET                | 상품에 대해 작성된 상품 문의 게시글 리스트를 반환합니다. |
| /productInquiry      | GET                | 상품 문의 게시글 작성 페이지를 조회합니다. |
| /productInquiry      | POST                | 상품 문의 게시글을 작성합니다. |
| /updateProductInquiry      | GET                | 상품 문의 게시글 수정 페이지를 조회합니다. |
| /productInquiry      | PUT                | 상품 문의 게시글을 수정합니다. |
| /productInquiry      | DELETE                | 상품 문의 게시글을 삭제합니다. |
| /ProductInquiryBoardComment      | GET                | 게시글에 작성된 댓글 리스트를 반환합니다. |
| /productReviewBoardListAPI      | POST                | 상품에 대해 작성된 상품 리뷰 리스트를 반환합니다. |
| /productReviewBoardList      | GET                | 상품 리뷰 게시판을 조회합니다. |
| /productReviewBoard      | GET                | 상품 리뷰 게시글을 조회합니다. |
| /myProductReviewBoardList      | GET                | 나의 상품 리뷰 게시판을 조회합니다. |
---
<br/>


### 장바구니 서비스
| URI           | REQUEST METHOD | DESCRIPTION            |
|---------------|----------------|------------------------|
| /cart         | GET               | 장바구니에 담긴 물건들을 보여주는 서비스입니다.|
| /cart         | POST              | 장바구니에 물건을 담는 서비스입니다. 비회원도 장바구니에 물건을 담을 수 있습니다. |
| /cart/Amount   | POST             | 장바구니에서도 물건의 수량을 변경할 수 있는 서비스입니다. 수량을 변경하면 cart-items의 테이블에 담긴 수량이 변경됩니다. |
| /cart/delete   | DELETE             | 장바구니에 담긴 물건을 삭제할 수 있는 서비스입니다. 물건을 삭제하면 CASCADE옵션으로 인해 cart의 하위 테이블도 함께 삭제됩니다. |
---
<br/>


### 주문/결제 서비스
| URI           | REQUEST METHOD | DESCRIPTION            |
|---------------|----------------|------------------------|
| /order         | GET              | 주문한 물건들을 보여주는 서비스입니다. 물건 주문 시 주문할 물건만 보여줍니다.|
| /order         | POST             | 물건들을 주문하는 서비스입니다. 물건 주문은 장바구니 또는 상품페이지에서 가능합니다. |
| /order/user    | GET              | 주문자 정보와 동일함 클릭시 회원가입시 입력한 정보를 바탕으로 화면에 전달해주는 서비스입니다. |
| /order/recent    | GET          | 최근에 입력한 배송지를 바탕으로 화면에 전달해주는 서비스입니다. |
| /payment/paymentForm         | GET        | 결제한 정보를 조회할 수 있는 서비스입니다.|
| /payment/save         | POST               | 결제한 정보를 저장하는 서비스입니다. 결제정보 저장 후 회원은 결제 정보 조회가 가능합니다.|
| /payment/cancel         | POST               | 결제를 취소하는 서비스입니다. 결제 취소는 관리자가 승인 한 이후 환불처리가 이루어집니다.|
---
<br/>

### 배송지 서비스
| URI                | REQUEST METHOD | DESCRIPTION                  |
|--------------------|----------------|------------------------------|
| /myPage/editAddress       | GET                | 배송지 작성/수정 페이지를 조회하는 서비스 입니다. |
| /myPage/editAddress       | POST                | 배송지를 작성/수정 하는 서비스 입니다. |
| /myPage/editAddress       | POST                | 배송지를 작성/수정 하는 서비스 입니다. |
| /order/shipping       | GET                | 나의 배송지 정보를 반환하는 서비스 입니다. |
---
<br/>

📃: File Tree
---
```
C:.
└─main
    ├─generated
    ├─java
    │  └─com
    │      └─example
    │          └─app
    │              │  AppApplication.java
    │              │  
    │              └─shopping
    │                  ├─config
    │                  │  │  DataSourceConfig.java
    │                  │  │  MybatisConfig.java
    │                  │  │  SecurityConfig.java
    │                  │  │  WebConfig.java
    │                  │  │  WebMvcConfig.java
    │                  │  │  
    │                  │  └─auth
    │                  │      │  PrincipalDetails.java
    │                  │      │  PrincipalDetailsOAuth2Service.java
    │                  │      │  PrincipalDetailsService.java
    │                  │      │  
    │                  │      ├─jwt
    │                  │      │      JwtAuthorizationFilter.java
    │                  │      │      JwtProperties.java
    │                  │      │      JwtTokenProvider.java
    │                  │      │      KeyGenerator.java
    │                  │      │      TokenInfo.java
    │                  │      │      
    │                  │      ├─loginHandler
    │                  │      │      CustomAuthenticationFailureHandler.java
    │                  │      │      CustomLoginSuccessHandler.java
    │                  │      │      Oauth2JwtLoginSuccessHandler.java
    │                  │      │      
    │                  │      ├─logoutHandler
    │                  │      │      CustomLogoutHandler.java
    │                  │      │      CustomLogoutSuccessHandler.java
    │                  │      │      
    │                  │      └─provider
    │                  │              GoogleUserInfo.java
    │                  │              KakaoUserInfo.java
    │                  │              NaverUserInfo.java
    │                  │              OAuth2UserInfo.java
    │                  │              
    │                  ├─controller
    │                  │      AdminController.java
    │                  │      CartController.java
    │                  │      CustomerInquiryBoardCommentController.java
    │                  │      CustomerInquiryBoardController.java
    │                  │      CustomErrorController.java
    │                  │      HomeController.java
    │                  │      MyPageController.java
    │                  │      OrderController.java
    │                  │      PaymentController.java
    │                  │      ProductController.java
    │                  │      ProductInquiryBoardCommentController.java
    │                  │      ProductInquiryBoardController.java
    │                  │      ProductReviewBoardController.java
    │                  │      UserController.java
    │                  │      
    │                  ├─domain
    │                  │  ├─dto
    │                  │  │  │  CartDto.java
    │                  │  │  │  CartItemsDto.java
    │                  │  │  │  CustomerInquiryBoardDto.java
    │                  │  │  │  CustomerInquiryCommentDto.java
    │                  │  │  │  MiddleCategoryDto.java
    │                  │  │  │  OrderDto.java
    │                  │  │  │  OrderItemDto.java
    │                  │  │  │  PaymentDto.java
    │                  │  │  │  PersistentLoginsDto.java
    │                  │  │  │  ProductDetailBoardDto.java
    │                  │  │  │  ProductDto.java
    │                  │  │  │  ProductInquiryBoardCommentDto.java
    │                  │  │  │  ProductInquiryBoardDto.java
    │                  │  │  │  ProductMajorCategoryDto.java
    │                  │  │  │  ProductReviewBoardDto.java
    │                  │  │  │  ShippingAddressDto.java
    │                  │  │  │  UserDto.java
    │                  │  │  │  WishDto.java
    │                  │  │  │  
    │                  │  │  └─common
    │                  │  │          Criteria.java
    │                  │  │          PageDto.java
    │                  │  │          
    │                  │  ├─mapper
    │                  │  │      CartItemMapper.java
    │                  │  │      CartMapper.java
    │                  │  │      CustomerInquiryBoardCommentMapper.java
    │                  │  │      CustomerInquiryBoardMapper.java
    │                  │  │      MajorCategoryMapper.java
    │                  │  │      MiddleCategoryMapper.java
    │                  │  │      OrderItemMapper.java
    │                  │  │      OrderMapper.java
    │                  │  │      PaymentMapper.java
    │                  │  │      ProductInquiryBoardCommentMapper.java
    │                  │  │      ProductInquiryBoardMapper.java
    │                  │  │      ProductMapper.java
    │                  │  │      ProductReviewBoardMapper.java
    │                  │  │      ShippingAddressMapper.java
    │                  │  │      SignatureMapper.java
    │                  │  │      UserMapper.java
    │                  │  │      WishMapper.java
    │                  │  │      
    │                  │  └─service
    │                  │      │  PaymentService.java
    │                  │      │  
    │                  │      ├─admin
    │                  │      │      AdminService.java
    │                  │      │      
    │                  │      ├─cart
    │                  │      │      CartService.java
    │                  │      │      
    │                  │      ├─customerInquiryBoard
    │                  │      │      CustomerInquiryBoardService.java
    │                  │      │      CustomerInquiryBoardServiceImpl.java
    │                  │      │      
    │                  │      ├─customerInquiryBoardComment
    │                  │      │      CustomerInquiryBoardCommentService.java
    │                  │      │      CustomerInquiryBoardCommentServiceImpl.java
    │                  │      │      
    │                  │      ├─myPage
    │                  │      │      MyPageService.java
    │                  │      │      
    │                  │      ├─order
    │                  │      │      OrderService.java
    │                  │      │      
    │                  │      ├─orderItem
    │                  │      │      OrderItemService.java
    │                  │      │      OrderItemServiceImpl.java
    │                  │      │      
    │                  │      ├─product
    │                  │      │      ProductService.java
    │                  │      │      ProductServiceImpl.java
    │                  │      │      
    │                  │      ├─productInquiryBoard
    │                  │      │      productInquiryBoardService.java
    │                  │      │      productInquiryBoardServiceImpl.java
    │                  │      │      
    │                  │      ├─productInquiryBoardComment
    │                  │      │      ProductInquiryBoardCommentService.java
    │                  │      │      ProductInquiryBoardCommentServiceImpl.java
    │                  │      │      
    │                  │      ├─productReviewBoard
    │                  │      │      ProductReviewBoardService.java
    │                  │      │      ProductReviewBoardServiceImpl.java
    │                  │      │      
    │                  │      └─user
    │                  │              UserService.java
    │                  │              
    │                  ├─handler
    │                  │      CustomLoginFailureHandler.java
    │                  │      CustomLogoutHandler.java
    │                  │      
    │                  ├─properties
    │                  │      FileUploadPathProperties.java
    │                  │      
    │                  └─valid
    │                          CustomPasswordMatchesValidator.java
    │                          PasswordMatches.java
    │                          
    └─resources
        │  application.properties
        │  
        ├─mapper
        │      CartItemMapper.xml
        │      CartMapper.xml
        │      CustomerInquiryBoardCommentMapper.xml
        │      CustomerInquiryBoardMapper.xml
        │      MajorCategoryMapper.xml
        │      MiddleCategoryMapper.xml
        │      OrderItemMapper.xml
        │      OrderMapper.xml
        │      PaymentMapper.xml
        │      ProductInquiryBoardCommentMapper.xml
        │      ProductInquiryBoardMapper.xml
        │      ProductMapper.xml
        │      ProductReviewBoardMapper.xml
        │      ShippingAddressMapper.xml
        │      UserMapper.xml
        │      WishMapper.xml
        │      
        ├─static
        │  ├─css
        │  │  │  common.css
        │  │  │  index.css
        │  │  │  
        │  │  ├─admin
        │  │  │  │  addProduct.css
        │  │  │  │  modifyProduct.css
        │  │  │  │  productLIstBoard.css
        │  │  │  │  
        │  │  │  └─payment
        │  │  │          delivery.css
        │  │  │          refund.css
        │  │  │          
        │  │  ├─board
        │  │  │      addBoard.css
        │  │  │      boardDetail.css
        │  │  │      boardList.css
        │  │  │      editBoard.css
        │  │  │      
        │  │  ├─cart
        │  │  │      cartForm.css
        │  │  │      
        │  │  ├─customerInquiry
        │  │  │      addCustomerInquiry.css
        │  │  │      editCustomerInquiry.css
        │  │  │      
        │  │  ├─customerInquiryBoardDetail
        │  │  │      customerInquiryBoardDetail.css
        │  │  │      
        │  │  ├─customerInquiryBoardList
        │  │  │      common.css
        │  │  │      
        │  │  ├─error
        │  │  │      error.css
        │  │  │      
        │  │  ├─fragments
        │  │  │  │  common.css
        │  │  │  │  footer.css
        │  │  │  │  nav.css
        │  │  │  │  
        │  │  │  └─admin
        │  │  │          common.css
        │  │  │          mainDetail.css
        │  │  │          
        │  │  ├─index
        │  │  │      common.css
        │  │  │      hightDiscountProducts.css
        │  │  │      popularProducts.css
        │  │  │      recentProducts.css
        │  │  │      
        │  │  ├─myPage
        │  │  │      common.css
        │  │  │      deleteForm.css
        │  │  │      editAddress.css
        │  │  │      mainDetail.css
        │  │  │      modifyForm.css
        │  │  │      myBoardList.css
        │  │  │      myCustomerInquiryPage.css
        │  │  │      myReviewPage.css
        │  │  │      passwordCheckForm.css
        │  │  │      paymentDetail.css
        │  │  │      paymentList.css
        │  │  │      searchForm.css
        │  │  │      wishList.css
        │  │  │      
        │  │  ├─order
        │  │  │      order.css
        │  │  │      
        │  │  ├─product
        │  │  │      productDetail.css
        │  │  │      productInquiryBoard.css
        │  │  │      productReviewBoard.css
        │  │  │      
        │  │  ├─productInquiry
        │  │  │      addProductInquiry.css
        │  │  │      updateProductInquiry.css
        │  │  │      
        │  │  ├─productInquiryBoardDetail
        │  │  │      productInquiryBoardDetail.css
        │  │  │      productInquiryBoardDetailPasswordCheck.css
        │  │  │      
        │  │  ├─productInquiryBoardList
        │  │  │      common.css
        │  │  │      
        │  │  ├─productList
        │  │  │      common.css
        │  │  │      productList.css
        │  │  │      
        │  │  ├─productReview
        │  │  │      addProductReview.css
        │  │  │      editProductReview.css
        │  │  │      
        │  │  ├─productReviewBoardDetail
        │  │  │      productReviewBoardDetail.css
        │  │  │      
        │  │  ├─productReviewBoardList
        │  │  │      common.css
        │  │  │      
        │  │  └─user
        │  │          findUserIdForm.css
        │  │          findUserPasswordForm.css
        │  │          joinForm.css
        │  │          loginForm.css
        │  │          
        │  ├─img
        │  │      ico_google.png
        │  │      ico_kakao.png
        │  │      ico_naver.png
        │  │      loading.svg
        │  │      Lock_close.svg
        │  │      Lock_open.svg
        │  │      main_banner_pc_1.jpg
        │  │      main_banner_pc_3.jpg
        │  │      main_banner_pc_4.jpg
        │  │      main_banner_pc_5.jpg
        │  │      minus.svg
        │  │      plus.svg
        │  │      건강풀때기_배너.png
        │  │      건강풀때기바탕제거.png
        │  │      꿀맛사과_banner.png
        │  │      우리쌀_banner.png
        │  │      이달의상품관_banner.jpg
        │  │      정기배송_banner.png
        │  │      채소기획전_banner.png
        │  │      한우세트_banner.png
        │  │      
        │  └─js
        │      │  index.js
        │      │  
        │      ├─admin
        │      │  │  addProduct.js
        │      │  │  modifyProduct.js
        │      │  │  productBoardBtnProcess.js
        │      │  │  
        │      │  └─payment
        │      │      ├─delivery
        │      │      │      deliveryBtn.js
        │      │      │      searchFormOnchange.js
        │      │      │      
        │      │      └─refund
        │      │              refundBtn.js
        │      │              
        │      ├─cart
        │      │      cartForm.js
        │      │      
        │      ├─customerInquiry
        │      │      editSubmitBtnProcess.js
        │      │      formValidation.js
        │      │      submitBtnProcess.js
        │      │      
        │      ├─customerInquiryBoardDetail
        │      │      btnProcess.js
        │      │      customerInquiryAddBtnProcess.js
        │      │      customerInquiryBoardDetailCommentProcess.js
        │      │      postCommentProcess.js
        │      │      
        │      ├─customerInquiryBoardList
        │      │      searchFormOnchange.js
        │      │      
        │      ├─index
        │      │      hightDiscountProductsProcess.js
        │      │      popularProductsProcess.js
        │      │      recentProductsProcess.js
        │      │      
        │      ├─myPage
        │      │      addProductReviewBtnProcess.js
        │      │      deleteForm.js
        │      │      editAddress.js
        │      │      modifyForm.js
        │      │      passwordCheckForm.js
        │      │      productInquiryBoardDetailPasswordCheckProcess.js
        │      │      refundBtnProcess.js
        │      │      searchFormOnchange.js
        │      │      wishList.js
        │      │      
        │      ├─order
        │      │      order.js
        │      │      
        │      ├─payment
        │      │      paymentForm.js
        │      │      
        │      ├─productDetail
        │      │      productDetail.js
        │      │      productInquiryAddBtn.js
        │      │      productInquiryProcess.js
        │      │      productReviewProcess.js
        │      │      toggleInquiryContentProcess.js
        │      │      toggleReviewContentProcess.js
        │      │      
        │      ├─productInquiry
        │      │      formValidation.js
        │      │      pwChkProcess.js
        │      │      updateFormValidation.js
        │      │      
        │      ├─productInquiryBoardDetail
        │      │      btnProcess.js
        │      │      postCommentProcess.js
        │      │      productInquiryBoardDetailCommentProcess.js
        │      │      productInquiryBoardDetailPasswordCheckProcess.js
        │      │      
        │      ├─productInquiryBoardList
        │      │      searchFormOnchange.js
        │      │      
        │      ├─productList
        │      │      searchFormOnchange.js
        │      │      
        │      ├─productReview
        │      │      editBtnProcess.js
        │      │      editSubmitBtnProcess.js
        │      │      formValidation.js
        │      │      formValidationEdit.js
        │      │      submitBtnProcess.js
        │      │      
        │      ├─productReviewDetail
        │      │      btnProcess.js
        │      │      
        │      └─user
        │              findUserIdForm.js
        │              findUserPasswordForm.js
        │              joinForm.js
        │              loginForm.js
        │              
        └─templates
            │  index.html
            │  
            ├─admin
            │  │  addProduct.html
            │  │  modifyProduct.html
            │  │  productList.html
            │  │  
            │  └─payment
            │          delivery.html
            │          refund.html
            │          
            ├─cart
            │      cartForm.html
            │      
            ├─customerInquiryBoard
            │      addCustomerInquiry.html
            │      boardDetail.html
            │      boardList.html
            │      edit.html
            │      
            ├─error
            │      error.html
            │      
            ├─fragments
            │  │  footer.html
            │  │  link.html
            │  │  nav.html
            │  │  topHeader.html
            │  │  
            │  ├─admin
            │  │      mainMenu.html
            │  │      
            │  └─myPage
            │          mainMenu.html
            │          
            ├─myPage
            │      deleteForm.html
            │      editAddress.html
            │      modifyForm.html
            │      myCustomerInquiryPage.html
            │      mypage.html
            │      myProductInquiryPage.html
            │      myReviewPage.html
            │      passwordCheckForm.html
            │      paymentDetail.html
            │      paymentList.html
            │      searchForm.html
            │      wishList.html
            │      
            ├─order
            │      orderForm.html
            │      
            ├─payment
            │      paymentForm.html
            │      paymentList.html
            │      
            ├─product
            │      productDetail.html
            │      productList.html
            │      
            ├─productInquiryBoard
            │      addProductInquiry.html
            │      boardDetail.html
            │      boardList.html
            │      passwordChk.html
            │      updateProductInquiry.html
            │      
            ├─productReviewBoard
            │      addProductReview.html
            │      boardDetail.html
            │      boardList.html
            │      editProductReview.html
            │      
            └─user
                    findUserIdForm.html
                    findUserPasswordForm.html
                    joinForm.html
                    loginForm.html

