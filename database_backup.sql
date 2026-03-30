CREATE DATABASE  IF NOT EXISTS `scholarnest_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `scholarnest_db`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: scholarnest_db
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `activity_logs`
--

DROP TABLE IF EXISTS `activity_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `action` varchar(100) NOT NULL,
  `details` text,
  `admin_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_action` (`action`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `activity_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `activity_logs_ibfk_2` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_logs`
--

LOCK TABLES `activity_logs` WRITE;
/*!40000 ALTER TABLE `activity_logs` DISABLE KEYS */;
INSERT INTO `activity_logs` VALUES (1,40,'USER_BANNED','{\"reason\":\"fake account\"}',29,'2026-03-24 05:59:18');
/*!40000 ALTER TABLE `activity_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `scholarship_id` int NOT NULL,
  `applied_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','applied','won','rejected') DEFAULT 'applied',
  `notes` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_application` (`user_id`,`scholarship_id`),
  KEY `idx_user` (`user_id`),
  KEY `idx_scholarship` (`scholarship_id`),
  KEY `idx_status` (`status`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`scholarship_id`) REFERENCES `scholarships` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (1,1,1,'2025-11-09 11:05:22','applied','Applied on time, waiting for results'),(2,1,2,'2025-11-09 11:05:22','applied','Strong application submitted'),(3,1,3,'2025-11-09 11:05:22','applied','Met all eligibility criteria'),(4,2,9,'2025-11-09 11:05:22','applied','Commerce scholarship application'),(5,2,3,'2025-11-09 11:05:22','applied','Need-based application'),(6,3,5,'2025-11-09 11:05:22','applied','Medical scholarship - strong candidate'),(7,3,1,'2025-11-09 11:05:22','applied','Women in Science application'),(9,9,7,'2025-11-14 15:06:43','applied',NULL),(10,9,3,'2025-11-14 15:16:24','applied',NULL),(12,11,7,'2026-01-02 04:38:06','rejected',NULL),(13,11,3,'2026-01-02 04:38:28','won',NULL),(14,11,1,'2026-01-02 04:39:26','applied',NULL),(16,38,7,'2026-02-01 12:20:24','won',NULL),(17,38,3,'2026-02-01 12:20:32','won',NULL),(19,38,5,'2026-02-14 04:58:13','applied',NULL),(20,41,3,'2026-03-24 16:57:17','applied',NULL);
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_messages`
--

DROP TABLE IF EXISTS `chat_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `from_user_id` int NOT NULL,
  `to_user_id` int NOT NULL,
  `message` text NOT NULL,
  `sent_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `read_status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `to_user_id` (`to_user_id`),
  KEY `idx_conversation` (`from_user_id`,`to_user_id`),
  KEY `idx_sent_at` (`sent_at`),
  CONSTRAINT `chat_messages_ibfk_1` FOREIGN KEY (`from_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chat_messages_ibfk_2` FOREIGN KEY (`to_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_messages`
--

LOCK TABLES `chat_messages` WRITE;
/*!40000 ALTER TABLE `chat_messages` DISABLE KEYS */;
INSERT INTO `chat_messages` VALUES (1,38,37,'hello','2026-02-01 12:09:44',0),(2,38,37,'hello','2026-02-01 12:09:51',0),(3,38,37,'jai hind ?','2026-02-01 12:11:48',0),(4,37,38,'hello there !!!','2026-02-01 12:13:01',0),(5,36,38,'hello there!!','2026-02-02 04:19:47',0),(6,38,37,'hello','2026-02-02 08:38:23',0),(7,39,38,'hello student 4','2026-02-02 08:51:20',0),(8,39,38,'how are u?','2026-02-02 08:51:44',0),(9,39,38,'whats the problem','2026-02-02 08:52:45',0),(10,38,39,'hii','2026-02-02 08:54:19',0),(11,38,39,'i am fine','2026-02-02 08:55:32',0),(12,38,39,'nothing','2026-02-02 08:59:29',0),(13,38,36,'good morning','2026-02-02 09:07:57',0),(14,38,36,'abc','2026-02-02 09:19:17',0),(15,38,36,'hello sir','2026-02-12 16:37:51',0),(16,37,38,'connected','2026-02-13 08:39:18',0),(17,38,37,'hello','2026-02-14 04:37:54',0),(18,37,41,'jai shri ram','2026-03-24 16:52:40',0),(19,41,37,'jai jinendra','2026-03-24 16:58:12',0);
/*!40000 ALTER TABLE `chat_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `scholarship_id` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `feedback_text` text,
  `success_story` text,
  `approved` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `scholarship_id` (`scholarship_id`),
  KEY `idx_approved` (`approved`),
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`scholarship_id`) REFERENCES `scholarships` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mentors`
--

DROP TABLE IF EXISTS `mentors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mentors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `expertise` varchar(300) DEFAULT NULL,
  `experience_years` int DEFAULT NULL,
  `bio` text,
  `verified` tinyint(1) DEFAULT '0',
  `charge_per_session` decimal(10,2) DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `idx_user` (`user_id`),
  KEY `idx_verified` (`verified`),
  CONSTRAINT `mentors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mentors`
--

LOCK TABLES `mentors` WRITE;
/*!40000 ALTER TABLE `mentors` DISABLE KEYS */;
INSERT INTO `mentors` VALUES (1,4,'Engineering Scholarships, Research Grants, Study Abroad',8,'Expert in helping engineering students secure scholarships. Former IIT professor with 100+ successful mentees.',1,500.00,'2025-11-09 11:04:37'),(2,5,'Medical Scholarships, Research Funding, Women in STEM',6,'Specializes in medical and women-focused scholarships. Helped 50+ students get into research programs.',1,750.00,'2025-11-09 11:04:37'),(3,17,'Engineering',5,'I am mentor for engineering scholarships',1,500.00,'2026-01-29 16:17:10'),(4,26,NULL,NULL,NULL,1,0.00,'2026-01-30 07:39:05'),(6,32,'Engineering',1,'i am mentor 11',1,0.00,'2026-01-31 10:59:01'),(7,36,'Engineering',7,'mentor 3',1,0.00,'2026-01-31 15:43:59'),(8,37,'Engineering',4,'mentor4',1,0.00,'2026-02-01 05:46:13'),(9,39,'Engineering',1,'mentor 5',1,498.00,'2026-02-02 08:39:47'),(10,40,'Engineering',4,'mansi',1,0.00,'2026-02-14 04:41:13'),(11,42,'Engineering',5,'SNJB\'s best mentor ',1,0.00,'2026-03-24 16:55:20');
/*!40000 ALTER TABLE `mentors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mentorship_requests`
--

DROP TABLE IF EXISTS `mentorship_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mentorship_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `scholarship_id` int DEFAULT NULL,
  `mentor_id` int DEFAULT NULL,
  `status` enum('pending','accepted','rejected','completed') DEFAULT 'pending',
  `requested_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `accepted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `scholarship_id` (`scholarship_id`),
  KEY `idx_student` (`student_id`),
  KEY `idx_mentor` (`mentor_id`),
  KEY `idx_status` (`status`),
  CONSTRAINT `mentorship_requests_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `mentorship_requests_ibfk_2` FOREIGN KEY (`scholarship_id`) REFERENCES `scholarships` (`id`) ON DELETE SET NULL,
  CONSTRAINT `mentorship_requests_ibfk_3` FOREIGN KEY (`mentor_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mentorship_requests`
--

LOCK TABLES `mentorship_requests` WRITE;
/*!40000 ALTER TABLE `mentorship_requests` DISABLE KEYS */;
INSERT INTO `mentorship_requests` VALUES (1,1,1,4,'accepted','2025-11-09 11:05:56',NULL),(2,3,5,5,'accepted','2025-11-09 11:05:56',NULL),(3,2,9,4,'pending','2025-11-09 11:05:56',NULL),(4,18,NULL,5,'pending','2026-01-31 10:52:42',NULL),(5,18,NULL,17,'pending','2026-01-31 10:53:03',NULL),(6,18,NULL,17,'pending','2026-01-31 10:54:33',NULL),(7,18,NULL,17,'pending','2026-01-31 10:54:40',NULL),(8,18,NULL,17,'pending','2026-01-31 10:56:23',NULL),(9,33,NULL,32,'pending','2026-01-31 11:03:21',NULL),(10,33,NULL,32,'pending','2026-01-31 15:29:31',NULL),(11,35,NULL,36,'pending','2026-01-31 15:46:05',NULL),(12,35,NULL,7,'accepted','2026-02-01 05:43:22','2026-02-02 04:19:35'),(13,38,NULL,8,'accepted','2026-02-01 05:49:15','2026-02-01 05:53:37'),(14,38,NULL,7,'accepted','2026-02-02 04:18:40','2026-02-02 04:19:33'),(15,38,NULL,9,'accepted','2026-02-02 08:42:41','2026-02-02 08:50:48'),(16,38,NULL,1,'pending','2026-02-09 15:38:22',NULL),(17,38,NULL,10,'pending','2026-02-18 16:36:31',NULL),(18,41,NULL,8,'accepted','2026-03-24 16:51:35','2026-03-24 16:52:29');
/*!40000 ALTER TABLE `mentorship_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `message` text,
  `is_read` tinyint(1) DEFAULT '0',
  `scholarship_id` int DEFAULT NULL,
  `send_at` timestamp NULL DEFAULT NULL,
  `sent` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `scholarship_id` (`scholarship_id`),
  KEY `idx_user_sent` (`user_id`,`sent`),
  KEY `idx_send_at` (`send_at`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`scholarship_id`) REFERENCES `scholarships` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,1,'deadline_reminder','Scholarship Deadline Approaching','L\'ORÉAL scholarship deadline is in 7 days!',0,1,'2025-11-16 11:06:07',0,'2025-11-09 11:06:07'),(2,3,'result_check','Check Scholarship Results','Results for MBBS Merit Scholarship should be out by now.',0,5,'2025-11-24 11:06:07',0,'2025-11-09 11:06:07'),(3,36,'mentor_request',NULL,'student4 sent you a mentorship request',0,NULL,NULL,0,'2026-02-02 04:18:40'),(4,38,'request_accepted',NULL,'mentor3 accepted your mentorship request',1,NULL,NULL,0,'2026-02-02 04:19:33'),(5,35,'request_accepted',NULL,'mentor3 accepted your mentorship request',0,NULL,NULL,0,'2026-02-02 04:19:35'),(6,38,'new_message',NULL,'You have a new message from mentor3',1,NULL,NULL,0,'2026-02-02 04:19:47'),(7,37,'new_message',NULL,'You have a new message from student4',1,NULL,NULL,0,'2026-02-02 08:38:23'),(8,39,'mentor_request',NULL,'student4 sent you a mentorship request',1,NULL,NULL,0,'2026-02-02 08:42:41'),(9,38,'request_accepted',NULL,'mentor5 accepted your mentorship request',1,NULL,NULL,0,'2026-02-02 08:50:48'),(10,38,'new_message',NULL,'You have a new message from mentor5',1,NULL,NULL,0,'2026-02-02 08:51:20'),(11,38,'new_message',NULL,'You have a new message from mentor5',1,NULL,NULL,0,'2026-02-02 08:51:44'),(12,38,'new_message',NULL,'You have a new message from mentor5',1,NULL,NULL,0,'2026-02-02 08:52:45'),(13,39,'new_message',NULL,'You have a new message from student4',0,NULL,NULL,0,'2026-02-02 08:54:19'),(14,39,'new_message',NULL,'You have a new message from student4',0,NULL,NULL,0,'2026-02-02 08:55:32'),(15,39,'new_message',NULL,'You have a new message from student4',0,NULL,NULL,0,'2026-02-02 08:59:29'),(16,36,'new_message',NULL,'You have a new message from student4',0,NULL,NULL,0,'2026-02-02 09:07:57'),(17,36,'new_message',NULL,'You have a new message from student4',0,NULL,NULL,0,'2026-02-02 09:19:17'),(18,4,'mentor_request',NULL,'student4 sent you a mentorship request',0,NULL,NULL,0,'2026-02-09 15:38:22'),(19,36,'new_message',NULL,'You have a new message from student4',0,NULL,NULL,0,'2026-02-12 16:37:51'),(20,38,'new_message',NULL,'You have a new message from mentor4',1,NULL,NULL,0,'2026-02-13 08:39:18'),(21,37,'new_message',NULL,'You have a new message from student4',1,NULL,NULL,0,'2026-02-14 04:37:55'),(22,40,'mentor_request',NULL,'student4 sent you a mentorship request',0,NULL,NULL,0,'2026-02-18 16:36:31'),(23,37,'mentor_request',NULL,'om sent you a mentorship request',1,NULL,NULL,0,'2026-03-24 16:51:35'),(24,41,'request_accepted',NULL,'mentor4 accepted your mentorship request',1,NULL,NULL,0,'2026-03-24 16:52:29'),(25,41,'new_message',NULL,'You have a new message from mentor4',1,NULL,NULL,0,'2026-03-24 16:52:40'),(26,37,'new_message',NULL,'You have a new message from om',0,NULL,NULL,0,'2026-03-24 16:58:12');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scholarships`
--

DROP TABLE IF EXISTS `scholarships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scholarships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(300) NOT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `amount` varchar(100) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `apply_link` varchar(500) NOT NULL,
  `description` text,
  `eligibility_text` text,
  `gender_eligible` varchar(50) DEFAULT NULL,
  `category_eligible` varchar(100) DEFAULT NULL,
  `max_income` int DEFAULT NULL,
  `education_level_eligible` varchar(100) DEFAULT NULL,
  `course_eligible` varchar(300) DEFAULT NULL,
  `field_eligible` varchar(300) DEFAULT NULL,
  `min_percentage` decimal(5,2) DEFAULT NULL,
  `min_cgpa` decimal(4,2) DEFAULT NULL,
  `state_eligible` varchar(200) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `source` enum('manual','scraped') DEFAULT 'manual',
  `scraped_from` varchar(255) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_deadline` (`deadline`),
  KEY `idx_verified` (`verified`),
  KEY `idx_gender` (`gender_eligible`),
  KEY `idx_category` (`category_eligible`),
  KEY `idx_education` (`education_level_eligible`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scholarships`
--

LOCK TABLES `scholarships` WRITE;
/*!40000 ALTER TABLE `scholarships` DISABLE KEYS */;
INSERT INTO `scholarships` VALUES (1,'L\'ORÉAL For Young Women in Science Program 2025-26','L\'ORÉAL Foundation','₹1,00,000','2025-12-31','https://www.loreal.com/scholarships','Supporting young women pursuing careers in science, technology, engineering, and mathematics.','Open to female students in Science/Engineering with family income below 8 lakhs','Female','All',800000,'Undergraduate,Postgraduate','Engineering,Science','All',NULL,7.00,'All','Women,STEM,Research','manual',NULL,1,'2025-11-09 11:05:00','2025-11-09 11:05:00'),(2,'AICTE Pragati Scholarship 2025-26','AICTE','₹50,000','2025-11-30','https://www.aicte-india.org/scholarships','Merit-based scholarship for engineering students.','Engineering students with minimum 75% marks or 7.5 CGPA','All','All',NULL,'Undergraduate','Engineering','All',75.00,7.50,'All','Merit,Engineering','manual',NULL,1,'2025-11-09 11:05:00','2025-11-09 11:05:00'),(3,'National Means-cum-Merit Scholarship','Ministry of Education','₹12,000/year','2025-10-15','https://scholarships.gov.in/nmms','Financial assistance for students from economically weaker sections.','Family income below 5 lakhs, minimum 60% marks','All','All',500000,'Class 10,Class 12,Undergraduate','All','All',60.00,6.00,'All','Need-Based,All','manual',NULL,1,'2025-11-09 11:05:00','2025-11-09 11:05:00'),(4,'Maulana Azad National Scholarship','Ministry of Minority Affairs','₹30,000','2025-12-20','https://momascholarship.gov.in','Scholarship for meritorious students from minority communities.','Minority community students with 50%+ marks','All','Minority',600000,'Class 11,Class 12,Undergraduate','All','All',50.00,5.00,'All','Minority,Need-Based','manual',NULL,1,'2025-11-09 11:05:00','2025-11-09 11:05:00'),(5,'MBBS Merit Scholarship 2025','Medical Council of India','₹75,000','2026-01-15','https://www.mci.gov.in/scholarships','Supporting excellence in medical education.','Medical students with 80%+ marks or 8.0 CGPA','All','All',NULL,'Undergraduate,Postgraduate','Medical','MBBS,MD,Surgery',NULL,8.00,'All','Medical,Merit','manual',NULL,1,'2025-11-09 11:05:00','2025-11-09 11:05:00'),(6,'DST INSPIRE Fellowship 2025','Department of Science & Technology','₹2,00,000','2026-02-28','https://www.online-inspire.gov.in','Research funding for PhD scholars in Science & Technology.','PhD students in Science/Engineering with research proposal','All','All',NULL,'PhD','Science,Engineering','All',NULL,7.50,'All','Research,PhD,Science','manual',NULL,1,'2025-11-09 11:05:00','2025-11-09 11:05:00'),(7,'KVPY Scholarship 2025','Department of Science & Technology','₹5,000/month','2025-09-30','http://www.kvpy.iisc.ernet.in','Fellowship for students pursuing basic sciences.','Class 12 students with 90%+ marks in Science','All','All',NULL,'Class 12','Science','Physics,Chemistry,Biology,Mathematics',90.00,NULL,'All','Merit,Science,School','manual',NULL,1,'2025-11-09 11:05:00','2025-11-09 11:05:00'),(8,'National Sports Talent Search Scholarship','Sports Authority of India','₹40,000','2025-11-10','https://sportsauthorityofindia.nic.in','Supporting student-athletes excelling in sports.','Students with state/national level sports achievements','All','All',NULL,'All','All','All',50.00,5.00,'All','Sports,All','manual',NULL,1,'2025-11-09 11:05:00','2025-11-09 11:05:00'),(9,'ICAI CA Foundation Scholarship','Institute of Chartered Accountants','₹25,000','2025-12-05','https://www.icai.org/scholarships','Scholarship for CA aspirants from economically weaker sections.','Commerce students pursuing CA with family income below 6 lakhs','All','All',600000,'Undergraduate','Commerce','Accounting,Finance',70.00,7.00,'All','Commerce,Need-Based','manual',NULL,1,'2025-11-09 11:05:00','2025-11-09 11:05:00'),(11,'SNJB','SPACE','100000','2026-08-15','https://github.com/UdaySaindane','DEMO scholarship','Any student of SNJB',NULL,'Merit',200000,NULL,NULL,NULL,50.00,NULL,NULL,NULL,'manual',NULL,1,'2026-03-24 11:23:16','2026-03-24 11:23:16'),(12,'National Merit Scholarship','Government of India','50000','2026-12-31','https://scholarships.gov.in/merit','Full tuition scholarship for top performers in national exams','Must have scored 95% or above in 12th board exams',NULL,'Merit',500000,'undergraduate',NULL,NULL,95.00,NULL,NULL,NULL,'manual',NULL,1,'2026-03-24 16:47:08','2026-03-24 16:47:08'),(13,'Women in STEM Scholarship','Tech Foundation','75000','2026-06-30','https://techfoundation.org/stem','Scholarship for female students pursuing engineering or science','Open to female students in STEM fields','female','Category',800000,'undergraduate',NULL,NULL,80.00,NULL,NULL,NULL,'manual',NULL,1,'2026-03-24 16:47:08','2026-03-24 16:47:08'),(14,'SC/ST Scholarship','Ministry of Social Justice','30000','2026-09-15','https://scholarships.gov.in/scst','Financial aid for SC/ST category students','For SC/ST students with family income below 2.5 LPA',NULL,'Need-based',250000,'undergraduate',NULL,NULL,60.00,NULL,NULL,NULL,'manual',NULL,1,'2026-03-24 16:47:08','2026-03-24 16:47:08'),(15,'Post Graduate Research Grant','UGC','100000','2026-11-30','https://ugc.ac.in/research','Grant for post-graduate research students','For students pursuing research in Indian universities',NULL,'Research',600000,'postgraduate',NULL,NULL,70.00,NULL,NULL,NULL,'manual',NULL,1,'2026-03-24 16:47:08','2026-03-24 16:47:08'),(16,'Sports Excellence Scholarship','Sports Authority of India','40000','2026-08-31','https://sai.gov.in/sports','For students with national-level sports achievements','Must have represented state/nation in sports',NULL,'Sports',400000,'undergraduate',NULL,NULL,65.00,NULL,NULL,NULL,'manual',NULL,1,'2026-03-24 16:47:08','2026-03-24 16:47:08');
/*!40000 ALTER TABLE `scholarships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_profiles`
--

DROP TABLE IF EXISTS `student_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `dob` date DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `annual_family_income` int DEFAULT NULL,
  `education_level` varchar(50) DEFAULT NULL,
  `course` varchar(200) DEFAULT NULL,
  `field_of_study` varchar(200) DEFAULT NULL,
  `current_year` int DEFAULT NULL,
  `percentage` decimal(5,2) DEFAULT NULL,
  `cgpa` decimal(4,2) DEFAULT NULL,
  `college_university` varchar(255) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `profile_completed` tinyint(1) DEFAULT '0',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `idx_user` (`user_id`),
  KEY `idx_category` (`category`),
  KEY `idx_course` (`course`),
  KEY `idx_income` (`annual_family_income`),
  CONSTRAINT `student_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_profiles`
--

LOCK TABLES `student_profiles` WRITE;
/*!40000 ALTER TABLE `student_profiles` DISABLE KEYS */;
INSERT INTO `student_profiles` VALUES (1,1,'2003-05-15','Female','General',400000,'Undergraduate','Engineering','Computer Science',3,NULL,8.50,'IIT Delhi','Delhi','New Delhi','9876543210',1,'2025-11-09 11:04:24'),(2,2,'2004-08-22','Male','General',1200000,'Undergraduate','Commerce','Business Administration',2,78.50,NULL,'Delhi University','Delhi','New Delhi','9876543211',1,'2025-11-09 11:04:24'),(3,3,'2002-11-10','Female','OBC',700000,'Undergraduate','Medical','MBBS',4,NULL,9.20,'AIIMS Delhi','Delhi','New Delhi','9876543212',1,'2025-11-09 11:04:24'),(4,9,'2025-11-11','Male','OBC',39998,'Undergraduate','Engineering','Computer Science',4,78.17,8.50,'SPPU','Maharashtra','Nashik','9999999999',1,'2025-11-11 07:44:40'),(5,11,'2026-01-02','Male','OBC',4000,'Undergraduate','Engineering','Computer Science',4,78.17,8.50,'SPPU','Maharashtra','Nashik','9322845254',1,'2026-01-02 04:37:44'),(6,18,'2026-01-31','Male','OBC',50000,'Undergraduate','Engineering','Computer Science',4,78.17,9.21,'SPPU','Maharashtra','Nashik','9999999999',1,'2026-01-31 10:56:05'),(7,33,'2026-01-31','Male','General',45000,'Undergraduate','Science','Science',2,92.40,8.50,'SPPU','Maharashtra','Nashik','7799884455',1,'2026-01-31 11:01:13'),(8,35,'2026-01-31','Male','General',45444,'Undergraduate','Management','Computer Science',4,78.17,8.80,'SPPU','Maharashtra','Nashik','9988776655',1,'2026-01-31 15:42:28'),(9,38,'2026-03-06','Male','OBC',44998,'Undergraduate','Engineering','Computer Science',3,78.17,9.90,'SPPU','Maharashtra','Nashik','9998887774',1,'2026-03-06 16:35:44'),(10,41,'2026-03-24','Male','OBC',25444,'Postgraduate','Engineering','Computer Science',1,78.17,9.08,'SPPU','Maharashtra','Nashik','5566445544',1,'2026-03-24 16:51:01');
/*!40000 ALTER TABLE `student_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('student','mentor','admin') DEFAULT 'student',
  `is_banned` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_email` (`email`),
  KEY `idx_role` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Priya Sharma','priya.sharma@example.com','$2b$10$rZ7bGj3FqL8K5vN9xJ2lYe7QkX4mW8pR6tH9nL2sM5vJ8kR4tH6nL','student',0,'2025-11-09 11:04:05','2025-11-09 11:04:05'),(2,'Rahul Kumar','rahul.kumar@example.com','$2b$10$rZ7bGj3FqL8K5vN9xJ2lYe7QkX4mW8pR6tH9nL2sM5vJ8kR4tH6nL','student',0,'2025-11-09 11:04:05','2025-11-09 11:04:05'),(3,'Ananya Patel','ananya.patel@example.com','$2b$10$rZ7bGj3FqL8K5vN9xJ2lYe7QkX4mW8pR6tH9nL2sM5vJ8kR4tH6nL','student',0,'2025-11-09 11:04:05','2025-11-09 11:04:05'),(4,'Dr. Amit Verma','amit.verma@example.com','$2b$10$rZ7bGj3FqL8K5vN9xJ2lYe7QkX4mW8pR6tH9nL2sM5vJ8kR4tH6nL','mentor',0,'2025-11-09 11:04:05','2025-11-09 11:04:05'),(5,'Prof. Sneha Reddy','sneha.reddy@example.com','$2b$10$rZ7bGj3FqL8K5vN9xJ2lYe7QkX4mW8pR6tH9nL2sM5vJ8kR4tH6nL','mentor',0,'2025-11-09 11:04:05','2025-11-09 11:04:05'),(7,'Test Student','test@example.com','$2b$10$61StG6TPATIn/7u0mSY2/uwOXxdAdOzyVJkg6bY8ExfBbZbXUwyMK','student',0,'2025-11-09 11:29:11','2025-11-09 11:29:11'),(8,'Demo User','demo1111@gmail.com','$2b$10$sJIyR7gaB3bVfQWh/CX1J.z7atCd1f5gFM2vSJenxmI/Y.WQrPFgy','student',0,'2025-11-09 17:16:56','2025-11-09 17:16:56'),(9,'demo mentor','mentor1@gmail.com','$2b$10$T5pho4/ljsGR5CI87AWCC.n06Aw7iOc7gBHibrma1/P8UGzvTf2Qy','mentor',0,'2025-11-10 16:09:21','2025-11-10 16:09:21'),(10,'Harshal Bachhav','bachhav@mail.com','$2b$10$q4HHPDcPtZpr2psIbYjfO.cboWV1B7qM/0jdx5sK1ETt5OddmYtRG','student',0,'2025-11-23 04:41:29','2025-11-23 04:41:29'),(11,'demo member','member1@gmail.com','$2b$10$6Xi8vlJfbPTz5UOgZaS//usUXC1HoqgMJrNXv8bmJHbGmKLDZflny','student',0,'2026-01-02 04:36:38','2026-01-02 04:36:38'),(12,'demo member2 ','member2@gmail.com','$2b$10$1SdRXdiqJHY5GZ6XI8uDWO.rnM5RuxOhEXB/5kWH.32RHVgA1sdxG','mentor',0,'2026-01-02 04:48:59','2026-01-02 04:48:59'),(17,'mentor 01','mentor01@gmail.com','$2b$10$vwCU7DZ/Z4LS45q.J40hsOtm77a7g207L.CKRdnPrLx6CoUU8IGMi','mentor',0,'2026-01-29 16:17:10','2026-01-29 16:17:10'),(18,'student01','student01@gmail.com','$2b$10$z/8GjQXTGO3zjY2QO4qXo.WSZOXAe7SeiDPWJijU.Tk/JIFtQT2vS','student',0,'2026-01-29 16:20:48','2026-01-29 16:20:48'),(26,'mentor 02','mentor02@gmail.com','$2b$10$l21PpFIGTX1Wx8hfyCOPreCSCQ.rmHBQoBj2PWnEI7MkiD7ekf.Zm','mentor',0,'2026-01-30 07:39:05','2026-01-30 07:39:05'),(27,'Demo02','demo@gmail.com','$2b$10$voHz/.hO.rSWW1ayTTiLoeXthRIMz1/MMleLW7CLXL9sjU0zXlVaS','student',0,'2026-01-30 07:41:38','2026-01-30 07:41:38'),(28,'Super Admin','super@scholarnest.com','$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW','admin',0,'2026-01-30 07:47:15','2026-01-30 07:47:15'),(29,'student admin','studentadmin@gmail.com','$2b$10$L9w8ES.dxdyfmvXwTPkH8ebx0.S.3ntR/9UKEegjRZR4Qkz/7ady.','admin',0,'2026-01-30 07:55:45','2026-01-30 07:58:51'),(30,'student011','student011@gmail.com','$2b$10$wRKHaS7xdghQvVArEUgebepAnP8hDMlSx32HoHj/3fdLSw.1gWcbC','student',0,'2026-01-30 11:41:58','2026-01-30 11:41:58'),(31,'mentor 002','mentor002@gmail.com','$2b$10$K0qVdmi02dpA9DcCZ50edO6LOHdlP./oJKfjB55LtWQ5dF1.JmNRm','mentor',0,'2026-01-30 11:47:58','2026-01-30 11:47:58'),(32,'mentor11','mentor11@gmail.com','$2b$10$IuC1mRtVm55nLwmWwnRIA.qwPapeKFRqeiyBDWNvE9Rr0aOq3aR22','mentor',0,'2026-01-31 10:59:01','2026-01-31 10:59:01'),(33,'student11','student11@gmail.com','$2b$10$81qy3a4iH9QqazHQQXHlIuVi6dX8e16o3mqRAN5mcojFAr/hGRiO.','student',0,'2026-01-31 11:00:19','2026-01-31 11:00:19'),(35,'student3','student3@gmail.com','$2b$10$FEa3N6TONuJSl4KkzCdqIu6MjCajM60bmmlGWtCHRK3Bl8w3bHGsG','student',0,'2026-01-31 15:41:50','2026-01-31 15:41:50'),(36,'mentor3','mentor3@gmail.com','$2b$10$9LB.QrrfzJio6uje2cUBt.qOsGrJPT6JkMMNBBSBdDfZ5Ea5Yi8vK','mentor',0,'2026-01-31 15:43:59','2026-01-31 15:43:59'),(37,'mentor4','mentor4@gmail.com','$2b$10$Wo1v45CfN0YZK698fwJZCukA2wGyqbWqZKJvnVl0SyHxyNpNEeRVy','mentor',0,'2026-02-01 05:46:13','2026-02-01 05:46:13'),(38,'student4','student4@gmail.com','$2b$10$gsTjV2hdQxL2X9HorQjFF.YhBenpDfY.WgOcARQfZ6FyyWUvAJuxi','student',0,'2026-02-01 05:47:02','2026-02-01 05:47:02'),(39,'mentor5','mentor5@gmail.com','$2b$10$v1o1FSlKAgmfMrf8m17XwubkWwf8RsTmgUW0PNNko0zCCwIGToBHW','mentor',0,'2026-02-02 08:39:47','2026-02-02 08:39:47'),(40,'mansi','m@gmail.com','$2b$10$/w.Py6ARnO87UPlI6NHQe.ObljWec7e/GF1Cze6G/1HZi2nB4iEWW','mentor',1,'2026-02-14 04:41:13','2026-03-24 05:59:18'),(41,'om','om@gmail.com','$2b$10$zUhyDALNKoHr3VrHqXD6I.bkl/E0bKpgbtWZJs0jZDt/m7Woo5eh6','student',0,'2026-03-24 16:50:06','2026-03-24 16:50:06'),(42,'om1','om1@gmal.com','$2b$10$PrB6U4LZA7ruO9.W8m0N2OKyDvj0rfWtD//xWpZK.eiLUMzGc8kgy','mentor',0,'2026-03-24 16:55:20','2026-03-24 16:55:20');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'scholarnest_db'
--

--
-- Dumping routines for database 'scholarnest_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-25 15:25:09
