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


-- 傾印 testdb 的資料庫結構
CREATE DATABASE IF NOT EXISTS `testdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `testdb`;

-- 傾印  資料表 testdb.sensor_data 結構
CREATE TABLE IF NOT EXISTS `sensor_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Temperature` float DEFAULT NULL,
  `Humidity` float DEFAULT NULL,
  `pHValue` float DEFAULT NULL,
  `WaterLevel` float DEFAULT NULL,
  `FeedHeight` float DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1202 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 正在傾印表格  testdb.sensor_data 的資料：~0 rows (近似值)

-- 傾印  資料表 testdb.sub_accounts 結構
CREATE TABLE IF NOT EXISTS `sub_accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `main_user` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `gender` enum('男性','女性','其他') DEFAULT NULL,
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(10) DEFAULT '啟用',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `last_update` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `role` enum('main','sub') DEFAULT 'sub',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_account` (`account`),
  KEY `main_user` (`main_user`),
  CONSTRAINT `sub_accounts_ibfk_1` FOREIGN KEY (`main_user`) REFERENCES `user_account` (`account`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 正在傾印表格  testdb.sub_accounts 的資料：~0 rows (近似值)

-- 傾印  資料表 testdb.user_account 結構
CREATE TABLE IF NOT EXISTS `user_account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `gender` enum('男性','女性','其他') DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `last_update` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `role` enum('main','sub') DEFAULT 'main',
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 正在傾印表格  testdb.user_account 的資料：~3 rows (近似值)
REPLACE INTO `user_account` (`id`, `account`, `username`, `gender`, `email`, `password`, `created_at`, `last_update`, `role`) VALUES
	(1, 'aenevia666@gmail.com', '邱勝夫', '男性', '0', 'a123', '2024-08-12 17:48:59', '2024-08-26 01:30:33', 'main'),
	(2, 'future05and06@gmail.com', '邱勝夫', '男性', NULL, 'a123', '2024-08-12 17:49:44', '2024-08-12 17:49:45', 'main'),
	(3, '0', NULL, NULL, NULL, '0', '2024-08-13 07:30:17', '2024-08-13 07:30:18', 'main');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
