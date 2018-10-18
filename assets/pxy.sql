/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50612
Source Host           : localhost:3306
Source Database       : pxy

Target Server Type    : MYSQL
Target Server Version : 50612
File Encoding         : 65001

Date: 2018-10-18 11:13:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for pxy_shop
-- ----------------------------
DROP TABLE IF EXISTS `pxy_shop`;
CREATE TABLE `pxy_shop` (
  `id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of pxy_shop
-- ----------------------------
INSERT INTO `pxy_shop` VALUES ('0', 'pp_01', '12345');
INSERT INTO `pxy_shop` VALUES ('0', 'pp_01', '12345');
INSERT INTO `pxy_shop` VALUES ('0', 'pp_02', '12345');
INSERT INTO `pxy_shop` VALUES ('0', 'pxy', '12345');
INSERT INTO `pxy_shop` VALUES ('0', 'pxy', '12345');
INSERT INTO `pxy_shop` VALUES ('0', 'p1', 'dfd');
INSERT INTO `pxy_shop` VALUES ('0', '', '');
