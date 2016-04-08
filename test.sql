/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50711
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50711
File Encoding         : 65001

Date: 2016-04-08 15:22:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for alert
-- ----------------------------
DROP TABLE IF EXISTS `alert`;
CREATE TABLE `alert` (
  `ID` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Pgn` polygon DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of alert
-- ----------------------------
INSERT INTO `alert` VALUES ('82fca941-07d7-439c-f0f7-014e3f80329a', '未命名2', GeomFromText('POLYGON((12331662.2102758 5134122.31585872, 12243606.7536912 4940889.50835379, 12588490.625314 5090094.58756646, 12331662.2102758 5134122.31585872))'));
INSERT INTO `alert` VALUES ('418c82fc-88c7-40de-c22a-c489923c7c50', '未命名2', GeomFromText('POLYGON((12872224.8743085 5141460.2705741, 12683884.0366139 4745210.71594374, 13192648.89688 4913983.67439741, 12872224.8743085 5141460.2705741))'));
INSERT INTO `alert` VALUES ('a750619f-4ecd-4364-bb3c-3d226599bb0c', '未命名4', GeomFromText('POLYGON((12074833.7952376 5024052.99512807, 11720165.9839944 4698737.00274635, 12361014.0291373 4625357.45559259, 12074833.7952376 5024052.99512807))'));

-- ----------------------------
-- Table structure for boats
-- ----------------------------
DROP TABLE IF EXISTS `boats`;
CREATE TABLE `boats` (
  `Official_Number` int(11) DEFAULT NULL,
  `Chinese_Name` varchar(255) DEFAULT NULL,
  `English_Name` varchar(255) DEFAULT NULL,
  `Call_Sign` varchar(255) DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL,
  `Flag` varchar(255) DEFAULT NULL,
  `Owner` varchar(255) DEFAULT NULL,
  `Port_Registry` varchar(255) DEFAULT NULL,
  `LNG` double(255,16) DEFAULT NULL,
  `LAT` double(255,16) DEFAULT NULL,
  `Alert` varchar(10) DEFAULT NULL,
  `Area` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of boats
-- ----------------------------
INSERT INTO `boats` VALUES ('504090002', '福之达6', 'FU ZHI DA6', 'BDVF', '散货船', '中国', '陈二', '宁波港', '122.0298254434250700', '34.4197488967523240', '0', '');
INSERT INTO `boats` VALUES ('504090003', '华东29', 'HUA DONG 29', 'BCSE', '多用途船', '中国', '张三', '天津港', '118.1119021123940900', '14.1288792538426570', '0', '');
INSERT INTO `boats` VALUES ('504090004', '华勇起重36', 'HUA YONG QI ZHONG 36', 'BXZC', '起重船', '中国', '李四', '广州港', '118.6352210720545200', '15.3318675221060980', '0', '');
INSERT INTO `boats` VALUES ('504090005', '华勇拖1', 'HUA YONG TUO 1', 'BMAD', '拖船', '中国', '王五', '青岛港', '119.6945604171431700', '37.9591632566673100', '0', '');
INSERT INTO `boats` VALUES ('504090006', '华东1', 'HUA DONG 1', 'BXTR', '多用途船', '中国', '赵六', '大连港', '126.8412444286512000', '27.9433009683866870', '0', '');
INSERT INTO `boats` VALUES ('504090007', '华海2号', 'HUA HAI 2 HAO', 'BUIX', '干货船', '中国', '孙七', '深圳港', '118.3291465105128400', '14.6628548787668010', '0', '');
INSERT INTO `boats` VALUES ('504090008', '鲁日游227', 'LU RI YOU 227', 'BQSF', '游艇', '中国', '周八', '舟山港', '126.5398447435721500', '26.3614970887250450', '0', '');
INSERT INTO `boats` VALUES ('504090009', '宏泰228', 'HONG TAI 228', 'BHDC', '散货船', '中国', '吴九', '秦皇岛港', '120.0322419105693300', '14.4812178497201600', '0', '');

-- ----------------------------
-- Table structure for geo
-- ----------------------------
DROP TABLE IF EXISTS `geo`;
CREATE TABLE `geo` (
  `ID` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Pnt` point DEFAULT NULL,
  `Line` linestring DEFAULT NULL,
  `Pgn` polygon DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of geo
-- ----------------------------

-- ----------------------------
-- Table structure for login
-- ----------------------------
DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of login
-- ----------------------------
INSERT INTO `login` VALUES ('admin', '000');
INSERT INTO `login` VALUES ('user1', '123');
INSERT INTO `login` VALUES ('user2', '456');
INSERT INTO `login` VALUES ('user3', '789');
