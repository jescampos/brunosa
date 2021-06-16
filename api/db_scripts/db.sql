-- --------------------------------------------------------
-- Anfitrião:                    127.0.0.1
-- Versão do servidor:           5.7.32-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Versão:              11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for sa
CREATE DATABASE IF NOT EXISTS `sa` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `sa`;

-- Dumping structure for table sa.agenda
CREATE TABLE IF NOT EXISTS `agenda` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL DEFAULT '0',
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `birth_date` date NOT NULL,
  `relationship` varchar(50) DEFAULT NULL,
  `facebook_link` varchar(150) DEFAULT NULL,
  `instagram_link` varchar(150) DEFAULT NULL,
  `twitter_link` varchar(150) DEFAULT NULL,
  `other_social_networ_link` varchar(150) DEFAULT NULL,
  `other_social_networ_link2` varchar(150) DEFAULT NULL,
  `other_social_networ_link3` varchar(150) DEFAULT NULL,
  `primary_email` varchar(150) NOT NULL,
  `secundary_email` varchar(150) DEFAULT NULL,
  `primary_address` varchar(255) DEFAULT NULL,
  `secundary_address` varchar(255) DEFAULT NULL,
  `work_company` varchar(100) DEFAULT NULL,
  `course_name` varchar(100) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `obs` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table sa.agenda: ~0 rows (approximately)
DELETE FROM `agenda`;
/*!40000 ALTER TABLE `agenda` DISABLE KEYS */;
INSERT INTO `agenda` (`id`, `student_id`, `first_name`, `middle_name`, `last_name`, `birth_date`, `relationship`, `facebook_link`, `instagram_link`, `twitter_link`, `other_social_networ_link`, `other_social_networ_link2`, `other_social_networ_link3`, `primary_email`, `secundary_email`, `primary_address`, `secundary_address`, `work_company`, `course_name`, `photo`, `obs`) VALUES
	(3, 12, 'teste', NULL, 'teste', '2001-01-20', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'xxx@xxx.xx', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `agenda` ENABLE KEYS */;

-- Dumping structure for table sa.students
CREATE TABLE IF NOT EXISTS `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_number` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `mobile_phone` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `authentication_code` int(11) DEFAULT NULL,
  `confirmed` tinyint(1) NOT NULL DEFAULT '0',
  `photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `student_number` (`student_number`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- Dumping data for table sa.students: ~3 rows (approximately)
DELETE FROM `students`;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` (`id`, `student_number`, `name`, `mobile_phone`, `email`, `authentication_code`, `confirmed`, `photo`) VALUES
	(1, 0, 'admin', NULL, 'admin@admin.pt', 1234, 1, NULL),
	(6, 701, 'teste', NULL, 'teste@te.te', 1234, 1, NULL),
	(12, 703, 'teste3', NULL, 'teste3@te.te', 1234, 1, NULL);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
