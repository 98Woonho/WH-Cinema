CREATE DATABASE  IF NOT EXISTS `wh_cinema` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `wh_cinema`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: wh_cinema
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `title` varchar(255) NOT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `poster` varchar(1000) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `runtime` int DEFAULT NULL,
  `plot` varchar(1000) DEFAULT NULL,
  `rating` varchar(255) DEFAULT NULL,
  `director` varchar(255) DEFAULT NULL,
  `actor` varchar(255) DEFAULT NULL,
  `nation` varchar(255) DEFAULT NULL,
  `stillcuts` varchar(1000) DEFAULT NULL,
  `vote_average` double DEFAULT NULL,
  `screening_flag` bit(1) DEFAULT NULL,
  PRIMARY KEY (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES ('그녀가 죽었다','미스터리, 스릴러','https://file.koreafilm.or.kr/thm/02/99/18/40/tn_DPK021943.jpg','2024-05-15',103,'\"나쁜 짓은 절대 안 해요. 그냥 보기만 하는 거예요.\"<br><br>고객이 맡긴 열쇠로 그 집에 들어가<br>남의 삶을 훔쳐보는 취미를 지닌 공인중개사 \'구정태\'.<br>편의점 소시지를 먹으며 비건 샐러드 사진을 포스팅하는<br>SNS 인플루언서 \'한소라\'에게 흥미를 느끼고 관찰하기 시작한다.<br><br>\"관찰 152일째, 그녀가... 죽었습니다.\"<br><br>급기야 \'한소라\'집에 들어간 것을 알고 있는 누군가가 협박을 시작하고,<br>사건을 맡은 강력반 형사 \'오영주\'의 수사망이 그를 향해 좁혀온다.<br>스스로 범인을 찾아야 하는 \'구정태\'는 \'한소라\'의 SNS를 통해<br>주변 인물들을 뒤지며 진범을 찾아 나서는데...','15세이상관람가','김세휘','변요한, 신혜선, 이엘','한국','http://file.koreafilm.or.kr/thm/01/copy/00/66/90/tn_DST842515.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/92/tn_DST842768.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/85/tn_DST841997.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/85/tn_DST841998.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/85/tn_DST841999.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/85/tn_DST842000.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/85/tn_DST842001.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/85/tn_DST842002.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/85/tn_DST842003.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/85/tn_DST842004.jpg',6.09,_binary ''),('극장판 하이큐!! 쓰레기장의 결전','애니메이션','https://file.koreafilm.or.kr/thm/02/99/18/40/tn_DPF029193.jpg','2024-05-15',85,'봄철 고교 배구대회 미야기현 대표 결정전.<br>1회전과 2회전에서 우승 후보를<br>차례로 꺾은 카라스노 고등학교는<br>마침내 3회전에서 인연의 라이벌<br>네코마 고등학교와 맞붙게 된다.<br><br>공식 경기에서 처음으로 대결하는 두 고등학교,<br>통칭 까마귀 vs 고양이 \'쓰레기장의 결전\'.<br>약속의 땅에서 \'한 번 더\'가 없는 싸움이 드디어 시작된다!','전체관람가','미츠나카 스스무','무라세 아유무, 이시카와 카이토, 히노 사토시, 카지 유우키, 나카무라 유이치','일본','http://file.koreafilm.or.kr/thm/01/copy/00/66/84/tn_DST841909.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/84/tn_DST841910.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/84/tn_DST841911.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/84/tn_DST841912.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/84/tn_DST841913.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/84/tn_DST841914.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/84/tn_DST841915.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/84/tn_DST841916.jpg',6.03,_binary ''),('마거리트의 정리','드라마','http://file.koreafilm.or.kr/thm/02/99/18/44/tn_DPF029445.jpg','2024-06-27',113,'명문 파리 고등사범학교에서<br>가장 인정받는 수학 천재 ‘마거리트’는<br>세계 난제 ‘골드바흐의 추측’에 관한 연구를<br>증명하는 세미나에서 오류를 범하고 만다<br><br>그날 이후 충격에 빠져 학교를 그만둔 ‘마거리트’는<br>새로운 세상을 마주하며 변화하기 시작하는데...<br><br><strong>“내가 증명하고 싶은 건 나일지도 몰라”</strong>','15세이상관람가','안나 노비옹','엘라 룸프, 장 피에르 다루생, 줄리앙 프리종','프랑스','http://file.koreafilm.or.kr/thm/01/copy/00/64/90/tn_DST805840.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/64/90/tn_DST805841.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/64/90/tn_DST805842.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/64/90/tn_DST805843.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/64/90/tn_DST805844.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/01/tn_DST845073.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/23/tn_DST849848.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/13/tn_DST847850.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/13/tn_DST847851.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/13/tn_DST847852.jpg',6.1,_binary ''),('범죄도시4','액션, 범죄','http://file.koreafilm.or.kr/thm/02/99/18/37/tn_DPK021860.jpg','2024-04-24',109,'신종 마약 사건 3년 뒤,<br>괴물형사 \'마석도\'(마동석)와 서울 광수대는<br>배달앱을 이용한 마약 판매 사건을 수사하던 중<br>수배 중인 앱 개발자가 필리핀에서 사망한 사건이<br>대규모 온라인 불법 도박 조직과 연관되어 있음을 알아낸다.<br><br>필리핀에 거점을 두고 납치, 감금, 폭행, 살인 등으로<br>대한민국 온라인 불법 도박 시장을 장악한<br>특수부대 용병 출신의 빌런 \'백창기\'(김무열)와<br>한국에서 더 큰 판을 짜고 있는 IT업계 천재 CEO \'장동철\'(이동휘).<br><br>\'마석도\'는 더 커진 판을 잡기 위해<br>\'장이수\'(박지환)에게 뜻밖의 협력을 제안하고<br>광역수사대는 물론,<br>사이버수사대까지 합류해 범죄를 소탕하기 시작하는데...<br><br><strong>나쁜 놈 잡는데 국경도 영역도 제한 없다!<br>업그레이드 소탕 작전! 거침없이 싹 쓸어버린다!</strong>','15세이상관람가','허명행','마동석, 김무열, 이동휘, 박지환','한국','http://file.koreafilm.or.kr/thm/01/copy/00/66/74/tn_DST840308.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/74/tn_DST840309.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/74/tn_DST840310.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/74/tn_DST840311.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/74/tn_DST840312.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/74/tn_DST840313.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/74/tn_DST840314.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/74/tn_DST840315.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/74/tn_DST840316.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/74/tn_DST840317.jpg',7.23,_binary ''),('북극백화점의 안내원','애니메이션','http://file.koreafilm.or.kr/thm/02/99/18/44/tn_DPF029447.jpg','2024-06-19',70,'어서 오세요!<br>세상에 딱 하나뿐인 ‘북극백화점’으로!<br><br>동물들이 고객인 ‘북극백화점’.<br>프러포즈를 앞둔 소심한 일본늑대,<br>서로를 위해 깜짝 선물을 찾고 있는 바다밍크 부녀,<br>사랑을 얻기 위해 단종된 향수를 찾는 바바리사자까지!<br><br>V.I.A(Very Important Animal)를 만족시키기 위한<br>수습 안내원 ‘아키노’의 좌충우돌 정직원 되기 프로젝트!<br><br>6월 19일, 웃음과 감동, 힐링 모두 다 담아 드릴게요!','전체관람가','이타즈 요시미','카와이다 나츠미, 오츠카 타케오','일본','http://file.koreafilm.or.kr/thm/01/copy/00/65/96/tn_DST832463.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/65/96/tn_DST832464.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/65/96/tn_DST832465.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/65/96/tn_DST832466.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/65/96/tn_DST832467.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/10/tn_DST847312.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/10/tn_DST847313.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/10/tn_DST847314.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/10/tn_DST847315.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/10/tn_DST847316.jpg',6.8,_binary ''),('언더더씨-마법 산호초를 찾아서','에니메이션','http://file.koreafilm.or.kr/thm/02/99/18/45/tn_DPF029519.jpg','2024-06-27',66,'구해줘! 홈즈~~<br>산호초 물고기 삼총사의 짠 내 나는<br>새집 찾기 모험!<br>전설의 마법 산호초를 찾아 떠나는<br>리얼 생생 해양 에듀벤처!<br><br>무분별하게 물고기를 포획하는<br>트롤 어선에 의해 산호초 집이 파괴되며<br>물고기들은 하루아침에 집을 잃고 만다.<br>개구쟁이 열대어 쇼티와<br>똑똑한 인디, 의리의 톱상어 제이크는<br>영원히 파괴되지 않는 전설 속의 마법 산호초를 찾아<br>미지의 바닷속으로 모험을 떠나는데....<br>“구해줘! 홈즈~~!” 산호초 물고기 삼총사의 짠 내 나는<br>새집 찾기 리얼 생생 모험이 펼쳐진다!','전체관람가','피터 팝','','독일','http://file.koreafilm.or.kr/thm/01/copy/00/67/05/tn_DST846506.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/05/tn_DST846507.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/10/tn_DST847290.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/10/tn_DST847291.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/10/tn_DST847292.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/10/tn_DST847293.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/10/tn_DST847294.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/10/tn_DST847295.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/10/tn_DST847296.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/10/tn_DST847297.jpg',6.34,_binary ''),('인사이드 아웃','애니메이션','http://file.koreafilm.or.kr/thm/02/99/18/36/tn_DPF028953.jpg','2024-06-12',96,'<strong>디즈니·픽사의 대표작 <인사이드 아웃><br>새로운 감정과 함께 돌아오다!</strong><br><br>13살이 된 라일리의 행복을 위해<br>매일 바쁘게 머릿속 감정 컨트롤 본부를 운영하는<br>\'기쁨\', \'슬픔\', \'버럭\', \'까칠\', \'소심\'.<br><br>그러던 어느 날,<br>낯선 감정인 \'불안\', \'당황\', \'따분\', \'부럽\'이가 본부에 등장하고,<br>언제나 최악의 상황을 대비하며<br>제멋대로인 \'불안\'이와 기존 감정들은 계속 충돌한다.<br><br>결국 새로운 감정들에 의해 본부에서 쫓겨나게 된 기존 감정들은<br>다시 본부로 돌아가기 위해 위험천만한 모험을 시작하는데…<br><br><strong>2024년, 전 세계를 공감으로 물들인 유쾌한 상상이 다시 시작된다!</strong>','전체관람가','켈시 만','에이미 포엘러, 마야 호크, 루이스 블랙, 필리스 스미스, 토니 헤일','미국','http://file.koreafilm.or.kr/thm/01/copy/00/67/05/tn_DST846257.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/97/tn_DST843772.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/97/tn_DST843773.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/97/tn_DST843771.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/99/tn_DST844504.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/05/tn_DST846258.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/05/tn_DST846259.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/05/tn_DST846260.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/05/tn_DST846261.jpg',7.77,_binary ''),('존 오브 인터레스트','드라마','http://file.koreafilm.or.kr/thm/02/99/18/42/tn_DPF029327.jpg','2024-06-05',105,'독일 장교 루돌프 회스(크리스티안 프리델)의 가족이 사는<br>그들만의 꿈의 왕국 아우슈비츠.<br>아내 헤트비히(산드라 휠러)가 정성스럽게 가꾼 꽃이 만발한 정원에는<br>재잘거리는 아이들의 웃음소리로 가득하다.<br>마치 한 폭의 그림 같은 집.<br><strong>과연 악마는 다른 세상을 사는가?</strong>','12세이상관람가','조나단 글레이저','크리스티안 프리에델, 산드라 휠러','미국','http://file.koreafilm.or.kr/thm/01/copy/00/66/96/tn_DST843449.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/96/tn_DST843450.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/02/tn_DST845144.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/02/tn_DST845149.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/02/tn_DST845150.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/02/tn_DST845151.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/96/tn_DST843448.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/64/88/tn_DST804844.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/02/tn_DST845145.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/02/tn_DST845146.jpg',6.22,_binary ''),('콰이어트 플레이스-첫째 날','스릴러','http://file.koreafilm.or.kr/thm/02/99/18/43/tn_DPF029400.jpg','2024-06-26',99,'쉿, 살고 싶다면 절대 소리내지 말 것!<br><br>평균 소음 90 데시벨을 자랑하는 미국 최대도시 뉴욕,<br>고양이 ‘프로도’와 함께 간만에 외출을 나온<br>‘사미라’는 공연을 보고 돌아가던 중<br>하늘에서 떨어져 내리는 섬광을 목격하고<br>곧 사람들을 닥치는 대로 공격하는<br>정체불명 괴생명체의 출현에 충격에 휩싸인다.<br><br>아수라장이 된 뉴욕 도심에 ‘절대 소리 내지 말라’는<br>안내방송이 울려퍼지는 가운데<br>맨해튼의 모든 다리가 폭격으로 끊어지고,<br>사람들은 온갖 위협이 도사리는 도시에 고립되고 만다.<br><br>살아남기 위해 홀로 사투를 벌이던 \'사미라\'는<br>우연히 또 다른 생존자 ‘에릭’을 만나고<br>두 사람은 괴생명체를 피해 지하철역부터 시가지,<br>할렘까지 숨죽인 여정을 이어 나가는데…','15세이상관람가','마이클 사노스키','루피타 뇽오, 디몬 하운수, 알렉스 울프','미국','http://file.koreafilm.or.kr/thm/01/copy/00/67/15/tn_DST848368.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/15/tn_DST848369.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/15/tn_DST848370.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/15/tn_DST848367.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/07/tn_DST846891.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/07/tn_DST846892.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/12/tn_DST847843.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/12/tn_DST847844.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/12/tn_DST847845.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/12/tn_DST847846.jpg',7.7,_binary ''),('탈주','액션','http://file.koreafilm.or.kr/thm/02/99/18/44/tn_DPK022096.jpg','2024-07-03',94,'“내 앞 길 내가 정했습니다”<br>휴전선 인근 북한 최전방 군부대.<br>10년 만기 제대를 앞둔 중사 ‘규남’(이제훈)은<br>미래를 선택할 수 없는 북을 벗어나 원하는 것을 해 볼 수 있는<br>철책 너머로의 탈주를 준비한다.<br>그러나, ‘규남’의 계획을 알아챈 하급 병사 ‘동혁’(홍사빈)이<br>먼저 탈주를 시도하고,<br>말리려던 ‘규남’까지 졸지에 탈주병으로 체포된다.<br><br><strong>“허튼 생각 말고 받아들여. 이것이 니 운명이야”</strong><br>탈주병 조사를 위해 부대로 온 보위부 소좌 ‘현상’(구교환)은<br>어린 시절 알고 지내던 ‘규남’을 탈주병을 체포한<br>노력 영웅으로 둔갑시키고<br>사단장 직속보좌 자리까지 마련해주며 실적을 올리려 한다.<br><br>하지만 ‘규남’이 본격적인 탈출을 감행하자<br>‘현상’은 물러설 길 없는 추격을 시작한다.','12세이상관람가','이종필','이제훈, 구교환, 홍사빈','한국','http://file.koreafilm.or.kr/thm/01/copy/00/66/89/tn_DST842418.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/89/tn_DST842419.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/13/tn_DST847875.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/13/tn_DST847876.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/13/tn_DST847877.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/13/tn_DST847878.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/14/tn_DST848308.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/14/tn_DST848318.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/13/tn_DST847874.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/14/tn_DST848320.jpg',7.3,_binary '\0'),('태풍 클럽','드라마','http://file.koreafilm.or.kr/thm/02/99/18/45/tn_DPF029522.jpg','2024-06-26',115,'태풍이 불어 닥친 날,<br><br>미카미 쿄이치를 비롯한 6명의 중학생이 학교에 갇히고,<br>교이치의 절친 리에는 등교하던 중 홀연 방향을 바꿔 도쿄로 향한다.<br><br>고립된 상황 속에서 결핍과 욕망,<br>불안과 쾌락이 뒤섞인 이상야릇한 축제가 벌어진다.','15세이상관람가','소마이 신지','미카미 유이치, 쿠도 유키','일본','',6.43,_binary ''),('퍼펙트 데이즈','드라마','http://file.koreafilm.or.kr/thm/02/99/18/44/tn_DPF029472.jpg','2024-07-03',124,'도쿄 시부야의 공공시설 청소부 ‘히라야마’는 매일 반복되지만 충만한 일상을 살아간다.<br><br>오늘도 그는 카세트 테이프로 올드 팝을 듣고,<br>필름 카메라로 나무 사이에 비치는 햇살을 찍고,<br>자전거를 타고 단골 식당에 가서 술 한잔을 마시고,<br>헌책방에서 산 소설을 읽으며 하루를 마무리한다.<br><br>그러던 어느 날, 사이가 소원한 조카가 찾아오면서 그의 반복되는 일상에 작은 변화가 생긴다.','12세이상관람가','빔 벤더스','야쿠쇼 코지','일본','http://file.koreafilm.or.kr/thm/01/copy/00/67/03/tn_DST845588.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/10/tn_DST847281.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/10/tn_DST847282.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/10/tn_DST847283.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/10/tn_DST847284.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/10/tn_DST847285.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/03/tn_DST845589.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/03/tn_DST845590.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/64/88/tn_DST804896.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/10/tn_DST847280.jpg',5.49,_binary '\0'),('프렌치 수프','로맨스, 멜로, 드라마','http://file.koreafilm.or.kr/thm/02/99/18/42/tn_DPF029323.jpg','2024-06-19',135,'20년간 최고의 요리를 함께 탄생시킨 외제니와 도댕.<br>그들의 요리 안에는 서로에 대한 존경과 배려, 그리고 사랑이 있다.<br>인생의 가을에 다다른 두 사람,<br>한여름과 자유를 사랑하는 외제니는 도댕의 청혼을 거절하고<br>도댕은 오직 그녀만을 위한 요리를 만들기 시작한다.','12세이상관람가','트란 안 홍','줄리엣 비노쉬, 브누아 마지멜','프랑스','http://file.koreafilm.or.kr/thm/01/copy/00/64/88/tn_DST804856.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/64/88/tn_DST804857.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/64/88/tn_DST804858.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/16/tn_DST848682.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/16/tn_DST848683.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/16/tn_DST848684.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/16/tn_DST848685.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/64/88/tn_DST804854.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/06/tn_DST846636.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/01/tn_DST845065.jpg',7.135,_binary ''),('프리실라','드라마, 로맨스, 멜로, 뮤지컬','http://file.koreafilm.or.kr/thm/02/99/18/43/tn_DPF029383.jpg','2024-06-19',113,'독일 미군 기지의 파티에 참석한 소녀 ‘프리실라 볼리외’는<br>당대 최고의 슈퍼스타 ‘엘비스 프레슬리’를 만난다.<br><br>‘엘비스’는 ‘프리실라’에게 첫눈에 반하게 되고,<br>두 사람은 저항없이 서로에게 빠져든다.<br><br>평범한 소녀였던 ‘프리실라’는 ‘엘비스’의 연인으로<br>세간의 주목을 받으며, 삶의 모든 것이 변하기 시작하는데…….<br><br>세상을 뒤흔든 로큰롤의 황제와 평범한 소녀.<br>두 사람의 가장 센세이션한 로맨스를 만나다!','15세이상관람가','소피아 코폴라','케일리 스패니, 제이콥 엘로디','미국','http://file.koreafilm.or.kr/thm/01/copy/00/67/03/tn_DST845517.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/03/tn_DST845518.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/03/tn_DST845519.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/03/tn_DST845520.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/03/tn_DST845521.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/03/tn_DST845522.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/03/tn_DST845523.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/03/tn_DST845524.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/03/tn_DST845525.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/03/tn_DST845526.jpg',6.77,_binary ''),('하이재킹','범죄, 액션','http://file.koreafilm.or.kr/thm/02/99/18/43/tn_DPK022048.jpg','2024-06-21',100,'1971년 겨울 속초공항<br>여객기 조종사 태인(하정우)과 규식(성동일)은 김포행 비행에 나선다.<br>승무원 옥순(채수빈)의 안내에 따라 탑승 중인 승객들의 분주함도 잠시,<br>이륙한지 얼마 되지 않아 사제폭탄이 터지며 기내는 아수라장이 된다.<br><br>\"지금부터 이 비행기 이북 간다\"<br><br>여객기를 통째로 납치하려는 용대(여진구)는<br>조종실을 장악하고 무작정 북으로 기수를 돌리라 협박한다.<br><br>폭발 충격으로 규식은 한 쪽 시력을 잃고<br>혼란스러운 기내에서 절체절명의 상황에 처한 태인.<br>이들은 여객기를 무사히 착륙시키기 위한 사투를 시작하는데...<br><br>대한민국 상공 여객기 납치 사건<br>이 비행에 모두가 목숨을 걸었다!<br><하이재킹>','12세이상관람가','김성한','하정우, 여진구, 성동일, 채수빈','한국','http://file.koreafilm.or.kr/thm/01/copy/00/66/99/tn_DST844530.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/99/tn_DST844531.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/99/tn_DST844532.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/66/99/tn_DST844533.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/06/tn_DST846638.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/06/tn_DST846639.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/06/tn_DST846640.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/06/tn_DST846641.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/06/tn_DST846642.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/04/tn_DST845957.jpg',7.68,_binary ''),('핸섬가이즈','코미디','http://file.koreafilm.or.kr/thm/02/99/18/44/tn_DPK022078.jpg','2024-06-26',101,'\"우리가 뭐 빠지는 게 있노? 집도 있고 차도 있고 인물도 훤칠한데.\"<br><br>자칭 터프가이 ‘재필’(이성민)과 섹시가이 ‘상구’(이희준)<br>현실은 잊지 못할 첫인상으로 이사 첫날부터<br>동네 경찰 ‘최 소장’(박지환)과 ‘남 순경’(이규형)의 특별 감시 대상이 되지만,<br>꿈꾸던 유럽풍 드림하우스에서 새출발한다는 것에 그저 행복하기만 하다.<br><br>그러나 행복도 잠시, 물에 빠질뻔한 ‘미나’(공승연)을 구해주려다<br>오히려 납치범으로 오해받는 상황이 이어진다.<br>한편 ‘미나’를 찾으러 온 불청객들을 시작으로<br>지하실에 봉인되어 있던 악령이 깨어나며<br>어두운 기운이 집안을 둘러싸기 시작하는데…<br><br><strong>“왜 다들 우리집에 와서 죽고 난리야!”</strong>','15세이상관람가','남동협','이성민, 이희준, 공승연, 박지환, 이규형','한국','http://file.koreafilm.or.kr/thm/01/copy/00/67/07/tn_DST846722.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/07/tn_DST846726.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/07/tn_DST846727.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/13/tn_DST847887.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/13/tn_DST847888.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/13/tn_DST847889.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/13/tn_DST847890.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/13/tn_DST847891.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/13/tn_DST847892.jpg|http://file.koreafilm.or.kr/thm/01/copy/00/67/21/tn_DST849654.jpg',7.69,_binary '');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ticketing_id` bigint DEFAULT NULL,
  `imp_uid` varchar(255) DEFAULT NULL,
  `merchant_uid` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `paid_amount` int DEFAULT NULL,
  `pay_date` date DEFAULT NULL,
  `pay_method` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ticketing_id` (`ticketing_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`ticketing_id`) REFERENCES `ticketing` (`id`),
  CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `screen_hall`
--

DROP TABLE IF EXISTS `screen_hall`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `screen_hall` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `theater_name` varchar(255) DEFAULT NULL,
  `seat_count` int DEFAULT NULL,
  `adult_cost` int DEFAULT NULL,
  `youth_cost` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `theater_name` (`theater_name`),
  CONSTRAINT `screen_hall_ibfk_1` FOREIGN KEY (`theater_name`) REFERENCES `theater` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screen_hall`
--

LOCK TABLES `screen_hall` WRITE;
/*!40000 ALTER TABLE `screen_hall` DISABLE KEYS */;
INSERT INTO `screen_hall` VALUES (1,'1관','대구 프리미엄',60,15000,12000),(2,'2관','대구 프리미엄',138,15000,12000);
/*!40000 ALTER TABLE `screen_hall` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `screen_info`
--

DROP TABLE IF EXISTS `screen_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `screen_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `time` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `screen_hall_id` bigint DEFAULT NULL,
  `movie_title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `screen_hall_id` (`screen_hall_id`),
  KEY `movie_title` (`movie_title`),
  CONSTRAINT `screen_info_ibfk_1` FOREIGN KEY (`screen_hall_id`) REFERENCES `screen_hall` (`id`),
  CONSTRAINT `screen_info_ibfk_2` FOREIGN KEY (`movie_title`) REFERENCES `movie` (`title`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screen_info`
--

LOCK TABLES `screen_info` WRITE;
/*!40000 ALTER TABLE `screen_info` DISABLE KEYS */;
INSERT INTO `screen_info` VALUES (3,'00:00','2024-07-03',1,'그녀가 죽었다'),(4,'00:01','2024-07-03',1,'그녀가 죽었다'),(5,'00:02','2024-07-03',1,'그녀가 죽었다'),(6,'00:03','2024-07-03',1,'그녀가 죽었다'),(7,'00:04','2024-07-03',1,'그녀가 죽었다'),(8,'00:05','2024-07-03',1,'그녀가 죽었다'),(9,'00:06','2024-07-03',1,'그녀가 죽었다'),(10,'00:07','2024-07-03',1,'그녀가 죽었다'),(11,'00:08','2024-07-03',1,'그녀가 죽었다'),(12,'00:09','2024-07-03',2,'그녀가 죽었다'),(13,'00:00','2024-07-03',2,'그녀가 죽었다'),(14,'00:01','2024-07-03',2,'그녀가 죽었다'),(15,'00:02','2024-07-03',2,'그녀가 죽었다'),(16,'00:03','2024-07-03',2,'그녀가 죽었다'),(17,'00:03','2024-07-03',2,'그녀가 죽었다'),(18,'00:04','2024-07-03',2,'그녀가 죽었다'),(19,'00:05','2024-07-03',2,'그녀가 죽었다'),(20,'00:06','2024-07-03',2,'그녀가 죽었다'),(21,'00:07','2024-07-03',2,'그녀가 죽었다'),(22,'00:08','2024-07-03',2,'그녀가 죽었다'),(23,'00:09','2024-07-03',2,'그녀가 죽었다'),(24,'00:01','2024-07-04',1,'그녀가 죽었다');
/*!40000 ALTER TABLE `screen_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `theater`
--

DROP TABLE IF EXISTS `theater`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theater` (
  `name` varchar(255) NOT NULL,
  `region` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theater`
--

LOCK TABLES `theater` WRITE;
/*!40000 ALTER TABLE `theater` DISABLE KEYS */;
INSERT INTO `theater` VALUES ('경기 광주','경기'),('김포','경기'),('대구','대구'),('대구 연경','대구'),('대구 프리미엄','대구'),('동두천','경기');
/*!40000 ALTER TABLE `theater` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticketing`
--

DROP TABLE IF EXISTS `ticketing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticketing` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `theater_name` varchar(255) DEFAULT NULL,
  `screen_hall_name` varchar(255) DEFAULT NULL,
  `movie_title` varchar(255) DEFAULT NULL,
  `screen_time` varchar(255) DEFAULT NULL,
  `seat` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `user_id` varchar(100) DEFAULT NULL,
  `screen_date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `theater_name` (`theater_name`),
  KEY `movie_title` (`movie_title`),
  KEY `ticketing_ibfk_3` (`user_id`),
  CONSTRAINT `ticketing_ibfk_1` FOREIGN KEY (`theater_name`) REFERENCES `theater` (`name`),
  CONSTRAINT `ticketing_ibfk_2` FOREIGN KEY (`movie_title`) REFERENCES `movie` (`title`),
  CONSTRAINT `ticketing_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticketing`
--

LOCK TABLES `ticketing` WRITE;
/*!40000 ALTER TABLE `ticketing` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticketing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `user_id` varchar(100) NOT NULL,
  `token` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES ('lkj11111150','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJsa2oxMTExMTE1MCIsImlhdCI6MTcxODg3MTk2NSwiZXhwIjoxNzE4OTU4MzY1fQ.a2dohAuryXNYIV6s5PAFDwsCZLe5c1YMEEML2-I5mwY'),('lkj1111150','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJsa2oxMTExMTUwIiwiaWF0IjoxNzE5MjEyODQ3LCJleHAiOjE3MTkyOTkyNDd9.3ZTw1EgNIMhh85feHEJh_InESMZ7w_O6VODTIA38Wps'),('lkj111150','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJsa2oxMTExNTAiLCJpYXQiOjE3MTg4NzEzMTksImV4cCI6MTcxODk1NzcxOX0.DpFwDwT-zyYNi9_TDkkmW3bR29IAMZgU2kxlk-DreHE'),('lkj11150','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJsa2oxMTE1MCIsImlhdCI6MTcxODg3MTEyOSwiZXhwIjoxNzE4OTU3NTI5fQ.M-HIF8D9yJsS0BGoIDAFx3gUBkoxsHuXob0c02qub1k'),('lkj1150','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJsa2oxMTUwIiwiaWF0IjoxNzE5OTg5ODI2LCJleHAiOjE3MjA1OTQ2MjZ9.svdcvbF-yOIp4aJ4u_XoFqnt-Dd1MPV38bV0hIWt7rI');
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` varchar(100) NOT NULL,
  `password` varchar(1000) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `birthday` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('lkj1150','$2b$10$Y1.lD37BL1Orkw1991VOye5YQJ59q9RWCUNkflg0FcreDoEDp6ei2','이운호','1998-09-28','01095331150','USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-03 16:17:59
