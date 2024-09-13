-- --------------------------------------------------------
-- 主機:                           127.0.0.1
-- 伺服器版本:                        11.4.2-MariaDB - mariadb.org binary distribution
-- 伺服器作業系統:                      Win64
-- HeidiSQL 版本:                  12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- 傾印 parameter 的資料庫結構
CREATE DATABASE IF NOT EXISTS `parameter` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `parameter`;

-- 傾印  資料表 parameter.all_in_this_basic 結構
CREATE TABLE IF NOT EXISTS `all_in_this_basic` (
  `Days` int(10) unsigned zerofill NOT NULL,
  `FishNum` int(11) unsigned zerofill NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='魚菜共生APP參數';

-- 正在傾印表格  parameter.all_in_this_basic 的資料：~0 rows (近似值)

-- 傾印  資料表 parameter.coin 結構
CREATE TABLE IF NOT EXISTS `coin` (
  `ID` int(10) unsigned NOT NULL,
  `Coins` int(10) unsigned NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- 正在傾印表格  parameter.coin 的資料：~1 rows (近似值)
REPLACE INTO `coin` (`ID`, `Coins`) VALUES
	(0, 25);

-- 傾印  資料表 parameter.experiencebar 結構
CREATE TABLE IF NOT EXISTS `experiencebar` (
  `ID` int(10) unsigned NOT NULL,
  `currentExperience` float unsigned NOT NULL DEFAULT 0,
  `totalExperience` float unsigned NOT NULL DEFAULT 0,
  `level` int(11) unsigned NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- 正在傾印表格  parameter.experiencebar 的資料：~0 rows (近似值)
REPLACE INTO `experiencebar` (`ID`, `currentExperience`, `totalExperience`, `level`) VALUES
	(1, 300.51, 8649.75, 12);

-- 傾印  資料表 parameter.feed 結構
CREATE TABLE IF NOT EXISTS `feed` (
  `ID` int(10) unsigned NOT NULL,
  `Feedcount` int(10) unsigned NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- 正在傾印表格  parameter.feed 的資料：~2 rows (近似值)
REPLACE INTO `feed` (`ID`, `Feedcount`) VALUES
	(1, 103),
	(2, 99);

-- 傾印  資料表 parameter.fish_information 結構
CREATE TABLE IF NOT EXISTS `fish_information` (
  `Chinese_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Scientific_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Origin` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Length` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Temperament` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Temperature` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- 正在傾印表格  parameter.fish_information 的資料：~299 rows (近似值)
REPLACE INTO `fish_information` (`Chinese_name`, `Scientific_name`, `Origin`, `Length`, `Temperament`, `Temperature`) VALUES
	('金鼓魚', 'Scatophagus argus', '印度洋北部沿岸至太平洋中部美拉尼西亞、波利尼西亞以及中國南海、台灣海峽、東海南部等海域', '25 - 30 cm', '溫和', '22 - 28 ℃'),
	('鶴嘴魚', 'Hyporhamphus sajori', '西北太平洋: 黃海，渤海海洋，日本海洋', '40.0 cm', '溫和', '26.0 - 28.0 ℃'),
	('紅蘋果美人', 'Glossolepis incisus', '巴布亞新幾內亞北部的森塔尼湖地區', '11.0 - 12.0 cm', '溫和', '22.0 - 27.0 ℃'),
	('巧克力娃娃', 'Carinotetraodon travancoricus', '東南亞印度', '2 - 3 cm', '溫和', '22 - 28 ℃'),
	('燕子美人', 'Iriatherina werneri', '南美洲亞馬孫河流域', '4 - 5 cm', '溫和', '26 - 30 ℃'),
	('黑魔鬼', 'Apteronotus albifrons', '南美洲亞馬遜河', '40.0 - 50.0 cm', '有攻擊性', '23.0 - 28.0  ℃'),
	('成吉思汗', 'pangasius sanitwongsei', '亞洲湄公河與湄南河流域', '100.0 - 150.0 cm', '有攻擊性', '22.0 - 28.0  ℃'),
	('反游貓', 'Synodontis nigriventris', '中非', '9.0 - 10.0 cm', '溫和', '22.0 - 26.0  ℃'),
	('電鯰', 'Malapterurus electricus', '非洲剛果河', '50.0 － 60.0 cm', '有攻擊性', '22.0 - 28.0  ℃'),
	('石美人', 'Melanotaenia boesemani', '澳洲', '13.0 - 15.0 cm', '溫和', '22.0 - 25.0 ℃'),
	('澳洲小彩虹', 'Melanotaenia trifasciata', '澳洲', '10.0 - 11.0 cm', '溫和', '24.0 - 30.0 ℃'),
	('鱷雀鱔', 'Atractosteus spatula', '墨西哥到美國弗羅里達州的墨西哥灣沿岸河流和河口水域，密蘇里河和俄亥俄河下游，以至尼加拉瓜境內的兩個湖泊', '305.0 cm', '', '25.0－30.0 ℃'),
	('胭脂魚', 'Myxocyprinus asiaticus', '中國長江和閩江水系', '90 - 100  cm', '溫和', '16 - 29  ℃'),
	('澳洲彩虹', 'Melanotaenia fluviatilis', '新幾內亞，澳大利亞西北部', '9.0 - 11.0  cm', '溫和', '22.0 - 26.0 ℃'),
	('馬達加斯加彩虹', 'Bedotia geayi', '馬達加斯加', '10.0 - 12.0 cm', '溫和', '20.0 - 24.0  ℃'),
	('古巴雀鱔', 'Atractosteus tristoechus', '北美', '200.0 cm', '', '℃'),
	('熱帶雀鱔', 'Atractosteus tropicus', '中美洲加勒比海、墨西哥、美國地區', '125.0 cm', '', '℃'),
	('斑點雀鱔', 'Lepisosteus oculatus', '依利湖和密歇根湖，以及密西西比河南部', '112.0 cm', '', '℃'),
	('長吻雀鱔', 'Lepisosteus osseus', '北美的墨西哥和美國南部河流中', '200.0 cm', '', '℃'),
	('三間虎', 'Datnioides microlepis', '泰國的溪流和河流中。在婆羅洲、蘇門答臘也有分佈。', '45.0 cm', '溫和', '23.0 - 27.0 ℃'),
	('綠河豚', 'Tetraodon nigroviridis', '泰國、印度尼西亞、馬來西亞、中國南端海域', '10.0 - 17.0  cm', '有攻擊性', '23.0 - 28.0 ℃'),
	('反天刀', 'Gymnarchus niloticus', '非洲尼羅河等流域', '167 cm', '有攻擊性', '23 – 28 ℃'),
	('紫身枝牙蝦虎', 'Stiphodon atropurpureus (Herre,1927)', '亞洲日本、中國台灣、馬來西亞、菲律賓', '5.0 cm', '溫和', '℃'),
	('青恐龍', 'Polypterus palmas palmas', '剛果、利比里亞、塞拉里昂、幾內亞', '30 cm', '有攻擊性', '26 － 28 ℃'),
	('金恐龍', 'Polypterus senegalus senegalus', '非洲', '20 - 30  cm', '溫和', '25.0 - 30.0 ℃'),
	('小扣扣', 'Trichopsis pumila (Arnold, 1936)', '泰國', '4.0  cm', '溫和', '25 – 28 ℃'),
	('圓尾鬥魚', 'Macropodus chinensis (Bloch,1790)', '中國', '13 cm', '溫和', '16 – 26 ℃'),
	('叉尾鬥魚', 'Macropodus opercularis (Linnaeus,1758)', '中國長江上游、海南島、台灣，越南等地', '6.7 cm', '溫和', '16 – 26 ℃'),
	('泰國鬥魚', 'Betta splendens', '東南亞泰國', '6.0 - 8.0 cm', '溫和', '23.0 - 30.0 ℃'),
	('絲足鱸', 'Osphronemus goramy (Lacepède,1801)', '亞洲東南亞的越南、泰國、馬來西亞等地', '50 - 70 cm', '有攻擊性', '20 - 30  ℃'),
	('吻嘴魚', 'Helostoma temminckii', '印度尼西亞，泰國，馬來西亞', '20.0 - 30.0 cm', '溫和', '23.0 - 27.0  ℃'),
	('紅麗麗', 'Trichogaster chuna', '東南亞地區', '4.0 - 6.0  cm', '溫和', '23.0 - 30.0 ℃'),
	('草繩恐龍', 'Erpetoichthys calabaricus', '西非、喀麥隆、尼日利亞', '96 cm', '有攻擊性', '℃'),
	('虎紋恐龍王', 'Polypterus endlicheri endlicheri', '非洲尼日利亞、乍得湖', '75 cm', '溫和', '℃'),
	('鱷魚恐龍王', 'Polypterus (bichir) lapradei', '西非的大部分地區', '60 － 74 cm', '有攻擊性', '℃'),
	('斑節恐龍', 'Polypterus delhezi (Boulenger, 1899)', '中非，剛果河', '35 - 40  cm', '有攻擊性', '26 - 28 ℃'),
	('吻嘴魚', 'Helostoma temminckii', '印度尼西亞，泰國，馬來西亞', '20.0 - 30.0 cm', '溫和', '23.0 - 27.0  ℃'),
	('金帝王魟', 'Potamotrygon schroederi', '南美洲委內瑞拉', '60.0  cm', '溫和', '18 – 25 ℃'),
	('珍珠馬甲', 'Trichogaster leeri', '東南亞泰國、馬來西亞及印尼', '9.0 - 12.0 cm', '溫和', '23.0 - 28.0  ℃'),
	('豹魟', 'Potamotrygon castexi', '南美洲秘魯、亞馬遜流域', '60.0  cm', '溫和', '24 - 32 ℃'),
	('黑白魟', 'Potamotrygon leopoldi', '南美洲巴西、申古河流域', '40.0 cm', '溫和', '20 – 25 ℃'),
	('珍珠魟', 'Potamotrygon motoro', '南美洲亞馬遜流域', '50 cm', '溫和', '24 – 26 ℃'),
	('帝王魟', 'Potamotrygon menchacai', '南美洲', '47.0  cm', '溫和', '24 - 29 ℃'),
	('斑馬鰍', 'Botia striata (Narayan Rao,1920)', '印度馬哈拉施特拉邦和印度南部的西高止山脈', '8 - 10 cm', '溫和', '23 - 27  ℃'),
	('紅尾鰍', 'Yasuhikotakia modesta (Bleeker,1864)', '越南，柬埔寨，老撾，泰國湄公河流域', '25 cm', '溫和', '26 - 30 ℃'),
	('帝王鰍', 'Botia udomritthiruji (Ng,2007)', '緬甸東部德林達伊（Tenasserim）河', '11 - 15 cm', '溫和', '22 - 27 ℃'),
	('星點斑紋龍', 'Scleropages jardini', '澳大利亞北部及新幾內亞', '30.0 - 50.0 cm', '', '24.0 - 28.0  ℃'),
	('星點龍', 'Scleropages leichardti', '澳大利亞東部', '30.0 - 50.0 cm', '有攻擊性', '24.0 - 28.0 ℃'),
	('突吻沙鰍', 'Botia rostrata (Günther,1868)', '印度，孟加拉，中國怒江和伊洛瓦底江盆地', '20 cm', '溫和', '22 - 27 ℃'),
	('皇后鰍', 'Botia dario (Hamilton,1822)', '亞洲印度、孟加拉國', '10 - 15  cm', '溫和', '23 - 28  ℃'),
	('黑龍', 'Osteoglossum ferreirai', '南美洲亞馬遜河內的尼格羅河內', '50.0 - 100.0 cm', '溫和', '24.0 - 30.0 ℃'),
	('銀龍', 'Osteoglossum bicirrhosum', '南美洲亞馬孫河流域及其支流', '90.0 - 100.0  cm', '溫和', '24.0 - 30.0 ℃'),
	('巨型飛刀', 'Chitala lopis', '東南亞', '95.0 - 100.0 cm', '溫和', '23.0 - 27.0 ℃'),
	('七星刀', 'Chitala chitala', '東南亞，主要分布於印度、緬甸、泰國', '90.0 - 100.0 cm', '溫和', '24.0 - 28.0 ℃'),
	('海象魚', 'Arapaima gigas (Schinz, 1822)', '南美洲亞馬遜河', '200 - 600 cm', '溫和', '25 - 29 ℃'),
	('亞洲龍魚', 'Scleropages Formosus', '東南亞', 'cm', '有攻擊性', '℃'),
	('臭鼬鰍', 'Yasuhikotakia morleti (Tirant,1885)', '柬埔寨，老撾，泰國', '8 - 10 cm', '溫和', '24 - 29  ℃'),
	('蛇仔魚', 'Pangio kuhlii (Valenciennes,1846)', '東南亞印尼', '7 - 10  cm', '溫和', '26 - 30  ℃'),
	('喜山沙鰍', 'Botia almorhae (Gray,1831)', '印度、尼泊爾北部的喜馬拉雅山南坡水系', '8 - 10 cm', '溫和', '23 - 28  ℃'),
	('侏儒鰍', 'Yasuhikotakia sidthimunki(Klausewitz,1959)', '湄喃河和湄公河盆地（柬埔寨，老撾，泰國）', '4 - 5 cm', '溫和', '25 - 30  ℃'),
	('紫羅蘭鼠', 'Corydoras similis', '南美洲巴西', '4 - 5 cm', '溫和', '20 - 26 ℃'),
	('青銅鼠', 'Brochis multiradiatus (Orcés V.,1960)', '南美洲西亞馬遜流域', '6.7 cm', '溫和', '21 – 24 ℃'),
	('熊貓鼠', 'Corydoras panda (Nijssen & Isbrücker,1971)', '南美洲秘魯境內', '3 - 4 cm', '溫和', '22 - 28 ℃'),
	('滿天星鼠', 'Corydoras sterbai (Knaack,1962)', '南美洲巴西中部與玻利維亞，秘魯', '5 - 7  cm', '溫和', '23 - 26 ℃'),
	('阿帕奇直升機', 'Lamontichthys filamentosus (La Monte, 1935)', '南美洲', '167 cm', '溫和', '22.0-24.0 ℃'),
	('小精靈', 'Otocinclus vittatus (Regan,1904)', '南美洲', '3.0 - 4.0 cm', '溫和', '21.0-26.0 ℃'),
	('鑽石皇冠豹', 'Panaque cf.nigrolineatus', '南美洲', '40 cm', '溫和', '℃'),
	('綠裳紅劍尾坦克', 'Pseudacanthicus serratus (Valenciennes, 1840)', '南美洲', '32 cm', '溫和', '23.0 - 27.0 ℃'),
	('白珍珠異型', 'Acanthicus adonis', '南美洲', '20 - 25  cm', '溫和', '24 - 27  ℃'),
	('熊貓異型', 'Hypancistrus zebra', '南美洲', '8 - 10  cm', '溫和', '21 - 27  ℃'),
	('清道夫', 'Hypostomus plecostomus', '巴西、委內瑞拉', '45.0 - 52.0 cm', '溫和', '22.0 - 28.0 ℃'),
	('藍眼大鬍子', 'Ancistrus sp. temmincki', '南美洲', '11 cm', '溫和', '21.0 - 23.0 ℃'),
	('金翅帝王鼠', 'Corydoras gossei (Nijssen,1972)', '南美洲', '5 - 6 cm', '溫和', '22 - 26  ℃'),
	('皇冠直升機', 'Sturisoma panamense (Eigenmann & Eigenmann,1889)', '南美洲', '20 cm', '溫和', '26.0-29.0 ℃'),
	('紅尾鯰', 'Phractocephalus hemioliopterus', '南美秘魯亞馬遜河流域', '70.0 - 100.0 cm', '有攻擊性', '20.0 - 26.0 ℃'),
	('虎鯰', 'Pseudoplatystoma fasciatum', '南美洲的亞馬遜河流域', '95.0 - 100.0  cm', '有攻擊性', '23.0 - 28.0 ℃'),
	('小丑泥鰍', 'Chromobotia macracanthus (Bleeker,1852)', '印度尼西亞蘇門答臘島和加里曼丹島', '15.0 - 20.0 cm', '溫和', '24.0 - 30.0 ℃'),
	('馬頭鰍', 'Acantopsis choirorhynchos', '東南亞越南、老撾、泰國等地', '18.0 － 20.0 cm', '溫和', '26.0 - 29.0 ℃'),
	('華吸鰍', 'Sinogastromyzon szechuanensis (Fang, 1930)', '中國', '7.7 cm', '溫和', '18 - 25 ℃'),
	('白豹鼠', 'Corydoras atropersonatus (Weitzman&Nijssen,1970)', '南美洲厄瓜多爾、秘魯', '4 - 5 cm', '溫和', '21 - 26  ℃'),
	('紅寶石', 'Hemichromis bimaculatus Gill, 1862', '非洲加納到多哥的剛果河、尼羅河流域', '10.0 - 13.0 cm', '有攻擊性', '22.0 - 28.0 ℃'),
	('紅魔鬼', 'Amphilophus labiatus', '中美的哥斯達黎加、尼加拉瓜', '20.0 - 27.0 cm', '', '22.0 - 28.0 ℃'),
	('吉菲拉短鯛', 'Apistogramma gephyra (Kullander,1980)', '南美亞馬遜流域', '6 cm', '溫和', '25 - 27 ℃'),
	('神仙魚', 'Pterophyllum scalare (Lichtenstein, 1823)', '南美洲秘魯', '12.0 - 15.0 cm', '溫和', '23.0 - 29.0 ℃'),
	('金寶短雕', 'Apistogramma mendezi (Romer,1994)', '南美洲亞馬遜河尼格羅河流域', '4.9 cm', '溫和', '22 – 28 ℃'),
	('非洲十間', 'Tilapia buttikoferi (Hubrecht, 1881)', '非洲西部的獅子山', '28.0 - 31.0 cm', '有攻擊性', '22.0 - 25.0 ℃'),
	('皇冠棋盤', 'Dicrossus maculatus (Steindachner,1875)', '以亞瑪遜聖塔侖流域為中心的區域', '6 - 10 cm', '溫和', '22 – 25 ℃'),
	('霸王短鯛', 'Apistogramma panduro Romer, 1997', '南美洲秘魯', '4.0 - 5.0 cm', '溫和', '23.0 - 26.0 ℃'),
	('翡翠鳳凰', 'Pelvicachromis taeniatus (Boulenger, 1901)', '非洲西部流域', '8.0 - 9.0  cm', '溫和', '21.0 - 25.0  ℃'),
	('七彩神仙', 'Symphysodon discus', '南美洲亞瑪遜河流域及貝倫地區', '10.0 - 13.0 cm', '溫和', '26.0 - 30.0 ℃'),
	('黑金紅頭鼠', 'Corydoras duplicareus (Sands,1995)', '南美洲尼格羅河', '3 - 4  cm', '溫和', '22 - 27  ℃'),
	('紅頭鼠', 'Corydoras adolfoi (Burgess,1982)', '南美洲巴西尼格羅河', '4 - 5 cm', '溫和', '19 - 26 ℃'),
	('印第安鼠', 'Corydoras arcuatus (Elwin,1938)', '南美洲', '4 - 5  cm', '溫和', '22 - 28  ℃'),
	('花椒鼠', 'Corydoras paleatus (Jenyns,1842)', '南美洲巴西、烏拉圭', '6 - 8 cm', '溫和', '22 - 26  ℃'),
	('玻璃貓', 'Kryptopterus bicirrhis', '南亞泰國、馬來西亞、印度尼西亞', '13.0 - 15.0 cm', '溫和', '24.0 - 28.0 ℃'),
	('咖啡鼠', 'Corydoras aeneus', '南美洲', '6.0 - 8.0  cm', '溫和', '22.0 - 29.0 ℃'),
	('酋長短鯛', 'Apistogramma bitaeniata (Pellegrin,1936)', '南美洲亞瑪遜河流域', '5 - 8 cm', '溫和', '23 – 25 ℃'),
	('T字短鯛', 'Apistogrammoides pucallpaensis Meinken, 1965', '南美洲', '3.0 - 5.0 cm', '溫和', '23.0 - 30.0 ℃'),
	('德州豹', 'Herichthys cyanoguttatus Baird et Girard, 1854', '北美、墨西哥', '16.0 - 19.0 cm', '凶暴', '23.0 - 26.0 ℃'),
	('斑尾鳳凰', 'Parananochromis caudifasciatus (Boulenger, 1913)', '非洲喀麥隆南方流域', '8.0 - 11.0 cm', '溫和', '24.0 - 26.0  ℃'),
	('斑點短鯛', 'Apistogramma guttata Antonio, Kullander et Lasso, 1989', '委內瑞拉境內奧利諾科河流域', '3.0 - 6.0 cm', '溫和', '25.0 - 30.0 ℃'),
	('藍寶石', 'Aequidens pulcher (Gill, 1858)', '南美洲亞馬遜河,干圭亞那、巴西、烏拉圭', '16.0 - 20.0 cm', '溫和', '18.0 - 23.0  ℃'),
	('六間', 'Cyphotilapia frontosa', '非洲坦干依克湖', '25.0 - 30.0 cm', '有攻擊性', '23.0 - 29.0 ℃'),
	('燕尾棋盤', 'Dicrossus filamentosus (Ladiges,1958)', '亞瑪遜尼格羅河及以北支流', '6 - 9 cm', '溫和', '23 – 25 ℃'),
	('畫眉', 'Mesonauta festivus (Heckel, 1840)', '南美洲亞馬遜巴拉圭亞水系', '12.0 - 15.0  cm', '有攻擊性', '22.0 - 28.0 ℃'),
	('火鶴魚', 'Amphilophus citrinellus (Günther, 1864)', '中美洲的尼加拉瓜、哥斯達黎加等地', '26.0 - 33.0 cm', '溫和', '23.0 - 27.0 ℃'),
	('夜明珠', 'Paratilapia polleni', '非洲馬達加斯加', '20 - 28  cm', '有攻擊性', '23 - 28  ℃'),
	('紅鑽石', 'Hemichromis lifalili Loiselle, 1979', '非洲', '7.0 - 8.0  cm', '有攻擊性', '22.0 - 24.0 ℃'),
	('維吉塔短鯛', 'Apistogramma viejita (Kullander,1979)', '南美洲亞瑪遜流域及尤卡河', '雄魚7公分、雌魚4-5公分 cm', '溫和', '23 – 30 ℃'),
	('印加鸚鵡', 'Apistogramma baenschi Inka50', '秘魯境內的亞瑪遜支流', '6 cm', '溫和', '26-28  ℃'),
	('阿卡西短鯛', 'Apistogramma agassizii (Steindachner, 1875)', '秘魯北部到瑪瑙斯、聖塔倫間的亞馬遜河流域', '7.0 - 8.0  cm', '溫和', '21.0 - 25.0 ℃'),
	('一點皇冠', 'laetacara sp.', '南美洲的亞馬遜河', '8-9 cm', '溫和', '24 - 26 ℃'),
	('大銀斧燕子', 'Thoracocharax stellatus (Kner,1858)', '南美洲亞馬遜和奧莉諾科河流域', '7 cm', '溫和', '25 - 27 ℃'),
	('紅珍珠短鯛', 'Apistogramma pertensis (Haseman,1911)', '南美洲: 亞馬遜河流域的瑪瑙斯、桑塔倫及尼格羅河下游', '3.9 － 4.5 cm', '溫和', '23 - 30 ℃'),
	('帝王三間', 'Cichla temensis', '南美洲亞馬遜河流域', '99.0 cm', '有攻擊性', '23.0 - 27.0 ℃'),
	('雙帶短鯛', 'Apistogramma paucisquamis', '南美洲瑪瑙斯、聖塔倫境內流域', '4.5 - 6 cm', '溫和', '23 – 25 ℃'),
	('藍袖短鯛', 'Taeniacara candidi (Myers, 1935)', '南美州尼格羅河上流', '4.0 - 6.0 cm', '溫和', '25.0 - 28.0 ℃'),
	('白玉鳳凰', 'Nanochromis nudiceps (Boulenger, 1899)', '非洲剛果河流域', '7.0 - 8.0 cm', '溫和', '24.0 - 26.0 ℃'),
	('印第安短鯛', 'Apistogramma iniridae Kullander, 1979', '南美洲哥倫比亞境內的亞達巴波河', '5 - 8 cm', '溫和', '23 - 28 ℃'),
	('非洲王子', 'Labidochromis caeruleus Fryer, 1956', '非洲馬拉維湖', '8.0 - 10.0  cm', '溫和', '22.0 - 28.0  ℃'),
	('荷蘭鳳凰', 'Mikrogeophagus ramirezi (Myers et Harry, 1948)', '南美洲', '8.0 - 10.0  cm', '溫和', '23.0 - 30.0 ℃'),
	('羅漢魚', 'Cichlasoma sp.', '馬拉西亞', 'cm', '溫和', '26.0 - 28.0 ℃'),
	('卜卡短鯛', 'Apistogramma pulchra (Kullander,1980)', '巴西西部的亞瑪遜支流', '4 - 6 cm', '溫和', '26 - 28 ℃'),
	('三線短鯛', 'Apistogramma trifasciata', '南美洲巴拉那(RroParana)流域', '4.0 - 7.0 cm', '溫和', '26 – 29 ℃'),
	('藍王子', 'Copadichromis azureus Konings, 1990', '非洲馬拉維湖', '15.0 - 18.0 cm', '有攻擊性', '25.0 - 28.0 ℃'),
	('三角鯛', 'Uaru amphiacanthoides', '南美洲亞馬遜河、圭亞那', '16.0 - 20.0 cm', '溫和', '26.0 - 28.0 ℃'),
	('火口魚', 'Thorichthys meeki Brind, 1918', '中美洲', '12.0 - 15.0 cm', '溫和', '24.0 - 28.0 ℃'),
	('血紅鸚鵡', 'Vieja synspila (Hubbs)×Amphilophus citrinellus (Günther)', '雜交品種', '17.0 - 20.0 cm', '溫和', '23.0 - 28.0 ℃'),
	('紅尾皇冠', 'Aequidens rivulatus (Günther, 1860)', '南美洲', '15.0 - 20.0 cm', '有攻擊性', '20.0 - 24.0 ℃'),
	('玻利維亞鳳凰', 'Mikrogeophagus altispinosus (Haseman, 1911)', '南美洲', '6.0 - 8.0  cm', '溫和', '22.0 - 27.0  ℃'),
	('紅鉤', 'Myloplus rubripinnis (Müller & Troschel,1844)', '南美洲亞馬遜河和奧諾利科河流域，圭亞那北部和東部', '12 - 15 cm', '溫和', '23 – 27 ℃'),
	('綠蓮燈', 'Paracheirodon simulans', '南美洲尼格羅河上游與奧里諾科河河流域', '2.0 - 3.0 cm', '溫和', '22.0 - 28.0 ℃'),
	('紅背血心燈', 'Hyphessobrycon pyrrhonotus (Burgess,1993)', '南美洲尼格羅河', '4 - 5 cm', '溫和', '23 - 28  ℃'),
	('檸檬燈', 'Hyphessobrycon pulchripinnis Ahl, 1937', '南美洲亞馬孫河流域', '4.0 - 5.0 cm', '溫和', '22.0 - 28.0 ℃'),
	('剛果扯旗', 'Phenacogrammus interruptus (Boulenger, 1899)', '非洲剛果河水系', '3.0 - 4.0 cm', '溫和', '23.0 - 26.0 ℃'),
	('玫瑰旗', 'Hyphessobrycon rosaceus Durbin, 1909', '南美亞馬遜河流域、圭亞那', '3.0 - 4.0 cm', '溫和', '24.0 - 28.0 ℃'),
	('紅鼻剪刀', 'Hemigrammus rhodostomus Ahl, 1924', '南美洲的巴西', '3.0 - 4.0 cm', '溫和', '22.0 - 26.0 ℃'),
	('南美牙魚', 'Hoplias malabaricus (Bloch,1794)', '中美洲與南美洲，哥斯達黎加到阿根廷的河流域', '50 - 55 cm', '有攻擊性', '22 - 28 ℃'),
	('紅腹食人鯧', 'Pygocentrus nattereri Kner, 1858', '南美亞馬遜河流域', '20.0 - 30.0  cm', '有攻擊性', '24.0 - 29.0 ℃'),
	('咖啡豆燈', 'Hyphessobrycon takasei (Géry, 1964)', '南美阿拉瓜里河、歐雅帕克河流域', '3 cm', '溫和', '21-27 ℃'),
	('畢加索燈', 'Ladigesia roloffi (Géry, 1968)', '產於利比里亞的楊格河、象牙海岸及加納', '3 - 4 cm', '溫和', '22 – 26 ℃'),
	('黑蓮燈', 'Hyphessobrycon herbertaxelrodi', '南美巴西亞馬遜河流域', '3.0 - 4.0 cm', '溫和', '23.0 - 27.0 ℃'),
	('噴火燈', 'Hyphessobrycon amandae', '南美洲Araguaia河流域', '2.0 - 3.0 cm', '溫和', '23.0 - 29.0 ℃'),
	('鑽石燈', 'Moenkhausia pittieri', '南美巴西亞馬遜河流域', '5.0 - 6.0  cm', '溫和', '25.0 - 28.0  ℃'),
	('黑旗', 'Hyphessobrycon megalopterus', '南美巴拉圭', '4.0 - 5.0 cm', '溫和', '23.0 - 28.0 ℃'),
	('玻璃扯旗', 'Pristella maxillaris', '南美亞馬遜流域', '4.0 - 5.0  cm', '溫和', '24.0 - 28.0 ℃'),
	('大暴牙', 'Hydrolycus scomberoides', '南美洲亞馬遜河流域', '76 cm', '有攻擊性', '24-28 ℃'),
	('咖啡燕子', 'Carnegiella marthae (Myers,1927)', '南美洲尼格羅河和奧莉諾科（Orinoco）河流域', '2.5 - 3.5 cm', '溫和', '23 - 27 ℃'),
	('迷你燕子', 'Carnegiella schereri (Fernández-Yépez,1950)', '南美洲秘魯和巴西的亞馬遜河流域', '2.5 - 3.5 cm', '溫和', '℃'),
	('霓虹燕子', 'Carnegiella myersi(Fernández-Yépez,1950)', '南美洲秘魯的亞馬遜河流域', '2.5 - 3 cm', '溫和', '23 - 26 ℃'),
	('陰陽燕子', 'Carnegiella strigata (Günther,1864)', '南美洲秘魯、圭亞那', '4 - 5  cm', '溫和', '24 - 28  ℃'),
	('雲石燕子', 'Carnegiella vesca', '南美洲', '4 - 5 cm', '溫和', '24 - 28 ℃'),
	('噴點燕子', 'Gasteropelecus levis (Eigenmann,1909)', '南美洲巴西亞馬遜河下游', '3.5－ 6 cm', '溫和', '℃'),
	('銀點燕子', 'Gasteropelecus maculatus (Steindachner,1879)', '中美洲與南美洲，哥倫比亞西部到巴拿馬東部', '6 - 9 cm', '溫和', '22 – 28 ℃'),
	('銀燕子', 'Gasteropelecus sternicla (Linnaeus,1758)', '南美洲亞馬孫河，圭亞那、蘇里南、巴西等地', '6 - 7 cm', '溫和', '24 - 28  ℃'),
	('巨斧燕子', 'Thoracocharax securis (De Filippi,1853)', '南美亞馬遜河流域巴拉圭河以及奧莉諾科河', '8.0 cm', '溫和', '23.0 - 30.0 ℃'),
	('貝蒂燈', 'Hemigrammus pulcher (Ladiges, 1938)', '南美洲巴西伊給多附近的亞馬遜河流域', '3 - 5 cm', '溫和', '23 - 27 ℃'),
	('珍珠燈', 'Poecilocharax weitzmani (Géry,1965)', '南美洲尼格羅河，奧利諾科河上游', '3 - 4 cm', '溫和', '24 – 28 ℃'),
	('紅綠燈', 'Paracheirodon innesi (Myers, 1936)', '秘魯、亞馬遜河支流、哥倫比亞、巴西', '3.0 - 4.0 cm', '溫和', '20.0 - 25.0 ℃'),
	('血心燈', 'Hyphessobrycon erythrostigma', '南美洲地區，包括秘魯、哥倫比亞、巴西等國境內亞馬遜河上游流域', '5.0 - 6.0 cm', '溫和', '22.0 - 28.0 ℃'),
	('藍帝王燈', 'Inpaichthys kerri', '南美洲', '2.0 - 3.0 cm', '溫和', '24.0 - 28.0 ℃'),
	('頭尾燈', 'Hemigrammus ocellifer (Steindachner, 1882)', '分布於南美洲的圭亞那和亞馬遜河流域', '4.0 - 5.0  cm', '溫和', '23.0 - 28.0 ℃'),
	('哥倫比亞旗', 'Hyphessobrycon ecuadorensis', '南美洲', '3.0 - 4.0 cm', '溫和', '21.0 - 28.0 ℃'),
	('紅尾玻璃', 'Prionobrama filigera (Cope, 1870)', '南美亞馬遜河流域', '5.0 - 6.0  cm', '溫和', '22.0 - 26.0 ℃'),
	('淡水白鯧', 'Piaractus brachypomus (Cuvier, 1818)', '南美亞馬遜河', '70.0 - 90.0 cm', '溫和', '22.0 - 28.0 ℃'),
	('金線黑燈', 'Hyphessobrycon vilmae (Géry, 1966)', '巴西境內的馬杜格魯蘇，以及亞利諾斯河', '4 cm', '溫和', '22 - 26 ℃'),
	('神風燈', 'Gnathocharax steindachneri(Fowler,1913)', '南美洲亞馬遜河及奧莉諾科（Orinoco）河流域', '5 - 7 cm', '溫和', '23 - 27 ℃'),
	('粉紅旗', 'Hyphessobrycon robertsi', '南美洲', '5 cm', '溫和', '23-26 ℃'),
	('非洲猛魚', 'Hydrocynus vittatus (Castelnau, 1861)', '非洲', '70 - 105 cm', '有攻擊性', '23 - 26 ℃'),
	('銀鯧', 'Metynnis hypsauchen (Müller et Troschel, 1844)', '南美洲的亞馬遜河流域', '15.0 - 20.0 cm', '溫和', '24.0 - 29.0 ℃'),
	('藍線金燈', 'hemigrammus armstrongi', '南美洲亞馬遜河流域,圭亞那', '3 - 4 cm', '溫和', '24 - 28  ℃'),
	('非洲精靈燈', 'Barboides gracilis (Brüning,1929)', '非洲赤道幾內亞的貝寧，尼日利亞與喀麥隆到里約慕尼', '1.5 - 2.5 cm', '溫和', '24 – 26 ℃'),
	('彩虹帝王燈', 'Nematobrycon lacortei', '南美洲桑河胡安河流域', '3.0 - 4.0 cm', '溫和', '22.0 - 28.0 ℃'),
	('黃日光燈', 'Hasemania nana', '南美州的巴西東南部', '2.0 - 3.0 cm', '溫和', '22.0 - 28.0 ℃'),
	('紅衣夢幻旗', 'Hyphessobrycon sweglesi', '南美洲奧里諾科河(Orinoco)流域', '3.0 - 4.0 cm', '溫和', '21.0 - 25.0 ℃'),
	('黑裙魚', 'Gymnocorymbus ternetzi (Boulenger, 1895)', '巴西、巴拉圭、玻利維亞及亞馬遜河流域', '3.0 - 4.0 cm', '溫和', '20.0 - 26.0  ℃'),
	('皇冠九間', 'Distichodus sexfasciatus (Boulenger,1897)', '非洲剛果河中下游、坦噶尼喀湖', '76 cm', '溫和', '22 – 26 ℃'),
	('黃金燈', 'Hemigrammus rodwayi (Durbin, 1909)', '南美洲亞馬遜河流域,圭亞那', '3 - 4 cm', '溫和', '24 - 28 ℃'),
	('法拉利燈', 'Neolebias powelli (Teugels & Roberts,1990)', '非洲尼日利亞', '1.6 - 2.5 cm', '溫和', '23 – 26 ℃'),
	('血鰭燈', 'Brittanichthys axelrodi(Géry,1965)', '南美洲尼格羅河流域', '3 - 4 cm', '溫和', '25 - 28 ℃'),
	('火焰燈', 'Hyphessobrycon flammeus Myers, 1924', '南美洲巴西境內里約熱內盧附近的流域', '2.0 - 3.0 cm', '溫和', '22.0 - 28.0 ℃'),
	('帝王燈', 'Nematobrycon palmeri', '亞馬遜河流域、哥倫比亞', '4.0 - 5.0 cm', '溫和', '23.0 - 27.0 ℃'),
	('紅管燈', 'Hemigrammus erythrozonus', '南美蓋亞納的埃塞圭河', '4.0 - 5.0 cm', '溫和', '23.0 - 28.0 ℃'),
	('新大鉤扯旗', 'Hyphessobrycon bentosi', '南美洲亞馬遜河、哥倫比亞等地', '5.0 - 7.5 cm', '溫和', '23.0 - 28.0 ℃'),
	('黑斑扯旗', 'Hyphessobrycon epicharis (Weitzman&Palmer,1997)', '南美洲巴西奧里諾河', '5cm cm', '溫和', '25 - 27 ℃'),
	('黃金河虎', 'Salminus brasiliensis (Cuvier, 1816) ,Salminus maxillosus', '南美洲巴拉圭、烏拉圭河流域，亞馬遜河流域', '100 cm', '有攻擊性', '20 - 28 ℃'),
	('短鼻六間', 'Distichodus sexfasciatus', '非洲剛果', '71.0 - 78.0 cm', '有攻擊性', '21.0 - 26.0  ℃'),
	('安東尼燈', 'Lepidarchus adonis (Roberts, 1966)', '非洲加納和科特迪瓦沿海流域', '2 cm', '溫和', '22 – 26 ℃'),
	('寶蓮燈', 'Paracheirodon axelrodi', '南美洲亞馬孫河流域', '4.0 - 5.0  cm', '溫和', '23.0 - 29.0 ℃'),
	('大帆燈', 'Crenuchus spilurus', '南美洲', '5.0 - 6.0 cm', '溫和', '23.0 - 28.0 ℃'),
	('銀屏燈', 'Moenkhausia sanctaefilomenae (Steindachner,1907)', '南美洲亞馬遜河、圭亞那等地', '5 - 7 cm', '溫和', '22 - 28  ℃'),
	('企鵝燈', 'Thayeria boehlkei', '南美洲巴西境內的圭亞那河流域，以及秘魯境內的亞馬孫河流域', '6.0 - 8.0 cm', '溫和', '22.0 - 28.0 ℃'),
	('紅尾夢幻旗', 'Hyphessobrycon columbianus', '南美洲', '6.0 - 7.0 cm', '溫和', '23.0 - 27.0 ℃'),
	('金旗', 'Hyphessobrycon roseus (Géry,1960)', '南美洲馬羅尼河和奧亞波克河流域', '3 cm', '溫和', '23 - 27 ℃'),
	('火兔燈', 'Aphyocharax rathbuni(Eigenmann,1907)', '南美洲巴拉圭河流域', '4 - 5 cm', '溫和', '20 - 26  ℃'),
	('黑鯊', 'Labeo chrysophekadion', '泰國、蘇門答臘、婆羅洲、爪哇、蘇拉威西島', '65.0 - 90.0 cm', '有攻擊性', '23.0 - 27.0 ℃'),
	('藍帶斑馬', 'Danio erythromicron (Annandale,1918)', '緬甸', '3 cm', '溫和', '21 - 25 ℃'),
	('紫金非鯉', 'Devario auropurpureus (Annandale,1918)', '', '10 cm', '溫和', '22 - 24 ℃'),
	('虎皮魚', 'Puntius tetrazona', '蘇門答臘', '6.0 - 7.0 cm', '溫和', '20.0 - 25.0  ℃'),
	('白雲山魚', 'Tanichthys albonubes', '中國廣州市白雲山附近溪流', '4.0 - 5.0  cm', '溫和', '17.0 - 23.0  ℃'),
	('黑寶石', 'puntius nigrofasciatus', '南亞', '5.0 - 6.0 cm', '溫和', '20.0 - 26.0 ℃'),
	('斑馬魚', 'Danio rerio (Hamilton, 1822)', '印度、孟加拉國', '5.0 - 7.0 cm', '溫和', '18.0 - 26.0 ℃'),
	('紅玫瑰鯽', 'Puntius titteya', '南亞，斯里蘭卡', '4.0 - 5.0  cm', '溫和', '23.0 - 27.0 ℃'),
	('金魚', 'Carassius auratus auratus', '東亞', '16.0 - 20.0 cm', '溫和', '15.0 - 30.0  ℃'),
	('錦鯉', 'Cyprinus carpio', '日本', '60.0 - 100.0 cm', '溫和', '15.0 - 25.0 ℃'),
	('紅尾黑鯊', 'Epalzeorhynchos bicolor', '泰國', '10.0 - 12.0 cm', '溫和', '22.0 - 27.0 ℃'),
	('銀鯊', 'Balantiocheilus melanopterus', '泰國、婆羅洲、蘇門答臘的溪流中', '35.0 cm', '溫和', '22.0 - 28.0  ℃'),
	('彩虹鯊', 'Epalzeorhynchus frenatus', '泰國、馬來西亞、印尼蘇門答臘島、加里曼丹島等', '12.0 - 15.0 cm', '有攻擊性', '23.0 - 29.0 ℃'),
	('斑駁䰾', 'Puntius narayani (Hora, 1937)', '印度', '6 cm', '溫和', '22 - 26 ℃'),
	('棋盤鯽', 'Puntius oligolepis (Bleeker, 1853)', '亞洲蘇門答臘，印尼', '4 - 5 cm', '溫和', '20 - 26  ℃'),
	('條紋小䰾', 'Puntius semifasciolatus (Günther, 1868)', '中國南部', '6 - 7 cm', '溫和', '21 - 26  ℃'),
	('條紋䰾', 'Puntius fasciatus (Jerdon, 1849)', '亞洲印度', '13 - 15 cm', '溫和', '22 - 27  ℃'),
	('雙斑䰾', 'Puntius bimaculatus (Bleeker, 1863)', '斯里蘭卡', '7 cm', '溫和', '25 - 27 ℃'),
	('三線䰾', 'Puntius arulius (Jerdon, 1849)', '亞洲印度的考未立河(Cauvery)流域', '8 - 12 cm', '溫和', '24 - 28  ℃'),
	('黃帆鯽', 'Oreichthys cosuatis (Hamilton, 1822)', '亞洲印度，孟加拉國，泰國與緬甸', '8 cm', '溫和', '25 - 27 ℃'),
	('玻璃八間鯽', 'Eirmotus octozona (Schultz,1959)', '泰國及婆羅洲西部', '3 - 4 cm', '溫和', '23 - 26 ℃'),
	('亞洲紅鼻', 'Sawbwa resplendens (Annandale,1918)', '緬甸、東南亞', '3 - 5 cm', '溫和', '21 - 25 ℃'),
	('七彩白雲山', 'Tanichthys micagemmae(Freyhof&Herder,2001)', '亞洲越南邊海河(River Ben Hai)', '3 cm', '溫和', '22 - 28 ℃'),
	('閃電斑馬', 'Danio albolineatus (Blyth, 1860)', '亞洲緬甸到老撾與印度尼西亞的蘇門答臘島', '6 - 7 cm', '溫和', '6.1 - 7.9 ℃'),
	('奈娜波燈', 'Microrasbora nana (Kottelat & Witte, 1999)', '目前已知只來自緬甸，但是可能在依洛瓦底江三角州中有寬廣的分佈', '1.5 - 3 cm', '溫和', '22.0 - 27.0 ℃'),
	('蓋氏小波魚', 'Microrasbora gatesi (Herre,1939)', '亞洲緬甸', '2 - 3 cm', '溫和', '22 - 27  ℃'),
	('五帶鯽', 'Puntius pentazona (Boulenger, 1894)', '馬來半島、蘇 門達臘、印度尼西亞等東南亞國家', '5 - 6  cm', '溫和', '24 - 29  ℃'),
	('金鱗燈', 'Rasbora bankanensis (Bleeker, 1853)', '印尼的幫加群島水域', '4 cm', '溫和', '25 - 27 ℃'),
	('青眼燈', 'Rasbora dorsiocellata (Duncker, 1904)', '東南亞馬來西亞及印尼境內', '2 cm', '溫和', '25 - 27 ℃'),
	('紅尾金線燈', 'Rasbora borapetensis (Smith,1934)', '東南亞泰國、馬來西亞境內', '5 - 6 cm', '溫和', '22 - 26 ℃'),
	('一線長紅燈', 'Rasbora pauciperforata (Weber & deBeaufort,1916)', '東南亞馬來西亞、印尼', '5 - 7 cm', '溫和', '22 - 26  ℃'),
	('黑剪刀', 'Rasbora trilineata (Steindachner,1870)', '東南亞湄公河、昭披耶河流域及馬來半島西部、印尼蘇門答臘島、婆羅洲等地', '10 - 15 cm', '溫和', '20 - 26 ℃'),
	('佐佐木氏雀鯛', 'Rasbora sarawakensis (Brittan,1951)', '婆羅洲西北部', '6 cm', '溫和', '25 - 27 ℃'),
	('兩點紅', 'Rasbora kalochroma (Bleeker,1851)', '馬拉西亞，印尼', '10 cm', '溫和', '25 - 27 ℃'),
	('二點鯊', 'Rasbora elegans (Volz, 1903)', '馬來西亞、印尼', '18 - 20 cm', '溫和', '22 - 26  ℃'),
	('藍線燈', 'Rasbora einthovenii (Bleeker, 1851)', '馬來半島、印尼', '8 - 9 cm', '溫和', '23 - 26  ℃'),
	('斯里蘭卡火波魚', 'Rasbora vaterifloris (Deraniyagala, 1930)', '斯里蘭卡', '4 - 5 cm', '溫和', '22 - 28 ℃'),
	('藍色霓虹燈', 'Microrasbora kubotai', '亞洲泰國', '2 - 3 cm', '溫和', '22 - 26 ℃'),
	('婆羅洲小丑燈', 'Boraras merah (Kottelat,1991)', '婆羅洲', '2 cm', '溫和', '25 - 27 ℃'),
	('三點小丑燈', 'Boraras maculatus (Duncker, 1904)', '馬來西亞，印尼的蘇門答臘', '2.5 cm', '溫和', '24 – 26 ℃'),
	('三斑泰波魚', 'Boraras micros (Kottelat & Vidthayanon, 1993)', '泰國', '2 cm', '溫和', '25 - 27 ℃'),
	('鑽石紅蓮燈', 'Sundadanio axelrodi (Brittan, 1976)', '印度尼西亞', '2 - 2.5 cm', '溫和', '23 - 26 ℃'),
	('金三角燈', 'Trigonostigma espei (Meinken,1967)', '東南亞泰國、馬來西亞、印尼', '4 - 5 cm', '溫和', '22 - 26 ℃'),
	('小三角燈', 'Trigonostigma hengeli (Meinken,1956)', '東南亞', '4 cm', '溫和', '23 - 28 ℃'),
	('索姆三角燈', 'Trigonostigma somphongsi (Meinken, 1958)', '東南亞泰國', '2 cm', '溫和', '22 - 26 ℃'),
	('一線小丑燈', 'Boraras brigittae (Vogt, 1978)', '亞洲馬來西亞,印尼的蘇門答臘', '3 - 4 cm', '溫和', '23 - 27  ℃'),
	('黑線飛狐', 'Crossocheilus siamensis (Smith, 1931)', '東南亞', '13 - 16 cm', '溫和', '23 - 27 ℃'),
	('羅蘭黑線燈', 'Rasbora hubbsi (Brittan,1954)', '亞洲', '5.0 cm', '溫和', '24 – 28 ℃'),
	('一眉道人', 'Puntius denisonii (Day, 1865)', '印度', '14 - 15  cm', '溫和', '22 - 25  ℃'),
	('三角燈', 'Trigonostigma heteromorpha (Duncker,1904)', '亞洲的泰國、馬來西亞、印度尼西亞', '3 - 5 cm', '溫和', '23 - 28 ℃'),
	('咖啡濺水魚', 'Copella metae (Eigenmann,1914)', '南美洲奧莉諾科河和尼格羅河上游', '6 cm', '溫和', '25 – 27 ℃'),
	('[卵生鱂魚科]二線琴尾鱂', '', '西非尼日利亞東南部及喀麥隆西南部水域', '5.0 cm', '溫和', '22.0 - 24.0 ℃'),
	('珍珠濺水燈', 'Copella nattereri(Steindachner,1876)', '哥倫比亞、巴西內格羅河', '4.5 cm', '溫和', '23 – 27 ℃'),
	('一線鉛筆', 'Nannostomus unifasciatus', '南美洲玻利維亞、巴西、哥倫比亞、委內瑞拉、圭亞那。', '4.0 - 6.0 cm', '溫和', '25.0 – 28.0 ℃'),
	('二線鉛筆', 'Nannostomus digrammus', '南美洲Rio馬得拉群島，亞馬孫河下游與中游與圭亞那', '2.8 - 3.0 cm', '溫和', '24.0 – 26.0 ℃'),
	('三線鉛筆', 'Nannostomus trifasciatus', '南美洲', '4.0 - 5.0 cm', '溫和', '23.0 - 29.0 ℃'),
	('五點鉛筆', 'Nannostomus espei', '南美洲', '3.8 - 4.0 cm', '溫和', '25.0 – 28.0 ℃'),
	('尖嘴鉛筆', 'Nannobrycon eques', '南美洲巴西亞馬遜河流域', '5.0 - 6.0 cm', '溫和', '22.0 - 28.0 ℃'),
	('火焰鉛筆', 'Nannostomus mortenthaleri', '南美洲亞馬遜河流域的秘魯', '2.0 - 3.0 cm', '溫和', '24.0 - 26.0  ℃'),
	('小紅鉛筆', 'Nannostomus marginatus', '南美洲', '3.0 - 4.0 cm', '溫和', '24.0 - 27.0 ℃'),
	('微鉛筆魚', 'Nannostomus minimus (Eigenmann,1909)', '南美洲圭亞那Potaro和Mazaruni河流域', '2.5 - 3 cm', '溫和', '25 - 27 ℃'),
	('綠線鉛筆', 'Nannostomus marilynae (Weitzman&Cobb,1975)', '南美洲尼格羅河與Vichada河流域', '5 cm', '溫和', '24 - 26 ℃'),
	('侏儒鉛筆', 'Nannostomus anduzei (Fernandez&Weitzman,1987)', '南美洲尼格羅河與奧利諾科河上游', '1.6 - 2 cm', '溫和', '24 - 28 ℃'),
	('紅肚鉛筆魚', 'Nannostomus beckfordi (Günther,1872)', '南美洲蓋亞納、委內瑞拉亞馬遜河下游至尼格羅河水域', '6.5 cm', '溫和', '24 - 26 ℃'),
	('牡丹魚', 'Xiphophorus variatus', '中美洲墨西哥、危地馬拉等江河流域', '6.0 - 7.0 cm', '溫和', '21 - 26 ℃'),
	('尖嘴鰈魚', 'Belonesox belizanus', '北美洲、中美洲', '12 - 15 cm', '有攻擊性', '25 - 30  ℃'),
	('孔雀魚', 'Poecilia reticulata', '委內瑞拉、圭亞那、西印度群島等地的江河流域', '4.0 - 6.0 cm', '溫和', '19.0 - 29.0 ℃'),
	('劍尾魚', 'Xiphophorus helleri', '北美、中美洲，墨西哥、危地馬拉，後傳入非洲、斯里蘭卡', '10.0 - 12.0  cm', '溫和', '21.0 - 28.0 ℃'),
	('黑瑪麗', 'Poecilia latipinna', '北美、墨西哥', 'cm', '溫和', '22-26 ℃'),
	('月光魚', 'Xiphophorus maculatus', '中美洲墨西哥、危地馬拉等江河流域', '5.0 - 8.0 cm', '溫和', '20.0 - 26.0 ℃'),
	('食蚊魚', 'Gambusia affinis', '美國東南部、墨西哥及古巴', '3.0 - 4.0 cm', '有攻擊性', '21.0 - 26.0 ℃'),
	('藍彩鱂', 'Fundulopanchax gardneri gardneri (Boulenger, 1911)', '非洲', '6.5 - 7.5 cm', '溫和', '22 – 25 ℃'),
	('漂亮寶貝', 'Nothobranchius rachovii', '非洲肯雅等地', '6.0 cm', '溫和', '20 – 24 ℃'),
	('黃金鱂', 'Aplocheilus lineatus', '印度、緬甸、斯里蘭卡', '10.0 - 12.0  cm', '溫和', '24.0 - 28.0 ℃'),
	('藍眼鱂', 'Aplocheilichthys normani', '西非的高原湖泊水域--喀麥隆(Cameroon)、尼日利亞(Nigeria)與南多哥(Southern Togo)', '4 cm', '溫和', '26.0 - 28.0 ℃'),
	('五線鱂', 'Aphyosemion striatum', '西非加蓬北部、幾內亞等地', '5.0 cm', '溫和', '20.0 - 23.0 ℃'),
	('二線琴尾鱂', 'Aphyosemion bivittatum', '西非尼日利亞東南部及喀麥隆西南部水域', '5.0 cm', '溫和', '22.0 - 24.0 ℃'),
	('黑珍珠鱂', 'Cynolebias nigripinnis', '南美阿根廷', '5.0 cm', '有攻擊性', '16.0 - 22.0 ℃'),
	('美國旗魚', 'Jordanella floridae (Goode&Bean,1879)', '美國佛羅里達州', '6 - 7  cm', '溫和', '19 - 23  ℃'),
	('二線藍眼燈', 'Micropanchax macrophthalmus (Meinken, 1932)', '非洲尼日利亞、喀麥隆', '3 - 4 cm', '溫和', '22 - 26  ℃'),
	('普通神仙', 'pterophyllum scalare', '亞馬遜河中心至秘魯、厄瓜多爾一帶水域', '15cm', '溫和', '26-28  ℃'),
	('長吻神仙', 'pterophyllum dumerilii', '南美亞馬遜流域', '15cm', '溫和', '26-28  ℃'),
	('埃及神仙', 'pterophyllum altum', '南美奧利諾科河的中游及其支流', '18cm', '溫和', '30-31  ℃'),
	('黑神仙', 'Black Angelfish', NULL, '15cm', '溫和', '26-28  ℃'),
	('鑽石神仙', 'Diamond Angelfish', '', '15cm', '溫和', '26-28  ℃'),
	('藍神仙', 'Blue Angelfish', '', '15cm', '溫和', '26-28  ℃'),
	('金神仙', 'Golden Angelfish', NULL, '15cm', '溫和', '26-28  ℃'),
	('黑幻象神仙', 'Pterophylium scalare', '南美洲', '10cm', '溫和', '26-28  ℃'),
	('磚魚', 'Gymnocorymbus ternetzi (Boulenger, 1895)', '巴西、巴拉圭、玻利維亞及亞馬遜河流域', '2-4cm', '溫和', '26-27  ℃'),
	('虎紋磚', NULL, NULL, NULL, '溫和', '23-26  ℃'),
	('長鰭蝶翼斑馬魚', 'Hyphessobrycon herbertaxelrodi', '南美洲', '3-4cm', '溫和', '20-23  ℃'),
	('水泡魚', 'Carassius auratus', '中國', '10-20cm', '溫和', '18 - 24  ℃'),
	('乒乓球鱗', 'Carassius auratus var.ping pong', '中國', '10-15cm', '溫和', '18 - 24  ℃'),
	('螢光綠四間', 'Paracheirodon innesi', '南美洲亞馬遜流域', '4-5cm', '溫和', '22-26  ℃'),
	('包頭銀板', 'Metynnis hypsauchen', '南美洲', '12-15cm', '溫和', '24-28  ℃'),
	('雙色草莓', 'Melanotaenia lacustris', '澳大利亞及新幾內亞', '10-12cm', '溫和', '22-26  ℃'),
	('黃龍', 'Aulonocara sp.', '馬拉威湖', '10-15cm', '有攻擊性', '24-28  ℃'),
	('高背短尾琉金', 'Carassius auratus var.short tail', '中國', '10-15cm', '溫和', '18 – 24 ℃'),
	('藍美人', 'Cichlasoma meeki', '中美洲', '12-15cm', '有攻擊性', '24 – 28 ℃'),
	('黃金圓球鳳凰', 'Pelvicachromis pulcher', '西非', '7-10cm', '溫和', '24 – 28 ℃'),
	('瑪瑙羅漢', 'Amphilophus citrinellus', '中美洲', '20-30cm', '極具攻擊性', '24-28  ℃'),
	('黃彩魚鱂', 'Fundulopanchax gardneri', '西非', '5-7cm', '溫和', '22-26  ℃'),
	('大帆櫻桃燈', 'Hyphessobrycon erythrostigma', '南美洲', '5-7cm', '溫和', '22-26  ℃'),
	('紅星鑽雷龍', 'Channa bleheri', '印度東北部', '20-30cm', '有攻擊性', '24-28  ℃');

-- 傾印  資料表 parameter.personaldata 結構
CREATE TABLE IF NOT EXISTS `personaldata` (
  `ID` int(11) unsigned NOT NULL,
  `Name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '請輸入名稱',
  `Introduction` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- 正在傾印表格  parameter.personaldata 的資料：~2 rows (近似值)
REPLACE INTO `personaldata` (`ID`, `Name`, `Introduction`) VALUES
	(2, '今汐', ''),
	(1, '夏', '嗨～\n\n');

-- 傾印  資料表 parameter.taskmodal 結構
CREATE TABLE IF NOT EXISTS `taskmodal` (
  `TaskID` int(10) unsigned NOT NULL,
  `Task_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Complete` tinyint(4) unsigned NOT NULL DEFAULT 0,
  `received` tinyint(3) unsigned NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- 正在傾印表格  parameter.taskmodal 的資料：~5 rows (近似值)
REPLACE INTO `taskmodal` (`TaskID`, `Task_name`, `Complete`, `received`) VALUES
	(1, '每日登入1次', 1, 1),
	(2, '每日餵食1次', 1, 1),
	(3, '每日餵食2次', 1, 1),
	(4, '點擊1次指定魚種', 1, 1),
	(5, '完成3個任務', 0, 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
