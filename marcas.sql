-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: localhost    Database: marcas
-- ------------------------------------------------------
-- Server version       8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comentarios`
--
DROP DATABASE IF EXISTS receitas;
CREATE DATABASE receitas;
USE receitas;


DROP TABLE IF EXISTS `comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comentario` varchar(510) NOT NULL,
  `feed` int NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `conta` varchar(255) NOT NULL,
  `data` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_feed_idx` (`feed`),
  CONSTRAINT `fk_comentarios_feeds` FOREIGN KEY (`feed`) REFERENCES `feeds` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarios`
--

LOCK TABLES `comentarios` WRITE;
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
INSERT INTO `comentarios` VALUES (1,'teste',1,'Clecio Silva','clecio.r.s.n@gmail.com','2021-04-16 21:32:35');
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Aves'),(2,'Massas'),(3,'Bolos e Doces'),(4,'Carnes');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feeds`
--

DROP TABLE IF EXISTS `feeds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feeds` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data` datetime NOT NULL,
  `produto` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_feeds_produtos_idx` (`produto`),
  CONSTRAINT `fk_feeds_produtos` FOREIGN KEY (`produto`) REFERENCES `produtos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feeds`
--

LOCK TABLES `feeds` WRITE;
/*!40000 ALTER TABLE `feeds` DISABLE KEYS */;
INSERT INTO `feeds` VALUES (1,'2021-04-14 18:21:11',1),(2,'2021-04-14 18:21:11',2),(3,'2021-04-14 18:21:11',3),(4,'2021-04-14 18:21:11',4),(5,'2021-04-14 18:21:11',5),(6,'2021-04-14 18:21:11',6),(7,'2021-04-14 18:21:11',7);
/*!40000 ALTER TABLE `feeds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `feed` int NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_likes_feeds_idx` (`feed`),
  CONSTRAINT `fk_likes_feeds` FOREIGN KEY (`feed`) REFERENCES `feeds` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (8,1,'luispscarvalho@gmail.com');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `receita` text(5000) NOT NULL,
  `passos` text(5000) NOT NULL,
  `imagem1` varchar(255) NOT NULL,
  `imagem2` varchar(255) DEFAULT NULL,
  `imagem3` varchar(255) DEFAULT NULL,
  `categoria` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_produtos_empesas_idx` (`categoria`),
  CONSTRAINT `fk_produtos_empesas` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES 
(1,'Strogonoff','\n● 500 g de peito de frango cortado em cubos\n\n● 1 cebola picada\n\n● 1 dente de alho picado\n\n● Sal a gosto\n\n● pimenta a gosto\n\n● 1 colher de manteiga ou margarina\n\n● 2 colheres (sopa) de maionese\n\n● 1 colher (chá) de mostarda\n\n● 1/2 copo de ketchup\n\n● 1 caixa de creme de leite\n\n● Batata palha a gosto\n\n','\n● Tempere o frango em cubos com sal, pimenta e a maionese\n\n● Em uma frigideira grande derreta a manteiga\n\n● Doure a cebola e o alho\n\n● Adicione o frango temperado e deixe dourando\n\n● Adicione a mostarda e em seguida o ketchup\n\n● Acrescente o creme de leite e mexa bem\n\n● Faça as correções de sal e pimenta, se achar necessário\n\n● Sirva com arroz branco e batata palha\n\n','stro1.jpg','stro2.jpg','stro3.jpg',1),
(2,'Risoto de Frango','\n● 1 peito de frango cozido e desfiado\n\n● 1 sache de pomarola tradicional\n\n● 1 lata de milho verde\n\n● 1 tablete de caldo de frango\n\n● 8 azeitonas médias sem caroço\n\n● Arroz cozido\n\n● Coentro\n\n● Alho\n\n● Cebola\n\n● Sal\n\n','\n● Cozinhe o peito de frango com sal e o caldo de galinha\n\n● Reserve a água do caldo e desfie o frango\n\n● Em uma panela refogue o alho e a cebola\n\n● Acrescente o sachê de pomarola, 300 ml do caldo do peito, azeitonas e o milho\n\n● Mexa até misturar bem\n\n● Acrescente o arroz cozido, mais ou menos 4 xícaras\n\n● Mexa novamente, misturando bem\n\n● Coloque em uma travessa\n\n','risoto1.jpg','risoto2.jpg',NULL,1),
(3,'Panqueca','\n○ Massa:\n\n\n●3 ovos\n\n● 2 xícaras (chá) de farinha de trigo\n\n● 2 xícaras (chá) de leite\n\n● 2 colheres (sopa) de manteiga\n\n● 1 colher (chá) de sal\n\n\n○ Recheio:\n\n\n● 2 peitos de frango sem osso\n\n● 1 sachê de caldo de galinha\n\n● 1 lata de molho de tomate pronto\n\n● 2 colheres (sopa) de azeite\n\n● 1/2 cebola picada\n\n● 3 dentes de alho amassados\n\n● pimenta, sal e salsinha a gosto\n\n','\n○ Massa:\n\n\n●Bata no liquidificador todos os ingredientes durante 3 minutos, deixe descansando.\n\n\n○ Recheio:\n\n\n●Cozinhe o peito de frango em um pouco de água com o caldo de galinha, até ficar bem cozido\n\n● Retire da panela em que foi cozido e comece a desfiar com um garfo\n\n● Leve uma panela ao fogo, coloque o azeite a cebola picada e o alho, deixe dourar\n\n● Acrescente o frango desfiado e tempere com pimenta e sal e mexa\n\n● Deixe refogar por 5 minutos mexendo de vez em quando, agora acrescente um pouco de molho de tomate\n\n● Para fazer a panqueca, use uma frigideira teflon rasa, unte-a com um pouco de manteiga\n\n● Coloque uma quantidade razoável de massa da frigideira que não fique grossa, vá fazendo até acabar a massa\n\n● Coloque um pouco de recheio na ponta da panqueca e enrole, após isso coloque em uma forma retangular para ir ao forno\n\n● Aqueça o molho de tomate e derrame em cima das panquecas, jogue um pouco de queijo parmesão em cima se preferir\n\n● Leve ao forno preaquecido por 5 minutos\n\n','panqueca1.jpg','panqueca2.jpg','panqueca3.jpg',2),
(4,'Lasanha','\n● 1 peito de frango\n\n● 500g de queijo muçarela fatiado\n\n● 400 g de presunto fatiado\n\n● 1 pacote médio de massa para lasanha\n\n● 1 pote de requeijão cremoso\n\n● 2 caldos de galinha\n\n● 2 copos de leite\n\n● 1 caixa de creme de leite\n\n● 2 colheres de farinha\n\n● 3 colheres de manteiga\n\n● 1 cebola média\n\n','\n○ Molho:\n\n\nEm uma panela, faça um creme homogêneo com as 2 colheres de farinha e 2 colheres de manteiga\n\n● Acrescente o leite, 1 caldo de galinha e mexa constantemente\n\n● Retire do fogo e acrescente o creme de leite\n\n\n● Frango:\n\n\n● Cozinhe o peito de frango em água (sem óleo), após cozido, desfie-o\n\n● Pique a cebola em pedaços pequenos, coloque em uma panela e doure com a manteiga\n\n● Acrescente o frango e o caldo de galinha, mexa sempre até o frango ficar totalmente dourado\n\n\n○ Montagem:\n\n\n● Em um refratário, coloque 2 conchas de molho\n\n● Faça a base com massa de lasanha, cubra com 1 camada de presunto, 1 de queijo e 1 de frango\n\n● Sobre o frango, coloque 1 camada de requeijão e 2 conchas de molho\n\n● Cubra o requeijão com 1 camada de presunto, 1 camada de queijo e 1 camada de massa, coloque molho\n\n● Repita esse processo até faltar cerca de 2,5 cm para chegar na borda do refratário.Para finalizar, cubra a lasanha com muito queijo, requeijão e molho\n\n● Asse por, aproximadamente, 20 minutos em fogo baixo\n\n','lasanha1.jpg','lasanha2.jpg',NULL,2),
(5,'Bolo de Milho','\n● 1 lata de milho verde\n\n● 1 lata de óleo (medida da lata de milho)\n\n● 1 lata de açúcar (medida da lata de milho)\n\n● 1 lata de fubá (medida da lata de milho)\n\n● 4 ovos\n\n● 2 colheres (sopa) de farinha de trigo\n\n● 2 colheres (sopa) de coco ralado\n\n● 1 1/2 colher (chá) de fermento em pó\n\n','\n● Em um liquidificador, adicione o milho verde, o óleo, o açúcar, o fubá, os ovos e a farinha de trigo\n\n● Bata até obter uma consistência cremosa\n\n● Acrescente o coco ralado e o fermento, misture novamente\n\n● Despeje a massa em uma assadeira untada e leve ao forno\n\n● Asse a 180 °C, preaquecido por 40 minutos\n\n','bolo1.jpg','bolo2.jpg','bolo3.jpg',3),
(6,'Escondidinho de Carne Seca','\n● 1 kg de mandioca cozida\n\n● 1 lata de creme de leite\n\n● 2 colheres de margarina\n\n● 1/2 kg de carne-seca cozida\n\n● 1 cebola média picadinha\n\n● 4 dentes de alho esmagados\n\n● 2 tomates sem casca e picados\n\n● Sal e pimenta a gosto\n\n● Queijo ralado a gosto\n\n','\n● Esprema a mandioca ainda quente, leve em uma panela com a margarina e sal e misture\n\n● Quando estiverem bem misturados acrescente o creme de leite e misture\n\n● Refogue a cebola e o alho em um fio de azeite\n\n● Acrescente a carne-seca desfiada e deixe fritar um pouco\n\n● Acrescente os tomates e deixe cozinhar até ficarem murchos e acerte o sal se achar necessário\n\n● Em um refratário untado com azeite, coloque uma camada do purê de mandioca, a carne seca e termine com o restante do purê\n\n● Polvilhe com queijo parmesão ralado e leve ao forno pra gratinar\n\n','escondidinho1.jpg','escondidinho2.jpg',NULL,4),
(7,'Picadinho de Carne','\n● 800g de alcatra ou patinho cortado em tirinhas\n\n● 4 colheres de óleo\n\n● 2 dentes de alho\n\n● 1 cebola grande picada\n\n● 3 tomates, sem sementes e picados\n\n● 1/2 xícara de cheiro verde picado\n\n● Sal a gosto\n\n','\n● Deixe a carne descansar em uma tigela com água por duas horas\n\n● Escorra e reserve a água\n\n● Em uma panela esquente o óleo, junte a carne e refogue, mexendo, até soltar bem\n\n● Adicione o alho, a cebola, os tomates e o cheiro verde, tempere com o sal e misture\n\n● Abaixe o fogo, tampe e deixe cozinhar\n\n● Mexa ás vezes, acrescente a água reservada até a carne ficar macia e com bastante molho\n\n','picadinho1.jpg','picadinho2.jpg','picadinho3.jpg',4);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-16 21:48:40